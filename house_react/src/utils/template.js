// @Author : guanghe
/*
*****************************************************************
#fetch Request 使用isomorphic-fetch发送fetch请求

import fetch from 'isomorphic-fetch';  //ES6中为window原生方法

fetch(url,{
	method: "POST",
  	headers: {"Content-Type":"application/x-www-form-urlencoded"},
  	body: "firstName=Nikhil&favColor=blue&password=easytoguess"
}).then(function(response) {
    if (response.status >= 400) {  //判断请求是否成功
        throw new Error("Bad response from server!");
    }
    //response.headers.get('Content-Type')
    //response.headers.get('Date')
    //response.status
    //response.statusText
    //response.type
    //response.url

    return response.json();  //将Promise对象转成json对象
    //.text()：返回字符串
	//.json()：返回一个JSON对象
	//.formData()：返回一个FormData对象
	//.blob()：返回一个blob对象
	//.arrayBuffer()：返回一个二进制数组
}).then(function(json) {
    console.log(json);  //执行你的代码
}).catch(function(ex) {
	console.log('request failed', ex);  //异常处理
});
*****************************************************************

*****************************************************************
#JSONP Request 使用fetch-jsonp发送jsonp请求

import fetchJsonp from 'fetch-jsonp';

fetchJsonp(url,{
	jsonp:'callback',  //可不设置，默认生成为callback
	jsonpCallback:'myCallback',  //可不设置，默认生成随机名称
	timeout:3000,  //可不设置，默认5000
	data:{a:1},  //参数  最后生成url?a=1&callback=myCallback的请求
}).then(function(response) {
	return response.json();  //接受结果为Promise对象，转成json对象
}).then(function(json) {
	console.log(json);  //执行你需要的代码
}).catch(function(ex) {
	console.log('parsing failed', ex);  //异常处理
})

!!!jsonp返回的数据不能是纯json，而是"函数名(json)"的js代码
*****************************************************************


*/