// @Author : guanghe
import React from "react";
import {Form,Input,InputNumber,Button,Row,Col,message,Collapse,DatePicker,Select,Table,Modal} from 'antd';
import moment from "moment";
import Global from "../../Global";
import GHFetch from "../../../utils/FetchUtil";
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
			paymentTypeOption:[],
			statusOption:[],
			modalTitle:"",
			modalVisible:false,
			isCreate:true,
			isDetail:false,
		};
	}
	componentDidMount() {
  		this.doRequest();
  		this.getDataDictionary("status");
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
		fetch( Global.Url.trade_getList,{
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
				dataSource[i].createTime = moment(dataSource[i].createTime).format(dateFormat);
				dataSource[i].tradeCode = moment().format("YYYYMMDD") + that.prefixInteger(dataSource[i].id,6);
				dataSource[i].payment = that.digitalFormat(dataSource[i].payment);
			}
	    	that.setState({dataSource:dataSource,total:json.total});
		}).catch(function(error) {
			alert("request failed " + error);  
		});
	}
	handleSearch = () => {
		var searchParams = this.props.form.getFieldsValue(["id_s","createTime_s"]);
		var requestParams = "";
		if(searchParams.id_s) {
			requestParams += "&id=" + Number(searchParams.id_s.substring(8,searchParams.id_s.length));
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
				var url = Global.Url.public_getDictionary + "public_status";
				var callback = (json) => {
					if(json.status !== 200) {
						message.error(json.msg);
					} else {
						let statusData = json.data;
						let statusOption = [];
						for(let status in statusData) {
							statusOption.push(<Option key={status}>{statusData[status]}</Option>);
						}
						that.setState({statusOption:statusOption});
					}
				}
				GHFetch(url, null, callback);
				break;
			default : alert("Bad get Dictionary");
		}
	}
	persistFun = (option) => {
		var that = this;
		switch (option) {
			case "showCreate" :
				this.props.form.resetFields();
				this.setState({modalTitle:"添加交易",modalVisible:true,isCreate:true,isDetail:false}); 
				break;
			case "showUpdate" :
				let params = this.state.dataSource[this.state.selectedRowKeys[0]];
				this.props.form.setFieldsValue({
					tradename:params.tradename,
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
				this.setState({modalTitle:"修改交易",modalVisible:true,isCreate:false,isDetail:false}); 
				break;
			case "save" :
				this.props.form.validateFields((error,params) => {
					let requestParams = "";
					if(!this.state.isCreate) {
						requestParams += "&id=" + this.state.dataSource[this.state.selectedRowKeys[0]].id;
					}
					if(params.tradename) {
						requestParams += "&tradename=" + params.tradename;
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
						url = Global.Url.trade_register;
					} else {
						url = Global.Url.trade_update;
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
				fetch( Global.Url.trade_delete,{
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
					tradename:params2.tradename,
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
				this.setState({modalTitle:"交易详细信息",modalVisible:true,isDetail:true}); 
				break;
			default : alert("Bad persistFun");
		}
	}
	digitalFormat = (num) => {
		return (parseFloat((num + "").replace(/[^\d\.-]/g,"")).toFixed(2) + "").replace(/\d{3}(?=(\d{3}) + (\.\d*)?$)/g,"$&,");
	}
	prefixInteger = (num, n) => {
        return (Array(n).join(0) + num).slice(-n);
    }
	render() {
		const search = "_s";
		const hasSelected = this.state.selectedRowKeys.length > 0;
		const {getFieldDecorator} = this.props.form;
		const FormItem = Form.Item;
		const Panel = Collapse.Panel;
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
			{title:"交易编号",dataIndex:"tradeCode",key:"tradeCode"},
			{title:"租房者ID",dataIndex:"userId",key:"userId"},
			{title:"房屋ID",dataIndex:"houseId",key:"houseId"},
			{title:"交易金额",dataIndex:"payment",key:"payment"},
			{title:"创建时间",dataIndex:"createTime",key:"createTime"}
		];
		return (
			<div>
				<div style={{marginBottom:10}}>
					<Collapse bordered={false} defaultActiveKey={["0","1"]}>
						<Panel header={"查询"} key={"0"}>
							<Form>
								<Col span={8}>
									<FormItem label={"交易编号"} labelCol={{span:10}} wrapperCol={{span:14}}>
										{getFieldDecorator(`id${search}`,
											{initialValue:"",rules:[{required:false,message:"请输入姓名！"}]})(
											<Input placeholder="请输入" />)}
									</FormItem>
								</Col>
								<Col span={8}>
									<FormItem label={"创建日期"} labelCol={{span:10}} wrapperCol={{span:14}}>
										{getFieldDecorator(`createTime${search}`,
											{initialValue:null,rules:[{required:false,message:"请选择日期！"}]})(
											<DatePicker format={dateFormat}/>)}
									</FormItem>
								</Col>
								<Col span={8} style={{paddingLeft:"40px"}}>
									<Button title={"查询"} type="primary" icon="search" style={{marginRight:10}} onClick={this.handleSearch}>查询</Button>
									<Button title={"清空"} type="primary" icon="close-circle" style={{marginRight:10}} onClick={() => {
										this.props.form.resetFields([`id${search}`,`userId${search}`,`createTime${search}`])}}>清空</Button>
								</Col>
							</Form>
						</Panel>
						<Panel header={"交易管理"} key={"1"}>
							<Button title={"增加"} type="ghost" icon="check" style={{marginRight:10,height:28}} onClick={this.persistFun.bind(this,"showCreate")}>增加</Button>
							<Button title={"修改"} type="ghost" icon="check" style={{marginRight:10,height:28}} onClick={this.persistFun.bind(this,"showUpdate")} disabled={!hasSelected}>修改</Button>
							<Button title={"删除"} type="ghost" icon="check" style={{marginRight:10,height:28}} onClick={this.persistFun.bind(this,"delete")} disabled={!hasSelected}>删除</Button>
							<Button title={"详细信息"} type="ghost" icon="check" style={{marginRight:10,height:28}} onClick={this.persistFun.bind(this,"detail")} disabled={!hasSelected}>详细信息</Button>
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
								<FormItem label={"用户ID"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
								{getFieldDecorator("userId",
									{initialValue:"",rules:[{required:true,message:"请输入用户ID！"}]})(
									<Input type={"text"} placeholder={"请输入"}/>)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem label={"房屋ID"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
								{getFieldDecorator("houseId",
									{initialValue:"",rules:[{required:true,message:"请输入房屋ID！"}]})(
									<Input type={"text"} placeholder={"请输入"}/>)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem label={"支付金额"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
									{getFieldDecorator("payment",
										{initialValue:null,rules:[{required:true,message:"请输入支付金额！"}]})(
											<InputNumber placeholder={"请输入"}/>)}
								</FormItem>
							</Col>
						</Row>
						<Row style={{marginTop:14}}>
							<Col span={8}>
								<FormItem label={"支付类型"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
								{getFieldDecorator("paymentType",
									{initialValue:"",rules:[{required:true,message:"请输入支付类型！"}]})(
									<Select placeholder="请选择" >
										{this.state.paymentTypeOption}
									</Select>)}
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem label={"交易状态"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
								{getFieldDecorator("status",
									{initialValue:"",rules:[{required:false,message:"请输入交易状态！"}]})(
									<Select placeholder="请选择" >
										{this.state.statusOption}
									</Select>)}
								</FormItem>
							</Col>
						</Row>
						<Row style={{marginTop:14}}>
							<Col span={20}>
								<FormItem label={"备注"} style={{marginBottom:"0px"}} labelCol={{span:4}} wrapperCol={{span:14}}>
								{getFieldDecorator("comment",
									{initialValue:"",rules:[{required:false,message:"请输入备注！"}]})(
									<Input type={"textarea"} rows={6} placeholder={"请输入"}/>)}
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
