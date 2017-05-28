// @Author : guanghe

class Base64Util {
		//将JS字符串(utf-16编码)进行Base64(utf-8)编码
		//注意：Base64编码的字符串会包含"+"，如果作为HTTP请求的GET参数提交给服务器时，会被转义为" "，需要在服务器端进行替换，再用Base64解码
		static encode (input) {
				var output = "";
				var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
				var i = 0;

				input = Base64._utf8_encode(input);
				while (i < input.length) {
						chr1 = input.charCodeAt(i++);
						chr2 = input.charCodeAt(i++);
						chr3 = input.charCodeAt(i++);
						enc1 = chr1 >> 2;
						enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
						enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
						enc4 = chr3 & 63;

						if (isNaN(chr2)) {
								enc3 = enc4 = 64;
						} else if (isNaN(chr3)) {
								enc4 = 64;
						}

						output = output +
							Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) +
							Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);
				}
				return output;
		}

		//将Base64(utf-8)编码的字符串转换为JS字符串(utf-16编码)
		static decode (input) {
				var output = "";
				var chr1, chr2, chr3;
				var enc1, enc2, enc3, enc4;
				var i = 0;

				input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
				while (i < input.length) {
						enc1 = Base64._keyStr.indexOf(input.charAt(i++));
						enc2 = Base64._keyStr.indexOf(input.charAt(i++));
						enc3 = Base64._keyStr.indexOf(input.charAt(i++));
						enc4 = Base64._keyStr.indexOf(input.charAt(i++));
						chr1 = (enc1 << 2) | (enc2 >> 4);
						chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
						chr3 = ((enc3 & 3) << 6) | enc4;

						output = output + String.fromCharCode(chr1);
						if (enc3 != 64) {
								output = output + String.fromCharCode(chr2);
						}
						if (enc4 != 64) {
								output = output + String.fromCharCode(chr3);
						}
				}

				output = Base64._utf8_decode(output);
				return output;
		}

		// 将JS字符串从utf-16转换为utf-8
		static _utf8_encode (str) {
			var out = "";
			var len = str.length;
			for(var i = 0; i < len; i++) {
				var c = str.charCodeAt(i);
				if ((c >= 0x0001) && (c <= 0x007F)) {
					out += str.charAt(i);
				} else if (c > 0x07FF) {
					out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
					out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
					out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
				} else {
					out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
					out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
				}
			}
			return out;
		}

		// 将utf-8字符串转换为utf-16
		static _utf8_decode (str) {
			var out = "";
			var len = str.length;
			var i = 0;
			var char2, char3;
			while(i < len) {
				var c = str.charCodeAt(i++);
				switch(c >> 4) {
					case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
						// 0xxxxxxx
						out += str.charAt(i-1);
						break;
					case 12: case 13:
						// 110x xxxx   10xx xxxx
						char2 = str.charCodeAt(i++);
						out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
						break;
					case 14:
						// 1110 xxxx  10xx xxxx  10xx xxxx
						char2 = str.charCodeAt(i++);
						char3 = str.charCodeAt(i++);
						out += String.fromCharCode(((c & 0x0F) << 12) |
						((char2 & 0x3F) << 6) |
						((char3 & 0x3F) << 0));
						break;
				}
			}
			return out;
		}
};
Base64._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

export default Base64Util;
