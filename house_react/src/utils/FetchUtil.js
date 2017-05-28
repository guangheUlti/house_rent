// @Author : guanghe 
require('isomorphic-fetch');
require('es6-promise').polyfill();

function parseJSON(response) {
	return response.json();
}
function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}
	const error = new Error(response.statusText);
	error.response = response;
	throw error;
}
function GHFetch(url, params, callback) {
	let paramsStr = "";
	if(params != null) {
		let first = true;
		for(let p in params) {
			if(params[p]) {
				paramsStr += (first ? "" : "&") + p + "=" + params[p];
				first = false;
			}
		}
	}
	return fetch(url, {
		method: "POST",
		headers: {"Content-Type":"application/x-www-form-urlencoded"},
	  	body: paramsStr
	}).then(checkStatus)
	.then(parseJSON)
	.then(json => {callback(json)})
	.catch(err => { alert("request failed " + err); });
}
export default GHFetch;
