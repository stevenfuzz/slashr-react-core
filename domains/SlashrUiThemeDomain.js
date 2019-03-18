import { Slashr } from "../Slashr";

export class SlashrUiThemeDomain extends Slashr.Domain{
	constructor(slashr) {
		super();
		this._slashr = slashr;
		this._name = "default"
		this.color = new SlashrUiThemeColorsDomain(slashr, this);
		this.state = {
		};
	}
	get name(){
		return this._name;
	}
	setName(name){
		this._theme = name;
	}
}

class SlashrUiThemeColorsDomain extends Slashr.Domain{
	colorUtils = {
        rgba: (color, opacity = 1) => {
            color = color.replace('#','');
            let r = parseInt(color.substring(0,2), 16);
            let g = parseInt(color.substring(2,4), 16);
            let b = parseInt(color.substring(4,6), 16);
            return `rgba(${r},${g},${b},${opacity})`;
        }
	};
	constructor(slashr, theme) {
		super();
		this._slashr = slashr;
		this._theme = theme;
		return new Proxy(this, {
			get: function (obj, prop) {
				if(! obj._colors) obj.initialize();
				if(prop === "utils") return obj.colorUtils;
				else if(obj[prop]) return obj[prop];
				else if(obj._colors[prop]) return obj._colors[prop];
				return null;
			}
		});
	}
	initialize(){
		this._colors = {};
		let colors = defaultColors;
		let themes = this._slashr.config.themes;
		if(themes && themes[this._theme.name] && themes[this._theme.name].colors){
			
			colors = {...colors, ...themes[this._theme.name].colors};
		}
		for(let color in colors){
			this._colors[color] = colors[color];
		}
	}
	_themeColors(){
		let colors = defaultColors;
		for(let color in colors){
			this[color] = colors[color];
		}
	}

}

const defaultColors = {
	primary: "#6200ea",
	primaryDark:  "#9d46ff",
	primaryLight: "#0aoob6",
	secondary: "#29b6f6",
	secondaryLight: "#73e8ff",
	secondaryDark: "#0086c3",
	background: "#FFFFFF",
	surface: "#FFFFFF",
	error: "#B00020",
	onPrimary: "#FFFFFF",
	onSecondary: "#FFFFFF",
	onBackground: "#000000",
	onSurface: "#000000",
	onError: "#FFFFFF",
	surface: "#FFFFFF",
	white: "#FFFFFF",
	lightGray: "#EEEEEE",
	grey: "#AAAAAA",
	darkGray: "#222222",
	darkGreySecondary: "#333333"
}

// export class colors{
//     // static primary = "#c51162";
//     // static primaryLight = "#fd558f";
//     // static primaryDark = "#8e0038";
//     // static secondary = "#4527a0";
//     // static secondaryLight = "#7953d2";
//     // static secondaryDark = "#000070";
//     // static white = "#ffffff";
//     // static lightGray = "#eeeeee";
//     // static grey = "#9e9e9e";
//     // static darkGray = "#232123";
//     // static darkGreySecondary = "#332631";
//     utils = {
//         rgba: (color, opacity = 1) => {
//             color = color.replace('#','');
//             let r = parseInt(color.substring(0,2), 16);
//             let g = parseInt(color.substring(2,4), 16);
//             let b = parseInt(color.substring(4,6), 16);
//             return `rgba(${r},${g},${b},${opacity})`;
//         }
// 	};
// 	constructor(){
// 		this.primary = config.primary || "#6200ea";
// 		this.primaryDark = config.primaryDark || "#9d46ff";
// 		this.primaryLight = config.primaryLight || "#0aoob6";
// 		this.secondary = config.secondary || "#29b6f6";
// 		this.secondaryLight = config.secondaryLight || "#73e8ff";
// 		this.secondaryDark = config.secondaryDark || "#0086c3";
// 		this.background = config.background || "#FFFFFF";
// 		this.surface = config.surface || "#FFFFFF";
// 		this.error = config.error || "#B00020";
// 		this.onPrimary = config.onPrimary || "#FFFFFF";
// 		this.onSecondary = config.onSecondary || "#FFFFFF";
// 		this.onBackground = config.onBackground || "#000000";
// 		this.onSurface = config.onSurface || "#000000";
// 		this.onError = config.onError = "#FFFFFF";
		

		
// 		this.surface = config.surface || "#FFFFFF";

// 		this.white = config.white || "#FFFFFF";
// 		this.lightGray = config.lightGray || "#EEEEEE";
// 		this.grey = config.grey || "#AAAAAA";
// 		this.darkGray = config.darkGray || "#222222";
// 		this.darkGreySecondary = config.darkGreySecondary || "#333333";
// 	}
// }
