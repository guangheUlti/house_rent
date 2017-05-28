// @Author : guanghe
import fetch from "isomorphic-fetch";
import PopupWait from "./PopupWait";

class FetchWithTipUtil {
	/* HTTP请求，参数：
			url: URL，不能包含最后的'?'，且返回结果必须是纯文本的json数据(UTF-8编码)
			params: 请求参数，{ xx: "xxx" }
			callback: 回调函数，格式为 callback(res, data)，其中res==0表示成功，-1表示异常，1表示失败(data为错误信息)
			tip: 等待提示，null表示不显示
	*/
	static fetch(url, params, callback, tip) {
		if(tip != null) {
			PopupWait.open(tip);
		}
		if(params != null) {
			let first = true;
			for(let p in params) {
				url += (first ? "?" : "&") + p + "=" + params[p];
				first = false;
			}
		}
		fetch(url).then((res) => {
			if(tip != null) {
				PopupWait.close();
			}
			if(res.ok) {   // 请求成功
				res.json().then((data) => {
					if (!!callback) {
						callback(0, data);      // 成功后的回调
					}
				}, (e) => {
					if (!!callback) {
						callback(-1, e);      // JSON解析失败
					}
				});
			}else {          // 请求失败
				if(!!callback) {
					callback(1, res.statusText);      // JSON解析失败
				}
			}
		}, (e) => {         // 请求失败
			if (tip != null) {
				PopupWait.close();
			}
			if (!!callback) {
				callback(-1, e);
			}
		});
	}
}

export default FetchWithTipUtil;