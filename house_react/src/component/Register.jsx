// @Author : guanghe
import React from "react";
import {Form,Input,Button,Row,Col,message,Select} from 'antd';
import Global from "./Global";
const Option = Select.Option;

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tip:null,
			requestParams:null,
			paddingTop:"300px",
			levelOption:[],
		};
	}
	componentWillMount() {
  		var height = null;
  		if (document.documentElement && document.documentElement.clientHeight) {
			height = Math.round(document.documentElement.clientHeight * 0.4);
			this.setState({paddingTop:height + "px" });
		}
		this.getDataDictionary("level");	
  	}
	doRequest = () => {
		var that = this;
		fetch( Global.Url.user_register,{
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
				message.success("注册成功！");
		    	that.props.login();
			}
		}).catch(function(error) {
			alert("request failed " + error);  
		});
	}
	handleSubmit = () => {
		this.props.form.validateFields(["username","password","level"],(err,params) => {
			if(err) {return;}
			var that = this;
			fetch( Global.Url.user_check + "username/" + params.username,{
				method: "POST",
				headers: {"Content-Type":"application/x-www-form-urlencoded"},
			  	body: null
			}).then(function(response) {
			    if (response.status >= 400) {  
			        throw new Error("Bad response from server!");
	    		}
			    return response.json(); 
			}).then(function(json) {
				if(json.data === false) {
					message.error("用户名已存在！");
					return;
				} else {
					var requestParams = "";
					if(params.username) {
						requestParams += "&username=" + params.username;
					}
					if(params.password) {
						requestParams += "&password=" + params.password;
					}
					if(params.level) {
						requestParams += "&level=" + params.level;
					}
					if(requestParams.length > 0) {
						requestParams = requestParams.substring(1,requestParams.length);
					}
					that.setState({requestParams:requestParams},() => {
						that.doRequest();
					});
				}
			}).catch(function(error) {
				alert("request failed " + error);  
			});
		});
	}
	getDataDictionary = (option) => {
		var that = this;
		switch (option) {
			case "level" :
				var levelData = {};
				var levelOption = [];
				fetch( Global.Url.public_getDictionary + "user_level",{
					method: "POST",
					headers: {"Content-Type":"application/x-www-form-urlencoded"},
				  	body: null
				}).then(function(response) {
				    if (response.status >= 400) {  
				        throw new Error("Bad response from server!");
		    		}
				    return response.json(); 
				}).then(function(json) {
					if(json.status !== 200) {
						message.error(json.msg);
					} else {
						levelData = json.data;
						for(let level in levelData) {
							levelOption.push(<Option key={level}>{levelData[level]}</Option>);
						}
						that.setState({levelOption:levelOption});
					}
				}).catch(function(error) {
					alert("request failed " + error);  
				});
				break;
			default : alert("Bad get Dictionary");
		}
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
									<Input type="text" placeholder="请输入" />
								)}
							</FormItem>
							<FormItem {...formItemLayout} label={"用户类型"}>
								{getFieldDecorator("level",
									{rules:[{required:true,message:"请选择用户类型！"}]})(
									<Select placeholder="请选择" >
										{this.state.levelOption}
									</Select>)}
							</FormItem>
							<Col span={7} />
							<Col span={5}><Button type="primary" onClick={this.handleSubmit}>注册</Button></Col>
							<Col span={1} />
							<Col span={6}><Button type="primary" onClick={() => {this.props.login()}}>返回</Button></Col>
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
