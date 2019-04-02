const Validators = {
	email: (value) => {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(value)){
			return {
				success: true,
				value: value
			};
		}
		else return {error: "Please enter a valid email."}
	},
	username: (value) => {
		let isValid = value.match(/^\w+$/);
		value = value.trim();
		if(isValid && (value.length < 3 || value.length > 15)) isValid = false;
		if(! isValid) return {
			error: "Username must be between 3 and 15 letters and can only contain letters, numbers, and userscores.",
			value: value
		};
		else return {
			success: true,
			value: value
		};
	},
	password: (value) => {
		if(! value || value.length < 6) return {error: "Password must be at least 6 characters."}
		else return true;
	},
	passwordConfirm: (value, options, form) => {
		if(! form.elmts.password) return {
			error: "Password element not found."
		};
		if(form.elmts.password.value !== value) return {
			error: "Password Mismatch"
		};
		else return true;
	},
	positiveInt: (value) => {
		value = `${value}`;
		if(/^\d+$/.test(value)) return true;
		else return {error: "Must be a positive whole number."};
	},
	int: (value) => {
		value = `${value}`;
		if(value.match(/^-{0,1}\d+$/)) return true;
		else return {error: "Must be a whole number."};
	}
}
export default Validators;