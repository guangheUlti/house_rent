// @Author : guanghe
// 定义应用的全局资源
import React from "react";
import UserMgr from "./page/user/UserMgr.jsx";
import HouseMgr from "./page/house/HouseMgr.jsx";
import TradeMgr from "./page/trade/TradeMgr.jsx";
import ContractMgr from "./page/contract/ContractMgr.jsx";

class Global extends React.Component{
	static user = null;
	static token = null;
	static city = null;
	static province = null;
	static Url = {
		public_maskCode:"/sso/public/captcha",
		public_getDictionary:"/sso/public/getDictionary/",
		user_login:"/sso/user/login",
		user_getInfo:"/sso/user/token/",
		user_check:"/sso/user/check/",
		user_register:"/sso/user/register",
		user_update:"/sso/user/update",
		user_delete:"/sso/user/delete",
		user_getUser:"/sso/user/getUser/",
		user_getList:"/sso/user/getList",
		user_exportExcel:"/sso/user/exportExcel",
		house_create:"/house/house/create",
		house_update:"/house/house/update",
		house_delete:"/house/house/delete",
		house_getHouse:"/house/house/getHouse/",
		house_getList:"/house/house/getList",
		house_exportExcel:"/house/house/exportExcel",
		trade_create:"/house/trade/create",
		trade_update:"/house/trade/update",
		trade_delete:"/house/trade/delete",
		trade_getTrade:"/house/trade/getTrade/",
		trade_getList:"/house/trade/getList",
		trade_exportExcel:"/house/trade/exportExcel",
		contract_create:"/house/contract/create",
		contract_update:"/house/contract/update",
		contract_delete:"/house/contract/delete",
		contract_getContract:"/house/contract/getContract/",
		contract_getList:"/house/contract/getList",
		contract_exportExcel:"/house/contract/exportExcel",
	};
	static getContent = (content) => {
		switch (content) {
			case "0" : return <UserMgr key={0}/>;
			case "1" : return <HouseMgr key={0}/>;
			case "2" : return <TradeMgr key={0}/>;
			case "3" : return <ContractMgr key={0}/>; 
			default : return <div><h1>No such Page!</h1></div>;
		}
	}
};
export default Global;
