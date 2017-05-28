// @Author : guanghe

class CookieUtil {
	//获取指定名字的cookie，未找到返回null
	static get(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if ( document.cookie.match(reg) ) {
			arr = document.cookie.match(reg);
			return unescape(arr[2]);
		}
		return null;
	}
	//设置指定名字的cookie
	static set(name, value) {
		document.cookie = name + "=" + escape(value);
	}
	//设置指定名字的cookie,并设置过期时间(天)
	static setWithTime(name, value, day) {
		var time = day * 24 * 60 * 60 * 1000;
		var date = new Date();
		date.setTime(date.getTime() + time);
		document.cookie = name + "=" + escape(value) + ";expires=" + date.toGMTString();
	}
	//删除指定名字的cookie
	static del(name) {
		var date = new Date();
		date.setTime(date.getTime() - 1000);
		document.cookie = name + "=0;expires=" + date.toGMTString();
	}
}

export default CookieUtil;
