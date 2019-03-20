import React from 'react';
import {Slashr} from './Slashr';
import { observable } from "mobx";

export class Calendar extends React.Component {
	constructor(props) {
		super(props);
		//this._calendar = this.props.app.ui.calendar.create(this.props);
		this._loadingIndicator = this.props.loadingIndicator;
		// this._previousMonthButton = null;
		// this._nextMonthButton = null;
		this._month = this.props.month || new Date();
		this._startDay = null;
		this._endDay = null;

		//this._previousMonthButton = this.props.previousMonthButton || ((this.props.previousMonthButton === false) ? null : <button>{"<"}</button>);
		//this._nextMonthButton = this.props.nextMonthButton || ((this.props.nextMonthButton === false) ? null : <button>{">"}</button>);


		this._topRightActionButton = this.props.topRightActionButton || null;
		this._onSelectDay = this.props.onSelectDay || null;
		// this.handleSelectDay = this.handleSelectDay.bind(this);
		this.handleNextMonthButtonClick = this.handleNextMonthButtonClick.bind(this);
		this.handlePreviousMonthButtonClick = this.handlePreviousMonthButtonClick.bind(this);
		this.initialize();
	}
	initialize() {
		this.initializeDays();
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
	componentDidMount() {
		// this.calendar.load();
	}
	componentWillReact() {

	}
	componentWillUnmount() {
		// this.calendar.remove();
	}
	shouldComponentUpdate(prevProps){
		return (prevProps.day !== this.props.day);
	}
	// get calendar() {
	// 	return this._calendar;
	// }
	get month(){
		return this._month;
	}
	get startDay(){
		return this._startDay;
	}
	get endDay(){
		return this._endDay;
	}
	get loadingIndicator() {
		return this._loadingIndicator;
	}
	// get nextMonthButton() {
	// 	return this._nextMonthButton;
	// }
	// get previousMonthButton() {
	// 	return this._previousMonthButton;
	// }
	get topRightActionButton() {
		return this._topRightActionButton;
	}
	handleNextMonthButtonClick() {
		this.calendar.loadNextMonth();
	}
	handlePreviousMonthButtonClick() {
		this.calendar.loadPreviousMonth();
	}
	handleSelectDay(date) {
		this._onSelectDay(date);
	}
	renderMonthHeader() {
		throw("Calendar must extend core calendar renderDaysHeader");
		// let label = Slashr.utils.date.getMonthLabel(this.calendar.month);
		// label = `${Slashr.utils.date.getMonthLabel(this.calendar.month)} ${this.calendar.month.getFullYear()}`
		// return (
		// 	<div className="calendar-month-label">
		// 		{label}
		// 	</div>
		// );
	}
	renderDaysHeader() {
		throw("Calendar must extend core calendar renderDaysHeader");
		// let ret = [];
		// for (let d = 0; d <= 6; d++) {
		// 	ret.push(
		// 		<div
		// 			className="calendar-days-header-day-label"
		// 			key={`${this.keyPrefix}}dh${d}`}
		// 		>
		// 			{Slashr.utils.date.getDayLabel(d, Slashr.utils.date.LABEL_TYPE_SHORT)}
		// 		</div>
		// 	);
		// }
		// return ret;
	}
	dayRenderer(date) {
		let key = Slashr.utils.date.toShortDate(date);
		//if(this.calendar._dayContent) console.log("calendar",key,this.calendar._dayContent);
		//if(this.calendar._dayContent && this.calendar._dayContent[key]) console.log("calendar day rendere",key,this.calendar._dayContent[key]);
		if (this.dayContent && this.dayContent(key)) {
			return this.dayContent(key);
		}
		else return null;
	}
	renderDays() {
		throw("Calendar must extend core calendar renderDays");
		// let currDay = new Date(this.calendar.startDay);
		// let weeks = [];
		// let days = [];
		// let today = new Date();
		// while (currDay <= this.calendar.endDay) {
		// 	let d = currDay.getDay();
		// 	let classNames = ["calendar-day"];
		// 	let onSelectDay = (this._onSelectDay) ? this.handleSelectDay.bind(this, new Date(currDay)) : null;
		// 	if (currDay.getMonth() < this.calendar.month.getMonth()) classNames.push("calendar-day-previous-month");
		// 	else if (currDay.getMonth() > this.calendar.month.getMonth()) classNames.push("calendar-day-next-month");
		// 	if (Slashr.utils.date.areDatesSameDay(currDay, today)) classNames.push("calendar-day-today");
		// 	else if (currDay < today) classNames.push("calendar-day-past");
		// 	if (this.props.day && Slashr.utils.date.areDatesSameDay(currDay, this.props.day)) classNames.push("calendar-day-selected");
		// 	days.push(
		// 		<div
		// 			className={classNames.join(" ")}
		// 			key={`${this.calendar.keyPrefix}}d${currDay.getDate()}`}
		// 			onClick={onSelectDay}
		// 		>
		// 			<div className="calendar-day-label">
		// 				{currDay.getDate()}
		// 			</div>
		// 			<div className="calendar-day-content">
		// 				{this.dayRenderer(currDay)}
		// 			</div>
		// 		</div>
		// 	);
		// 	if (d === 6) {
		// 		weeks.push(
		// 			<div
		// 				className="calendar-week"
		// 				key={`${this.calendar.keyPrefix}}d${weeks.length}`}
		// 			>
		// 				{days}
		// 			</div>
		// 		);
		// 		days = [];
		// 	}
		// 	currDay.setDate(currDay.getDate() + 1);
		// }
		// return weeks;
	}
	render() {
		throw("Calendar must extend core calendar render");
		// let classNames = ["calendar"];
		// if (this.props.className) classNames.push(this.props.className);
		// let nextMonthButton = (!this._nextMonthButton) ? null : React.cloneElement(this._nextMonthButton, {
		// 	onClick: this.handleNextMonthButtonClick
		// });
		// let previousMonthButton = (!this._nextMonthButton) ? null : React.cloneElement(this._previousMonthButton, {
		// 	onClick: this.handlePreviousMonthButtonClick
		// });
		// return (
		// 	<Container
		// 		classNames={classNames}
		// 	>
		// 		{!this.calendar.isLoaded && this.loader &&
		// 			<div className="calendar-loader">
		// 				{this.loadingIndicator}
		// 			</div>
		// 		}
		// 		<div className="calendar-header">
		// 			<div className="calendar-previous-month-button">
		// 				{previousMonthButton}
		// 			</div>
		// 			{this.renderMonthHeader()}
		// 			<div className="calendar-next-month-button">
		// 				{nextMonthButton}
		// 			</div>
		// 			{this.topRightActionButton &&
		// 				<div className="calendar-top-right-action-button">
		// 					{this.topRightActionButton}
		// 				</div>
		// 			}
		// 		</div>
		// 		<div className="calendar-days-header">
		// 			{this.renderDaysHeader()}
		// 		</div>
		// 		<div className="calendar-month">
		// 			<div className="calendar-days">
		// 				{this.renderDays()}
		// 			</div>
		// 		</div>
		// 	</Container>
		// );
	}
}
