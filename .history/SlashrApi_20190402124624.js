// import axios from 'axios';
import axios from 'axios/dist/axios';
import Slashr from './Slashr';

class slashrApi{
	async fetch(namespace, data = {}){
		
		let config = {
			headers : {}
		};
		if(this.hasAccessToken()) {
			config.headers['Authorization'] = "Bearer "+this._getAccessToken();
		}

		const response = await axios.post(this.baseUrl+namespace,data, config);
		
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
		if(this.hasAccessToken()) config.headers['Authorization'] = "Bearer "+this._getAccessToken();

		const response = await axios.post(this.baseUrl+namespace, formData, config);

		// Save the token
		if(response.data.accessToken) localStorage.setItem("accessToken",response.data.accessToken);

		return response.data.data;

	}
	get baseUrl(){
		return Slashr.config.api.url;
	}
	_getAccessToken(){
		return localStorage.getItem("accessToken") || null;
	}
	deleteAccessToken(){
		localStorage.removeItem("accessToken");
		return true;
	}
	accessTokenExists(){
		return (localStorage.getItem("accessToken")) ? true : false;
	}
	hasAccessToken(){
		return this.accessTokenExists();
	}
}
export const api = new slashrApi();