// @Author : guanghe
import React from "react";
import {Form,Input,InputNumber,Button,Row,Col,message,Collapse,DatePicker,Select,Table,Modal} from 'antd';
import moment from "moment";
import Global from "../../Global";
const Option = Select.Option;
const dateFormat = "YYYY-MM-DD";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			requestParams:"",
			pageNum:1,
			pageSize:10,
			dataSource:[],
			total:0,
			selectedRowKeys:[],
			levelData:{},
			levelOption:[],
			genderOption:[],
			statusOption:[],
			modalTitle:"",
			modalVisible:false,
			isCreate:true,
			isDetail:false,
		};
	}
	componentDidMount() {
  		this.getDataDictionary("level");	
  		this.getDataDictionary("status");
  		this.getDataDictionary("gender");
  		this.doRequest();
  	}
	doRequest = () => {
		var that = this;
		var requestParams = this.state.requestParams;
		let pageNum = this.state.pageNum ? this.state.pageNum : 1;
		let pageSize = this.state.pageSize ? this.state.pageSize : 10;
		if(requestParams) {
			requestParams += "&";
		}
		requestParams += "pageNum=" + pageNum;
		requestParams += "&pageSize=" + pageSize;
		fetch( Global.Url.user_getList,{
			method: "POST",
			headers: {"Content-Type":"application/x-www-form-urlencoded"},
		  	body: requestParams
		}).then(function(response) {
		    if (response.status >= 400) {  
		        throw new Error("Bad response from server!");
    		}
		    return response.json(); 
		}).then(function(json) {
			let dataSource = json.data;
			for(let i = 0; i < dataSource.length; i++) {
				dataSource[i].key = i;
				dataSource[i].indexNum = i + 1;
				dataSource[i].levelValue = that.state.levelData[dataSource[i].level];
			}
	    	that.setState({dataSource:dataSource,total:json.total});
		}).catch(function(error) {
			alert("request failed " + error);  
		});
	}
	handleSearch = () => {
		var searchParams = this.props.form.getFieldsValue(["username_s","level_s","createTime_s"]);
		var requestParams = "";
		if(searchParams.username_s) {
			requestParams += "&username=" + searchParams.username_s;
		}
		if(searchParams.level_s) {
			requestParams += "&level=" + searchParams.level_s;
		}
		if(searchParams.createTime_s) {
			requestParams += "&createTime=" + moment(searchParams.createTime_s).format(dateFormat);
		}
		if(requestParams.length > 0) {
			requestParams = requestParams.substring(1,requestParams.length);
		}
		this.setState({requestParams:requestParams},() => {
			this.doRequest();
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
						that.setState({levelOption:levelOption,levelData:levelData});
					}
				}).catch(function(error) {
					alert("request failed " + error);  
				});
				break;
			case "status" :
				var statusOption = [];
				fetch( Global.Url.public_getDictionary + "public_status",{
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
						let statusData = json.data;
						for(let status in statusData) {
							statusOption.push(<Option key={status}>{statusData[status]}</Option>);
						}
						that.setState({statusOption:statusOption});
					}
				}).catch(function(error) {
					alert("request failed " + error);  
				});
				break;
			case "gender" :
				var genderOption = [];
				fetch( Global.Url.public_getDictionary + "user_gender",{
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
						let genderData = json.data;
						for(let gender in genderData) {
							genderOption.push(<Option key={gender}>{genderData[gender]}</Option>);
						}
						that.setState({genderOption:genderOption});
					}
				}).catch(function(error) {
					alert("request failed " + error);  
				});
				break;
			default : alert("Bad get Dictionary");
		}
	}
	persistFun = (option) => {
		var that = this;
		switch (option) {
			case "showCreate" :
				this.props.form.resetFields();
				this.setState({modalTitle:"添加用户",modalVisible:true,isCreate:true,isDetail:false}); 
				break;
			case "showUpdate" :
				let params = this.state.dataSource[this.state.selectedRowKeys[0]];
				this.props.form.setFieldsValue({
					username:params.username,
					password:"000000",
					level:params.level.toString(),
					realname:params.realname,
					idnumber:params.idnumber,
					address:params.address,
					phone:params.phone,
					gender:params.gender.toString(),
					age:params.age,
					email:params.email,
					status:params.status.toString()
				});
				this.setState({modalTitle:"修改用户",modalVisible:true,isCreate:false,isDetail:false}); 
				break;
			case "save" :
				this.props.form.validateFields((error,params) => {
					let requestParams = "";
					if(!this.state.isCreate) {
						requestParams += "&id=" + this.state.dataSource[this.state.selectedRowKeys[0]].id;
					}
					if(params.username) {
						requestParams += "&username=" + params.username;
					}
					if(params.password) {
						requestParams += "&password=" + params.password;
					}
					if(params.level) {
						requestParams += "&level=" + params.level;
					}
					if(params.realname) {
						requestParams += "&realname=" + params.realname;
					}
					if(params.idnumber) {
						requestParams += "&idnumber=" + params.idnumber;
					}
					if(params.address) {
						requestParams += "&address=" + params.address;
					}
					if(params.phone) {
						requestParams += "&phone=" + params.phone;
					}
					if(params.gender) {
						requestParams += "&gender=" + params.gender;
					}
					if(params.age) {
						requestParams += "&age=" + params.age;
					}
					if(params.email) {
						requestParams += "&email=" + params.email;
					}
					if(params.status) {
						requestParams += "&status=" + params.status;
					}
					if(requestParams.length > 0) {
						requestParams = requestParams.substring(1,requestParams.length);
					}
					var url = "";
					if(this.state.isCreate) {
						url = Global.Url.user_register;
					} else {
						url = Global.Url.user_update;
					}
					fetch( url,{
						method: "POST",
						headers: {"Content-Type":"application/x-www-form-urlencoded"},
					  	body: requestParams
					}).then(function(response) {
					    if (response.status >= 400) {  
					        throw new Error("Bad response from server!");
			    		}
					    return response.json(); 
					}).then(function(json) {
						if(json.status !== 200) {
							message.error(json.msg);
						} else {
							if(that.state.isCreate) {
								message.success("注册成功！");
							} else {
								message.success("修改成功！");
							}
							that.setState({modalVisible:false,selectedRowKeys:[]});
							that.doRequest();
						}
					}).catch(function(error) {
						alert("request failed " + error);  
					});
				});
				break;
			case "delete" :
				fetch( Global.Url.user_delete,{
					method: "POST",
					headers: {"Content-Type":"application/x-www-form-urlencoded"},
				  	body: "id=" + this.state.dataSource[this.state.selectedRowKeys[0]].id
				}).then(function(response) {
				    if (response.status >= 400) {  
				        throw new Error("Bad response from server!");
		    		}
				    return response.json(); 
				}).then(function(json) {
					if(json.status !== 200) {
						message.error(json.msg);
					} else {
						message.success("删除成功！");
						that.setState({selectedRowKeys:[]});
						that.doRequest();
					}
				}).catch(function(error) {
					alert("request failed " + error);  
				});
				break;
			case "detail" :
				let params2 = this.state.dataSource[this.state.selectedRowKeys[0]];
				this.props.form.setFieldsValue({
					username:params2.username,
					password:"000000",
					level:params2.level.toString(),
					realname:params2.realname,
					idnumber:params2.idnumber,
					address:params2.address,
					phone:params2.phone,
					gender:params2.gender.toString(),
					age:params2.age,
					email:params2.email,
					status:params2.status.toString()
				});
				this.setState({modalTitle:"用户详细信息",modalVisible:true,isDetail:true}); 
				break;
			default : alert("Bad persistFun");
		}
	}
	export = (option) => {
		switch (option) {
			case "excel" :
				var that = this;
				var requestParams = this.state.requestParams;
				let pageNum = this.state.pageNum ? this.state.pageNum : 1;
				let pageSize = this.state.pageSize ? this.state.pageSize : 10;
				if(requestParams) {
					requestParams += "&";
				}
				requestParams += "pageNum=" + pageNum;
				requestParams += "&pageSize=" + pageSize;
				window.open(Global.Url.user_exportExcel + "?" + requestParams);
				break;
		}
	}
	render() {
		const search = "_s";
		const hasSelected = this.state.selectedRowKeys.length > 0;
		const {getFieldDecorator} = this.props.form;
		const FormItem = Form.Item;
		const Panel = Collapse.Panel;
		const disableStyle = {border:"none",background:"none",color:"#000",cursor:"default"};
		const itemLayout = {disabled:this.state.isDetail,style:this.state.isDetail?disableStyle:{}};
		const rowSelection = {selectedRowKeys:this.state.selectedRowKeys,type:"radio",
			onChange : (selectedRowKeys) => {
				if(selectedRowKeys[0] === this.state.selectedRowKeys[0]) {
					this.setState({selectedRowKeys:[]});
				}else {
					this.setState({selectedRowKeys:selectedRowKeys});
				}
			}};
		const pagination = {
			total:this.state.total,showSizeChanger:true,current:this.state.pageNum,
			onShowSizeChange : (current,pageSize) => {
				this.setState({pageNum:1,pageSize:pageSize},() => {
					this.doRequest();
				});
			},
			onChange : (current) => {
				this.setState({pageNum:current},() => {this.doRequest()});
			}
		};	
		const columns = [
			{title:"序号",dataIndex:"indexNum",key:"indexNum"},
			{title:"用户名",dataIndex:"username",key:"username"},
			{title:"电话",dataIndex:"phone",key:"phone"},
			{title:"年龄",dataIndex:"age",key:"age"},
			{title:"地址",dataIndex:"address",key:"address"},
			{title:"用户类型",dataIndex:"levelValue",key:"levelValue"}
		];
		return (
			<div>
				<div style={{marginBottom:10}}>
					<Collapse bordered={false} defaultActiveKey={["0","1"]}>
						<Panel header={"查询"} key={"0"}>
							<Form>
								<Col span={6}>
									<FormItem label={"姓名"} labelCol={{span:10}} wrapperCol={{span:14}}>
										{getFieldDecorator(`username${search}`,
											{initialValue:"",rules:[{required:false,message:"请输入姓名！"}]})(
											<Input placeholder="请输入" />)}
									</FormItem>
								</Col>
								<Col span={6}>
									<FormItem label={"用户类型"} labelCol={{span:10}} wrapperCol={{span:14}}>
										{getFieldDecorator(`level${search}`,
											{initialValue:"",rules:[{required:false,message:"请输入区域！"}]})(
											<Select placeholder="请选择" >
												{this.state.levelOption}
											</Select>)}
									</FormItem>
								</Col>
								<Col span={6}>
									<FormItem label={"注册日期"} labelCol={{span:10}} wrapperCol={{span:14}}>
										{getFieldDecorator(`createTime${search}`,
											{initialValue:null,rules:[{required:false,message:"请选择日期！"}]})(
											<DatePicker format={dateFormat}/>)}
									</FormItem>
								</Col>
								<Col span={6} style={{paddingLeft:"40px"}}>
									<Button title={"查询"} type="primary" icon="search" style={{marginRight:10}} onClick={this.handleSearch}>查询</Button>
									<Button title={"清空"} type="primary" icon="close-circle" style={{marginRight:10}} onClick={() => {
										this.props.form.resetFields(["username_s","level_s","createTime_s"])}}>清空</Button>
								</Col>
							</Form>
						</Panel>
						<Panel header={"用户管理"} key={"1"}>
							<Button title={"增加"} type="ghost" icon="check" style={{marginRight:10,height:28}} onClick={this.persistFun.bind(this,"showCreate")}>增加</Button>
							<Button title={"修改"} type="ghost" icon="edit" style={{marginRight:10,height:28}} onClick={this.persistFun.bind(this,"showUpdate")} disabled={!hasSelected}>修改</Button>
							<Button title={"删除"} type="ghost" icon="close" style={{marginRight:10,height:28}} onClick={this.persistFun.bind(this,"delete")} disabled={!hasSelected}>删除</Button>
							<Button title={"详细信息"} type="ghost" icon="exclamation-circle-o" style={{marginRight:10,height:28}} onClick={this.persistFun.bind(this,"detail")} disabled={!hasSelected}>详细信息</Button>
							<Button title={"导出Excel"} type="ghost" icon="arrow-down" style={{marginRight:10,height:28}} onClick={this.export.bind(this,"excel")} >导出Excel</Button>
						</Panel>
					</Collapse>
				</div>
				<Table size="middle" pagination={pagination} columns={columns} 
					rowSelection={rowSelection} dataSource={this.state.dataSource}
					bordered footer={() => "总记录数 " + this.state.total + " 条"}/>
				<Modal title={this.state.modalTitle} maskClosable={false} visible={this.state.modalVisible} 
					width={"75%"} onCancel={()=>{this.setState({modalVisible:false})}} 
					footer={this.state.isDetail?[]:[<Button key="0" type="primary" onClick={this.persistFun.bind(this,"save")}>确定</Button>,
						<Button key="1" type="primary" onClick={()=>{this.setState({modalVisible:false})}}>取消</Button>]}>
					<Form>
						<Row style={{marginTop:14}}>
							<Col span={8}>
								<FormItem label={"用户名"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
								{getFieldDecorator("username",
									{initialValue:"",rules:[{required:true,message:"请输入用户名！"}]})(
									<Input {...itemLayout} type={"text"} placeholder={"请输入"}/>)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem label={"密码"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
								{getFieldDecorator("password",
									{initialValue:"",rules:[{required:true,message:"请输入密码！"}]})(
									<Input {...itemLayout} type={"text"} placeholder={"请输入"}/>)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem label={"用户类型"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
									{getFieldDecorator("level",
										{initialValue:null,rules:[{required:true,message:"请输入用户类型！"}]})(
											<Select {...itemLayout} placeholder="请选择" >
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
									<Input {...itemLayout} type={"text"} placeholder={"请输入"}/>)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem label={"身份证号"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
								{getFieldDecorator("idnumber",
									{initialValue:"",rules:[{required:false,message:"请输入身份证号！"}]})(
									<Input {...itemLayout} type={"text"} placeholder={"请输入"}/>)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem label={"联系地址"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
								{getFieldDecorator("address",
									{initialValue:"",rules:[{required:false,message:"请输入联系地址！"}]})(
									<Input {...itemLayout} type={"text"} placeholder={"请输入"}/>)}
								</FormItem>
							</Col>
						</Row>
						<Row style={{marginTop:14}}>
							<Col span={8}>
								<FormItem label={"手机号"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
								{getFieldDecorator("phone",
									{initialValue:"",rules:[{required:false,message:"请输入手机号！"}]})(
									<Input {...itemLayout} type={"text"} placeholder={"请输入"}/>)}
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
									<Input {...itemLayout} type={"text"} placeholder={"请输入"}/>)}
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
			</div>
		);
	}
}
export default Form.create()(App);
