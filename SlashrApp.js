import { Slashr } from './Slashr';
import { SlashrUiDialogDomain } from './domains/SlashrUiDialogDomain';
import { SlashrUiLayoutDomain } from './domains/SlashrUiLayoutDomain';
import { SlashrUiFormDomainInstances } from './domains/SlashrUiFormDomain';
import { SlashrUiModalDomainInstances } from './domains/SlashrUiModalDomain';
import { SlashrUiProgressIndicatorDomain } from './domains/SlashrUiProgressIndicatorDomain';
// import { SlashrUiCalendarDomainInstances } from './domains/SlashrUiCalendarDomain';
import { SlashrUiDatePickerDomainInstances } from './domains/SlashrUiDatePickerDomain';
import { SlashrUiThemeDomain } from './domains/SlashrUiThemeDomain';

// import { SlashrAppRouter } from './Router';

export class SlashrApp {
	constructor(options) {
		if (!options.config) throw ("Slashr Error: No Config.");
		//if (!options.routes) throw ("Slashr Error: No Routes.");
		this._slashr = Slashr.getInstance();
		this._metadata = {
			model: new SlashrAppModel(this._slashr, this, options),
			// router: new SlashrAppRouter(this._slashr, this, options),
			config: options.config,
			routes: options.routes,
			defaultLayout: options.defaultLayout || null,
			utilities: this._slashr.utils,
			scrollBehavior: options.scrollBehavior || null
		}
		this._slashr.app = this;
	}

	get router() {
		return this._metadata.router;
	}
	get rtr() {
		return this._metadata.router;
	}
	get model() {
		return this._metadata.model;
	}
	get mdl() {
		return this.model;
	}
	get domain() {
		return this.mdl.domain;
	}
	get dm() {
		return this.domain;
	}
	get entity() {
		return this.mdl.entity;
	}
	get ent() {
		return this.entity;
	}
	get database() {
		return this.mdl.database;
	}
	get db() {
		return this.database;
	}
	get query() {
		return this.db.qry;
	}
	get qry() {
		return this.query;
	}
	get ui() {
		return this.mdl.ui;
	}
	get routes() {
		return this._metadata.routes;
	}
	get utilities() {
		return this._metadata.utilities;
	}
	get utils() {
		return this._metadata.utilities;
	}
	get defaultLayout() {
		return this._metadata.defaultLayout;
	}
	get config() {
		return this._metadata.config;
	}
	get scrollBehavior() {
		return this._metadata.scrollBehavior;
	}
	get slashrInstance() {
		return this._slashr;
	}
}

export class SlashrAppModel {
	constructor(slashr, app, options) {
		if (!options.domain) throw ("Slashr Error: No Domain.");
		if (!options.ui) throw ("Slashr Error: No Ui.");
		this._app = app;
		this._slashr = slashr;

		this._metadata = {
			domain: options.domain,
			ui: options.ui
		}
		if (options.ui.dialog) console.warn("Replacing UI Dialog ignored.");
		options.ui.dialog = this._metadata.ui.dlg = new SlashrUiDialogDomain(slashr);
		//console.log(options.domain);
		if (options.ui.layout) console.warn("Replacing UI layout domain may cause issues.");
		else this._metadata.ui.layout = this._metadata.ui.lyt = new SlashrUiLayoutDomain(slashr);

		if (options.ui.forms) console.warn("Replacing UI Form domain may cause issues.");
		else this._metadata.ui.forms = this._metadata.ui.fms = new SlashrUiFormDomainInstances(slashr);

		if (options.ui.progressIndicator) console.warn("Replacing UI Progress Indicator domain may cause issues.");
		else this._metadata.ui.progressIndicator = new SlashrUiProgressIndicatorDomain(slashr);

		if (options.ui.modal) console.warn("Replacing UI Modal domain may cause issues.");
		else this._metadata.ui.modal = new SlashrUiModalDomainInstances(slashr);

		// if (options.ui.calendar) console.warn("Replacing UI Calendar domain may cause issues.");
		// else this._metadata.ui.calendar = this._metadata.ui.cal = new SlashrUiCalendarDomainInstances(slashr);

		if (options.ui.datePicker) console.warn("Replacing UI Date Picker domain may cause issues.");
		else this._metadata.ui.datePicker = new SlashrUiDatePickerDomainInstances(slashr);

		if (options.ui.theme) console.warn("Replacing UI Theme Picker domain may cause issues.");
		else this._metadata.ui.theme = new SlashrUiThemeDomain(slashr);


		// Bind ui methods
		// TODO: Add this to SlashrAppUiModel
		this._metadata.ui.createGrid = this._createGrid.bind(this);

	}
	get domain() {
		return this._metadata.domain;
	}
	get dm() {
		return this.domain;
	}
	get ui() {
		return this._metadata.ui;
	}
	// Helper ui methods
	_createGrid(name, options = {}) {
		let props = options;
		props.name = name;
		props.slashr = this._slashr;
		return this._slashr.ui.createGrid(props);
	}
}