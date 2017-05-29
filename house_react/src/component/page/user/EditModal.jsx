// @Author : guanghe
import React from "react";
import {Form,Input,InputNumber,Button,Row,Col,message,Select,Modal} from 'antd';
import Global from "../../Global";
import GHFetch from "../../../utils/FetchUtil";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource:[],
			selectedRowKeys:[],
			levelOption:[],
			genderOption:[],
			statusOption:[],
			modalTitle:"",
			isCreate:true,
			isDetail:false,
		};
	}
	componentWillMount() {
		this.state = this.props.state;
  	}
  	componentDidMount() {
		this.persistFun(this.props.funName);
  	}
	persistFun = (option) => {
		var that = this;
		switch (option) {
			case "showCreate" :
				this.props.form.resetFields();
				this.setState({modalTitle:"添加用户",isCreate:true,isDetail:false}); 
				break;
			case "showUpdate" :
				this.loadData();
				this.setState({modalTitle:"修改用户",isCreate:false,isDetail:false}); 
				break;
			case "detail" :
				this.loadData();
				this.setState({modalTitle:"用户详细信息",isDetail:true}); 
				break;
			case "save" :
				this.props.form.validateFields((err,params) => {
					if(err) { return; }
					var url = "";
					if(this.state.isCreate) {
						url = Global.Url.user_register;
					} else {
						let row = this.state.dataSource[this.state.selectedRowKeys[0]];
						url = Global.Url.user_update;
						params.id = row.id;
						params.createTime = row.createTime;
					}
					var callback = (json) => {
						if(json.status !== 200) {
							message.error(json.msg);
						} else {
							if(that.state.isCreate) {
								message.success("注册成功！");
							} else {
								message.success("修改成功！");
							}
							that.props.doRequest();
							that.props.closeModal();
						}
					}
					GHFetch(url,params,callback);
				});
				break;
			default : alert("Bad persistFun");
		}
	}
	loadData = () => {
		let params = this.state.dataSource[this.state.selectedRowKeys[0]];
		this.props.form.setFieldsValue({
			username:params.username,
			password:"000000",
			level:params.level.toString(),
			realname:params.realname,
			idnumber:params.idnumber,
			address:params.address,
			phone:params.phone,
			gender:params.gender!=null?params.gender.toString():"",
			age:params.age,
			email:params.email,
			status:params.status!=null?params.status.toString():""
		});
	}
	render() {
		const {getFieldDecorator} = this.props.form;
		const FormItem = Form.Item;
		const disableStyle = {border:"none",background:"none",color:"#000",cursor:"default"};
		const itemLayout = {disabled:this.state.isDetail,style:this.state.isDetail?disableStyle:{}};
		return (
			<Modal title={this.state.modalTitle} maskClosable={false} visible={true} 
				width={"75%"} onCancel={this.props.closeModal} 
				footer={this.state.isDetail?[]:[<Button key="0" type="primary" onClick={this.persistFun.bind(this,"save")}>确定</Button>,
					<Button key="1" type="primary" onClick={this.props.closeModal}>取消</Button>]}>
				<Form>
					<Row style={{marginTop:14}}>
						<Col span={8}>
							<FormItem label={"用户名"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
							{getFieldDecorator("username",
								{initialValue:"",rules:[{required:true,message:"请输入用户名！"}]})(
								<Input type={"text"} {...itemLayout} placeholder={"请输入"}/>)}
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem label={"密码"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
							{getFieldDecorator("password",
								{initialValue:"",rules:[{required:true,message:"请输入密码！"}]})(
								<Input type={"text"} {...itemLayout} placeholder={"请输入"}/>)}
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem label={"用户类型"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
								{getFieldDecorator("level",
									{initialValue:null,rules:[{required:true,message:"请输入用户类型！"}]})(
										<Select placeholder="请选择" {...itemLayout} >
											{this.state.levelOption}
										</Select>)}
							</FormItem>
						</Col>
					</Row>
					<Row style={{marginTop:14}}>
						<Col span={8}>
							<FormItem label={"真实姓名"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
							{getFieldDecorator("realname",
								{initialValue:"",rules:[{required:false,message:"请输入真实姓名！"}]})(
								<Input type={"text"} {...itemLayout} placeholder={"请输入"}/>)}
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem label={"身份证号"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
							{getFieldDecorator("idnumber",
								{initialValue:"",rules:[{required:false,message:"请输入身份证号！"}]})(
								<Input type={"text"} {...itemLayout} placeholder={"请输入"}/>)}
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem label={"联系地址"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
							{getFieldDecorator("address",
								{initialValue:"",rules:[{required:false,message:"请输入联系地址！"}]})(
								<Input type={"text"} {...itemLayout} placeholder={"请输入"}/>)}
							</FormItem>
						</Col>
					</Row>
					<Row style={{marginTop:14}}>
						<Col span={8}>
							<FormItem label={"手机号"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
							{getFieldDecorator("phone",
								{initialValue:"",rules:[{required:false,message:"请输入手机号！"}]})(
								<Input type={"text"} {...itemLayout} placeholder={"请输入"}/>)}
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem label={"性别"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
								{getFieldDecorator("gender",
									{initialValue:null,rules:[{required:false,message:"请输入性别！"}]})(
										<Select {...itemLayout} placeholder="请选择" >
											{this.state.genderOption}
										</Select>)}
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem label={"年龄"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
							{getFieldDecorator("age",
								{initialValue:"",rules:[{required:false,message:"请输入年龄！"}]})(
								<InputNumber {...itemLayout} placeholder={"请输入"}/>)}
							</FormItem>
						</Col>
					</Row>
					<Row style={{marginTop:14}}>
						<Col span={8}>
							<FormItem label={"邮箱"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
							{getFieldDecorator("email",
								{initialValue:"",rules:[{required:false,message:"请输入邮箱！"}]})(
								<Input type={"text"} {...itemLayout} placeholder={"请输入"}/>)}
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem label={"用户状态"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
							{getFieldDecorator("status",
								{initialValue:null,rules:[{required:false,message:"请输入用户类型！"}]})(
									<Select {...itemLayout} placeholder="请选择" >
										{this.state.statusOption}
									</Select>)}
							</FormItem>
						</Col>
					</Row>
				</Form>
			</Modal>
		);
	}
}
export default Form.create()(App);
