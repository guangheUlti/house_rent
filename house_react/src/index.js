// @Author : guanghe 
import React from 'react';
import ReactDOM from 'react-dom';
import './static/css/index.css';
import Global from "./component/Global";
import Router from './component/Router';
import logo from './static/img/logo.svg';
import mainImg from './static/img/skyscraper.jpg';
Global.city = document.getElementById('root').getAttribute("city");
Global.province = document.getElementById('root').getAttribute("province");

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			component: []
		}
	}
	componentDidMount() {
		let component =
			<div className="App" key="0" >
				<div className="App-header">
		  			<img src={logo} className="App-logo" alt="logo" /><br/>
		  			<a href={void(0)} onClick={this.go}>Welcome to GHouse!</a>
				</div>
				<div className="App-main">
					<img src={mainImg} alt="GHouse" className="App-mainImg"/>
				</div>
				<div className="App-location">
					您所在的城市为：<a href={void(0)}>{Global.city}</a>
				</div>
		  		<footer className="footer">
  					© 2017 &nbsp;
  					<a href="http://www.cnblogs.com/guanghe/" target="_blank">GuangSoft Inc.</a>
  					&nbsp; Licensed under &nbsp; 
  					<a href="http://www.cnblogs.com/guanghe/" target="_blank">GHUL license</a>
  					&nbsp; by the GHouse Team.
				</footer>
	  		</div>;
		this.setState({component: [component]});
	}
	go = () => {
		this.setState({component: [<Router key="0" />]});
	}
	render() {
		return <div>{this.state.component}</div>;
	}
}
ReactDOM.render(<App/>, document.getElementById('root'));