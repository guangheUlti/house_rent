// @Author : guanghe
import React from "react";
import {Form,Input,Button,Row,Col,message,Select,Modal} from 'antd';
import Global from "../../Global";
import GHFetch from "../../../utils/FetchUtil";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource:[],
			selectedRowKeys:[],
			paymentTypeOption:[],
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
				this.setState({modalTitle:"添加房屋",isCreate:true,isDetail:false}); 
				break;
			case "showUpdate" :
				this.loadData();
				this.setState({modalTitle:"修改房屋",isCreate:false,isDetail:false}); 
				break;
			case "detail" :
				this.loadData();
				this.setState({modalTitle:"房屋详细信息",isDetail:true}); 
				break;
			case "save" :
				this.props.form.validateFields((err,params) => {
					if(err) { return; }
					var url = "";
					if(this.state.isCreate) {
						url = Global.Url.house_create;
					} else {
						let row = this.state.dataSource[this.state.selectedRowKeys[0]];
						url = Global.Url.house_update;
						params.id = row.id;
						params.createTime = row.createTime;
					}
					var callback = (json) => {
						if(json.status !== 200) {
							message.error(json.msg);
						} else {
							if(that.state.isCreate) {
								message.success("新增成功！");
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
			member:params.member,
			rival:params.rival,
			house:params.house,
			review:params.review!=null?params.review.toString():"",
			trade:params.trade!=null?params.trade.toString():"",
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
							<FormItem label={"所属地区代码"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
							{getFieldDecorator("addcode",
								{initialValue:"",rules:[{required:true,message:"请输入所属地区代码！"}]})(
								<Input type={"text"} {...itemLayout} placeholder={"请输入"}/>)}
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem label={"地址"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
							{getFieldDecorator("address",
								{initialValue:"",rules:[{required:true,message:"请输入地址！"}]})(
								<Input type={"text"} {...itemLayout} placeholder={"请输入"}/>)}
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem label={"类型"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
								{getFieldDecorator("type",
									{initialValue:"",rules:[{required:true,message:"请选择类型！"}]})(
								<Select {...itemLayout} placeholder="请选择" >
									{this.state.typeOption}
								</Select>)}
							</FormItem>
						</Col>
					</Row>
					<Row style={{marginTop:14}}>
						<Col span={8}>
							<FormItem label={"面积"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
							{getFieldDecorator("area",
								{initialValue:"",rules:[{required:true,message:"请输入面积！"}]})(
								<Input type={"text"} {...itemLayout} placeholder={"请输入"}/>)}
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem label={"楼层"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
							{getFieldDecorator("floor",
								{initialValue:"",rules:[{required:true,message:"请输入楼层！"}]})(
								<Input type={"text"} {...itemLayout} placeholder={"请输入"}/>)}
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem label={"房间数"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
							{getFieldDecorator("rooms",
								{initialValue:"",rules:[{required:false,message:"请输入房间数！"}]})(
								<Input type={"text"} {...itemLayout} placeholder={"请输入"}/>)}
							</FormItem>
						</Col>
					</Row>
					<Row style={{marginTop:14}}>
						<Col span={8}>
							<FormItem label={"朝向"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
							{getFieldDecorator("orient",
								{initialValue:"",rules:[{required:true,message:"请输入房屋朝向！"}]})(
								<Input type={"text"} {...itemLayout} placeholder={"请输入"}/>)}
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem label={"租金"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
							{getFieldDecorator("rental",
								{initialValue:"",rules:[{required:true,message:"请输入租金！"}]})(
								<Input type={"text"} {...itemLayout} placeholder={"请输入"}/>)}
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem label={"租期"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
							{getFieldDecorator("lease",
								{initialValue:"",rules:[{required:false,message:"请输入租期！"}]})(
								<Input type={"text"} {...itemLayout} placeholder={"请输入"}/>)}
							</FormItem>
						</Col>
					</Row>
					<Row style={{marginTop:14}}>
						<Col span={8}>
							<FormItem label={"状态"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
								{getFieldDecorator("status",
									{initialValue:"",rules:[{required:true,message:"请选择房屋状态！"}]})(
								<Select {...itemLayout} placeholder="请选择" >
									{this.state.typeOption}
								</Select>)}
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem label={"简介"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
							{getFieldDecorator("brief",
								{initialValue:"",rules:[{required:true,message:"请输入房屋简介！"}]})(
								<Input type={"text"} {...itemLayout} placeholder={"请输入"}/>)}
							</FormItem>
						</Col>
					</Row>
					<Row style={{marginTop:14}}>
						<Col span={20}>
							<FormItem label={"详细描述"} style={{marginBottom:"0px"}} labelCol={{span:4}} wrapperCol={{span:14}}>
							{getFieldDecorator("detail",
								{initialValue:"",rules:[{required:false,message:"请输入详细描述！"}]})(
								<Input {...itemLayout} type={"textarea"} rows={6} placeholder={"请输入"}/>)}
							</FormItem>
						</Col>
					</Row>
				</Form>
			</Modal>
		);
	}
}
export default Form.create()(App);
