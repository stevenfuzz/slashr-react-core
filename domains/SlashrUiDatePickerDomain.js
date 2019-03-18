import { Slashr } from "../Slashr";

export class SlashrUiDatePickerDomainInstances extends Slashr.DomainInstances{
    create(props){
        let datePicker = new SlashrUiDatePickerDomain(props, this);
        this.addInstance(props.name, datePicker);
        return datePicker;
	}
	remove(name){
		this.removeInstance(name);
	}
}

class SlashrUiDatePickerDomain extends Slashr.Domain{
	constructor(props, datePickers) {
		super();
		if(! props.name) throw("Date Picker Error: Must have a name.");
		this.state = {
			date: props.date || new Date(),
			visible: props.visible || false
		};
		this._itemIndex = 0;
	}
	get date(){
		return this.state.date;
	}
	setDate(date){
		this.setState({
			date: date
		});
	}
	get itemIndex(){
		return this._itemIndex;
	}
	setItemIndex(itemIndex){
		this._itemIndex = itemIndex;
	}
	setVisible(visible = true){
		this.setState({
			visible: visible
		});
	}
	get isVisible(){
		return this.state.visible
	}
	
}