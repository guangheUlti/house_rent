// @Author : guanghe
import fetch from "isomorphic-fetch";
import PopupWait from "./PopupWait";

var ghTip = null;
function parseJSON(response) {
	if(ghTip) {
		PopupWait.close();
	}
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
function GHFetchWithTip(url, params, callback, tip) {
	ghTip = tip;
	if(tip != null) {
		PopupWait.open(tip);
	}
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
	.catch(err => { 
		if (ghTip != null) {
			PopupWait.close();
		}
		alert("request failed " + err); 
	});
}
export default GHFetchWithTip;