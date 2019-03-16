import { Slashr } from "../Slashr";
import DefaultValidators from "../form/Validators"

export class SlashrUiCalendarDomainInstances extends Slashr.DomainInstances{
    create(props){
        let form = new SlashrUiCalendarDomain(props, this);
        this.addInstance(props.name, form);
        return form;
	}
	remove(name){
		this.removeInstance(name);
	}
}

class SlashrUiCalendarDomain extends Slashr.Domain{
	constructor(props, calendars) {
		super();
		
		if(! props.name) throw("Form Error: Form must have a name.");
		this.state = {
			loaded: false,
			month: props.month || new Date(),
			day: props.day || new Date()
		};
		this._name = props.name;
		this._calendars = calendars;
		this._monthKey = null;
		// this._month = props.month || new Date();
		// this._day = props.day || new Date();
		this._name = props.name || `cal${this._day.getTime()}`;
		this._dayContentLoader = props.dayContentLoader || null;
		this._onDaySelect = props.onDaySelect || null;
		this._startDay = null;
		this._endDay = null;
		this._keyPrefix = null;
		this._dayContent = {};
		this.initialize();
	}
	initialize() {
		this.initializeMonth();
	}
	initializeMonth() {
		this._keyPrefix = "calendar" + this.name + Slashr.utils.date.toShortDate(this.month);
		this._monthKey = this._keyPrefix;
		this.initializeDays();
	}
	load() {
		this.requestDayContent();
	}
	remove(){
		this._calendars.remove(this._name);
	}
	_loadIncDecMonth(val) {
		let month = this.state.month;
		month.setMonth(month.getMonth() + val);
		this.setMonth(month);
		this.initializeMonth();
		this.load();
	}
	loadNextMonth() {
		this._loadIncDecMonth(1);
	}
	loadPreviousMonth() {
		this._loadIncDecMonth(-1);
	}
	async requestDayContent() {
		this.loaded = false;
		if (this.dayContentLoader) {
			this._dayContent = await this.dayContentLoader(this.month);
			this.loaded = true;
		}
		else this.loaded = true;
	}
	initializeDays() {
		let startDay = new Date(this.month);
		startDay.setHours(0, 0, 0, 0);
		startDay.setDate(1);

		let endDay = new Date(startDay);
		endDay.setHours(23, 59, 59, 999);
		endDay.setDate(endDay.getDate() + 41);

		// Figure out the first sunday
		if (startDay.getDay() > 0) {
			for (let day = startDay.getDay(); day > 0; day--) {
				startDay.setDate(startDay.getDate() - 1);
			}
		}

		// Figure out the last saturday
		// if (endDay.getDay() < 6) {
		// 	for (let day = endDay.getDay(); day < 6; day++) {
		// 		endDay.setDate(endDay.getDate() + 1);
		// 	}
		// }

		this._startDay = startDay;
		this._endDay = endDay;

	}
	get name() {
		return this._name;
	}
	get isLoaded() {
		return this.state.loaded;
	}
	set loaded(loaded){
		this.setLoaded(loaded);
	}
	setLoaded(loaded){
		this.setState({
			loaded: loaded
		});
	}
	get keyPrefix() {
		return this._keyPrefix;
	}
	get month() {
		return this.state.month;
	}
	setMonth(month){
		this.setState({
			month: month
		});
		return this;
	}
	get day() {
		return this.state.day;
	}
	setDay(day){
		this.setState({
			day: day
		});
		return this;
	}
	get startDay() {
		return this._startDay;
	}
	get endDay() {
		return this._endDay;
	}
	get dayContent() {
		return this._dayContent;
	}
	async dayContentLoader() {
		if (this._dayContentLoader) return await this._dayContentLoader(this.month);
	}
}