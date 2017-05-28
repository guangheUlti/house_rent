// @Author : guanghe
import React from "react";
import {Form,Input,Button,Row,Col,message} from 'antd';
import CookieUtil from "../utils/CookieUtil";
import Global from "./Global";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tip:null,
			requestParams:null,
			paddingTop:"300px",
			codeSrc:Global.Url.public_maskCode+"?"+new Date().getTime()
		};
	}
	componentWillMount() {
  		var height = null;
  		if (document.documentElement && document.documentElement.clientHeight) {
			height = Math.round(document.documentElement.clientHeight * 0.4);
			this.setState({paddingTop:height + "px" });
		}	
  	}
	doRequest = () => {
		var that = this;
		fetch( Global.Url.user_login,{
			method: "POST",
			headers: {"Content-Type":"application/x-www-form-urlencoded"},
		  	body: this.state.requestParams
		}).then(function(response) {
		    if (response.status >= 400) {  
		        throw new Error("Bad response from server!");
    		}
		    return response.json(); 
		}).then(function(json) {
			if(json.status !== 200) {
				message.error(json.msg);
			} else {
				Global.token = json.data;
		    	CookieUtil.set("user",json.data);
		    	that.props.enter();
			}
		}).catch(function(error) {
			alert("request failed " + error);  
		});
	}
	handleSubmit = () => {
		this.props.form.validateFields(["username","password","captcha"],(err,params) => {
			if(err) {return;}
			var requestParams = "";
			if(params.username) {
				requestParams += "&username=" + params.username;
			}
			if(params.password) {
				requestParams += "&password=" + params.password;
			}
			if(params.captcha) {
				requestParams += "&captcha=" + params.captcha;
			}
			if(requestParams.length > 0) {
				requestParams = requestParams.substring(1,requestParams.length);
			}
			this.setState({requestParams:requestParams},() => {
				this.doRequest();
			});
		});
	}
	getNewCode = () => {
		this.setState({codeSrc:Global.Url.public_maskCode+"?"+new Date().getTime()});
	}
	handleRegister = () => {
		this.props.register();
	}
	render() {
		const {getFieldDecorator} = this.props.form;
		const formItemLayout = {labelCol:{span:6},wrapperCol:{span:14}};
		const FormItem = Form.Item;
		return (
			<div>
				<Row style={{paddingTop:this.state.paddingTop}}>
					<Col span={8} />
					<Col span={8}>
						<Form >
							<FormItem {...formItemLayout} label="用户名">
								{getFieldDecorator("username",{rules:[{required:true, message:"请输入用户名!"}]})(
									<Input type="text" placeholder="请输入" />
								)}
							</FormItem>
							<FormItem {...formItemLayout} label="密码">
								{getFieldDecorator("password",{rules:[{required:true, message:"请输入密码!"}]})(
									<Input type="password" placeholder="请输入" />
								)}
							</FormItem>
							<FormItem {...formItemLayout} label="验证码">
								<Col span={9}><img src={this.state.codeSrc} alt={"code"} onClick={this.getNewCode}/></Col>
								<Col span={1}/>
								<Col span={14}>
									{getFieldDecorator("captcha",{rules:[{required:true, message:"请输入验证码!!"}]})(
										<Input type="text"/>
									)}
								</Col>
							</FormItem>
							<Col span={7} />
							<Col span={5}><Button type="primary" onClick={this.handleSubmit}>登录</Button></Col>
							<Col span={1} />
							<Col span={6}><Button type="primary" onClick={this.handleRegister}>注册</Button></Col>
							<span style={{color:"red"}}>{this.state.tip}</span>
						</Form>
					</Col>
					<Col span={8} />
				</Row>
			</div>
		);
	}
}
export default Form.create()(Login);
