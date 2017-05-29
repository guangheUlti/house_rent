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
				this.setState({modalTitle:"添加交易",isCreate:true,isDetail:false}); 
				break;
			case "showUpdate" :
				this.loadData();
				this.setState({modalTitle:"修改交易",isCreate:false,isDetail:false}); 
				break;
			case "detail" :
				this.loadData();
				this.setState({modalTitle:"交易详细信息",isDetail:true}); 
				break;
			case "save" :
				this.props.form.validateFields((err,params) => {
					if(err) { return; }
					var url = "";
					if(this.state.isCreate) {
						url = Global.Url.trade_create;
					} else {
						let row = this.state.dataSource[this.state.selectedRowKeys[0]];
						url = Global.Url.trade_update;
						params.id = row.id;
						params.createTime = row.createTime;
						params.paymentType = row.paymentType;
						params.closeTime = row.closeTime;
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
			userId:params.userId,
			houseId:params.houseId,
			payment:params.payment,
			paymentType:params.paymentType!=null?params.paymentType.toString():"",
			status:params.status!=null?params.status.toString():"",
			comment:params.comment
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
							<FormItem label={"用户ID"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
							{getFieldDecorator("userId",
								{initialValue:"",rules:[{required:true,message:"请输入用户ID！"}]})(
								<Input type={"text"} {...itemLayout} placeholder={"请输入"}/>)}
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem label={"房屋ID"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
							{getFieldDecorator("houseId",
								{initialValue:"",rules:[{required:true,message:"请输入房屋ID！"}]})(
								<Input type={"text"} {...itemLayout} placeholder={"请输入"}/>)}
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem label={"支付金额"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
								{getFieldDecorator("payment",
									{initialValue:null,rules:[{required:true,message:"请输入支付金额！"}]})(
										<InputNumber {...itemLayout} placeholder={"请输入"}/>)}
							</FormItem>
						</Col>
					</Row>
					<Row style={{marginTop:14}}>
						<Col span={8}>
							<FormItem label={"支付类型"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
							{getFieldDecorator("paymentType",
								{initialValue:"",rules:[{required:true,message:"请输入支付类型！"}]})(
								<Select {...itemLayout} placeholder="请选择" >
									{this.state.paymentTypeOption}
								</Select>)}
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem label={"交易状态"} style={{marginBottom:"0px"}} labelCol={{span:10}} wrapperCol={{span:14}}>
							{getFieldDecorator("status",
								{initialValue:"",rules:[{required:false,message:"请输入交易状态！"}]})(
								<Select {...itemLayout} placeholder="请选择" >
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
