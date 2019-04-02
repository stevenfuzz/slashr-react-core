import { Slashr } from "../Slashr";
import React from 'react';
import DefaultValidators from "../form/Validators"

export class SlashrUiFormDomainInstances extends Slashr.DomainInstances{
    create(props){
        let form = new SlashrUiFormDomain(props, this);
        this.addInstance(props.name, form);
        return form;
	}
	remove(name){
		this.removeInstance(name);
	}
}

export class SlashrUiFormDomain extends Slashr.Domain{
    constructor(props, forms){
        super();
        if(! props.name) throw("Form Error: Form must have a name.");
        //console.log(this.state);
        // this.state = {
        //     name: props.name,
        //     // focus: props.focus || false,
        //     // blur: props.blur || false
		// };
		this._name = props.name;
        this._values = false;
		this._activeColor = props.activeColor || null;
		this._theme = props.theme || material;
		this._onSubmit = props.onSubmit || null;
        this._errors = {};
		this._isValid = false;
		this._defaultValidators = DefaultValidators;
		this._validators = [];
		this._forms = forms;
        this.elements = this.elmts = new SlashrUiFormElementDomainInstances(this);

        if (props.validators) {
			this.addValidators(props.validators);
		}
	}
	remove(){
		this._forms.remove(this._name);
	}
    addElement(props){
        return this.elements.add(props);
	}
    async submit(){
        this._isValid = await this.validate();
		if (this._isValid) {
			this.clearErrors();
			this._onSubmit(this);
		}
	}
    get activeColor(){
        return this._activeColor;
	}
	get theme(){
        return this._theme;
	}
    toFormData() {
		let formData = new FormData();
		let formMetadata = {
			name: this.name,
			elmts: {}
        };
        
		this.elements.forEach((elmt)=>{
			
			formMetadata.elmts[name] = {
				tag: elmt.tag,
				type: elmt.type
			}

			let value = elmt.getValue();

			if (!elmt.isFile() && typeof value === 'object') {
				if (value.getTime) {
					//console.log("TODO: Find better way to see if date");
					value = value.getTime();
					formMetadata.elmts[name].dataType = "date";
				}
				else {
					value = JSON.stringify(value);
					formMetadata.elmts[name].dataType = "json";
				}

			}

			formData.append(name, value);

			formData.append('_slashrFormMetadata', JSON.stringify(formMetadata));
		});
		return formData;
	}
    get values(){
        let ret = {};
        this.elements.forEach((elmt)=>{
           ret[elmt.name] = elmt.value;
        });
        return ret;
    }
    setValues(values){
		for (let name in values) {
			this.elmts[name].setValue(values[name]);
		}
		this.clearErrors();
		return this;
    }
    reset(){
        this.elements.forEach((elmt)=>{
            elmt.setValue(null);
         });
		this.clearErrors();
		return this;
    }
    get errors(){
        return this._errors;
    }
    setErrors(errors){
        this._errors = errors;
    }
    clearErrors(){
		this.setErrors([]);
	}
    addError(error){
        this.error.push();
    }
    async validate() {
		this.valid = true;
		this.elmts.forEach(async (elmt)=>{
			let val = elmt.value;
			let hasValidionError = false;
			elmt.valid = false;
			elmt.error = false;
			elmt.success = false;
			// Check for non required
			if (!elmt.isRequired && !elmt.validator) {
				elmt.valid = true;
			}
			// Check if required
			else if (elmt.isRequired && (!val || (typeof val === "string" && val.trim() === "") || (typeof val === "object" && val.length === 0))) {
				elmt.valid = false;
				elmt.error = (typeof elmt.isRequired === "string") ? elmt.isRequired : "Required";
			}
			// Check if there are validators
			else if (elmt.validator) {
				let validator = {};

				// Check for string (single), array (no options) or object
				if (typeof elmt.validator === "string") validator[elmt.validator] = true;
				else if (Array.isArray(elmt.validator)) {
					elmt.validator.map(
						(value) => {
							validator[value] = true;
						}
					);
				}
				else validator = elmt.validator;

				for (let i in validator) {
					let opts = (typeof validator[i] === "object") ? validator[i] : {};
					let validatorFn = null;
					if (!this._validators[i]) {
						if (this._defaultValidators[i]) {
							validatorFn = this._defaultValidators[i];
						}
						else throw ("Unable to find validator: '" + i + "'");
					}
					else validatorFn = this._validators[i];

					let rslt = { error: "Unable to complete request" };
					//					try{
					rslt = await validatorFn(val, opts, this);
					if (rslt) {
						if (rslt === true) {
							elmt.valid = true;
							elmt.error = "";
						}
						else if (rslt.error) {
							elmt.valid = false;
							elmt.error = (typeof rslt.error === "string") ? rslt.error : "Not Valid";
						}
						else if (rslt.success) {
							elmt.valid = true;
							elmt.success = (typeof rslt.success === "string") ? rslt.success : "";
						}
						if (rslt.value) {
							elmt.value = rslt.value;
						}
					}
					else {
						elmt.valid = false;
						elmt.error = "Unknown Validation Error";
					}
					if (!elmt.isValid) break;

					//					}
					//					
					//					catch(err){
					//						console.log(err);
					//						throw("Validation Error Unknown");
					//					}
				}
			}
			else {
				elmt.valid = true;
			}

			// Update the form
			if (!elmt.isValid) {
				this.valid = false;
			}
			// Update validation message
			if (elmt.isValid) elmt.error = false;
			else elmt.success = false;

		});
		return this.valid;
	}
}

export class SlashrUiFormElementDomainInstances extends Slashr.DomainInstances{
    constructor(form){
        super();
        this._form = form;
    }
    add(props){
        let element = new SlashrUiFormElementDomain(this._form, props);
        this.addInstance(props.name, element);
        return element;
    }
}

export class SlashrUiFormElementDomain extends Slashr.Domain{
    constructor(form, props){
        super();
        if(! props.name) throw("Form Error: Form element must have a name.");
        this._form = form;
		this._name = props.name;
		this._required = props.required || false;
		this._ref = React.createRef();
		this._eventListeners = {};

		let validators = props.validators || props.validator || false;
		if(validators && ! Array.isArray(validators)) validators = [validators];
		this._validators = validators;

		this.state = {
		   valid: false,
           value: props.value || null,
           focus: props.focus || false,
		   blur: props.blur || false,
		   error: false,
		   success: false,
        };
	}
	get form(){
		return this._form;
	}
    get value(){
        return this.state.value;
    }
    set value(value){
        return this.setValue(value);
    }
    setValue(value){
		console.log("SETTING VALUE",value);
		let hasChanged = (value !== this.state.value);
		this.setState({value: value});
		if(hasChanged) this._triggerEventListener("change");
        return this;
    }
    get focus(){
		
        return this.state.focus;
    }
    set focus(focus){
        return this.setFocus(focus);
    }
    setFocus(focus){
		this.setState({focus: focus, blur: ! focus});
		this._triggerEventListener("focus");
        return this;
    }
    get isFocused(){
        return this.state.focus;
    }
    get blur(){
        return this.state.blur;
    }
    set blur(blur){
        return this.setBlur(blur);
    }
    setBlur(blur){
		this.setState({blur: blur, focus: ! blur});
		this._triggerEventListener("blur");
        return this;
    }
    get isBlurred(){
        return this.blur;
    }
    get name(){
        return this._name;
	}
	get isRequired(){
		return this._required;
	}
	get validator(){
		return this.validators;
	}
    get validators() {
		return this._validators;
	}
	set validators(validators) {
		this._validators = validators;
	}
	addValidators(validators) {
		for (let name in validators) {
			this._validators[name] = validators[name];
		}
	}
	setError(error){
		this.setState({
			error: error
		});
		if(error) this._triggerEventListener("error");
		return this;
	}
	set error(error){
		return this.setError(error);
	}
	get error(){
		return this.state.error;
	}
	setSuccess(success){
		this.setState({
			success: success
		});
		if(success) this._triggerEventListener("success");
		return this;
	}
	set success(success){
		return this.setSuccess(success);
	}
	get success(){
		return this.state.success;
	}
	get valid(){
        return this.state.valid;
    }
    set valid(valid){
        return this.setValid(valid);
    }
    setValid(valid){
		this.setState({valid: valid});
		if(valid) this._triggerEventListener("valid");
        return this;
    }
    get isValid(){
        return this.valid;
    }
	get ref(){
		return this._ref;
	}
	set ref(ref){
		this._ref = ref;
		return this;
	}
	addEventListener(type, callback){
		if(! this._eventListeners[type]) this._eventListeners[type] = [];
		this._eventListeners[type].push(callback);
	}
	_triggerEventListener(type){
		if(this._eventListeners[type]) this._eventListeners[type].forEach((callback)=>{
			callback(type, this, this._form);
		})
	}
}

