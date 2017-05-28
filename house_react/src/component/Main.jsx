// @Author : guanghe
import React from "react";
import {Menu,message} from 'antd';
import logo from '../static/img/logo.jpg';
import Global from "./Global";
import GHFetch from "../utils/FetchUtil";
const Item = Menu.Item;

class App extends React.Component {
  	constructor(props) {
		super(props);
		this.state = {
			siderHeight:"100%",
			imgHeight:70,
			headerBorderBottomSize:1,
			content:[],
			username:"",
			menuItem:[],
	  	};
	}
  	componentWillMount() {
  		var height = null;
  		if (document.documentElement && document.documentElement.clientHeight) {
			height = document.documentElement.clientHeight - this.state.imgHeight - 
				this.state.headerBorderBottomSize;
			this.setState({siderHeight:height + "px" });
		}	
  	}
  	componentDidMount() {
  		var that = this;
  		var url = Global.Url.user_getInfo + Global.token;
  		var callback = (json) => {
  			if(json.status !== 200) {
				alert(json.msg);
				that.props.login();
			} else {
				Global.user = json.data;
				that.setState({username:Global.user.username});
				that.getMenu();
			}
  		}
  		GHFetch(url,null,callback);
  	}
  	getMenu = () => {
  		var that = this;
  		var url = Global.Url.public_getDictionary + "public_menu";
  		var callback = (json) => {
  			if(json.status !== 200) {
				message.error(json.msg);
			} else {
				let data = json.data;
				let menuItem = [];
				for(let item in data) {
					menuItem.push(<Item key={item}>{data[item]}</Item>);
				}
				that.setState({menuItem:menuItem});
			}
  		}
  		GHFetch(url,null,callback);
  	}
  	handleMenu = (menuItem) => {
  		let key = menuItem.key;
  		this.setState({content:[Global.getContent(key)]});
  	}
  	render() {
		return (
		  	<div style={{display:'flex',height:'100%',flexDirection:'column'}}>
		        <div style={{display:'flex',alignItems:'center',flex:'0 0 auto',
					paddingRight:'15px',borderBottom:this.state.headerBorderBottomSize+'px solid gray'}}>
					<img src={logo} alt={"logo"} style={{width:"250px",height:this.state.imgHeight+"px"}}/>
			        <span style={{flex:'1 0 auto'}}/>
		          	<Menu mode="horizontal">
						<Item key={0}>{"用户：" + this.state.username}</Item>
					</Menu>
		        </div>
		        <div style={{display:'flex',flex:'1 1 auto',overflow:'auto'}}>
			        <div style={{flex:'0 0 250px',padding:'16px 0px 16px 0px',
			            background:'#222222',overflow:'auto',height:this.state.siderHeight}}>
			            <Menu mode='inline' theme='dark' onClick={this.handleMenu}>
			        		{this.state.menuItem}
			      		</Menu>
			        </div>
			        <div style={{flex:'1 1 auto',padding:'16px',overflowY:"scroll",height:this.state.siderHeight}}>
			        	{this.state.content}
			        </div>
	        	</div>
	      	</div>
      	)
	}
}
export default App;