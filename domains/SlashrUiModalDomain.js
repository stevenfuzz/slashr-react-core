import { Slashr } from "../Slashr";
import DefaultValidators from "../form/Validators"

export class SlashrUiModalDomainInstances extends Slashr.DomainInstances{
    create(props){
        let modal = new SlashrUiModalDomain(props);
        this.addInstance(props.name, modal);
        return modal;
    }
}

export class SlashrUiModalDomain extends Slashr.Domain{
    constructor(props){
        super();
        if(! props.name) throw("Modal Error: Modal must have a name.");
		this._name = props.name;
		this.state = {
			visible: props.visible || false
		};
    }
    get isVisible(){
        return this.state.visible;
    }
    set visible(visible){
        return this.setVisible(visible);
    }
    setVisible(visible){
        this.setState({visible: visible});
        return this;
    }
}