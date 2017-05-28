// @Author : guanghe
import React from "react";
import Global from "./Global";
import CookieUtil from "../utils/CookieUtil";
import Login from "./Login";
import Register from "./Register";
import Main from "./Main";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {component:[]}
	}
	componentWillMount() {
		this.judge();
	}
	judge = () => {
		if(CookieUtil.get("user")) {
			Global.token = CookieUtil.get("user");
			this.setState({component:[<Main key={0} login={this.login}/>]});
		}else {
			this.login();
		}
	}
	login = () => {
		this.setState({component:[<Login key={0} enter={this.enter} register={this.register}/>]});
	}
	enter = () => {
		this.setState({component:[<Main key={0} login={this.login}/>]});
	}
	register = () => {
		this.setState({component:[<Register key={0} login={this.login} />]});
	}
	render() {
		return <div>{this.state.component}</div>;
	}
};
export default App;
