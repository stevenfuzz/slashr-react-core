// import axios from 'axios';
import axios from 'axios/dist/axios';
// import Slashr from './Slashr';

export class SlashrApi{
    constructor(slashr, app, options = {}){
        this.slashr = slashr;
    }
	async fetch(namespace, data = {}){
		
		let config = {
			headers : {}
		};
		if(this.hasAccessToken()) {
			config.headers['Authorization'] = "Bearer "+this._getAccessToken();
		}

        console.log(this.endPoint);

		const response = await axios.post(this.endPoint+namespace,data, config);
		
		// Save the token
		if(response.data.accessToken) localStorage.setItem("accessToken",response.data.accessToken);

		return response.data.data;
	}
	// Post same as fetch
	async post(namespace, data){
		return await this.fetch(namespace, data);
	}
	// Can be either formData, for slashr FormDomain
	async submit(namespace, form){

		let formData = (form instanceof FormData) ? form : form.toFormData();

		let config = {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		};
		//if(this.hasAccessToken()) config.headers['Authorization'] = "Bearer "+this._getAccessToken();

		const response = await axios.post(this.endPoint+namespace, formData, config);

		// Save the token
		if(response.data.accessToken) localStorage.setItem("accessToken",response.data.accessToken);

		return response.data.data;

	}
	get endpoint(){
        console.log(this.slashr.config);
		return this.slashr.config.api.url;
	}
	_getAccessToken(){
		//return localStorage.getItem("accessToken") || null;
	}
	deleteAccessToken(){
		//localStorage.removeItem("accessToken");
		return true;
	}
	accessTokenExists(){
		//return (localStorage.getItem("accessToken")) ? true : false;
	}
	hasAccessToken(){
		return this.accessTokenExists();
	}
}