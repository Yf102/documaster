import React from 'react';
import {RegisterTranslations} from '../../services/Translation/RegisterTranslations.js';
import {Config} from "../../services/Config/index.js";
import {LocaleSwitcher} from "../../services/Config/components/LocaleSwitcher/index.js";
import {Storage} from "../../services/Storage/index.js";
import Translate from 'react-translate-component';

RegisterTranslations.run();

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			config: Storage.get('app-config') || { config: {locale: 'en'} }
		};

		this.updateConfigState = this.updateConfigState.bind(this);
	}

	updateConfigState(config) {
		this.setState({config});
	}

	render() {
		return (
			<div>
				<Config updateConfigState={this.updateConfigState} config={this.state.config}>
					<LocaleSwitcher config={this.state.config} />
					<LoginForm />
				</Config>
			</div>
		)
	}
}

class LoginForm extends React.Component {
	render() {
		let errorMSG = "";
		if (this.props.error) {
			errorMSG = <div><label className="error-msg">{this.props.error}</label></div>;
		}

		let last_user = this.props.last_username ? this.props.last_username : undefined;

		return(
			<form className="login-form" action={this.props.path} method="post">
				{errorMSG}
				<label htmlFor="username"><Translate content="username_lbl" />:</label>
				<input type="text" id="username" name="_username" defaultValue={last_user}/>

				<label htmlFor="password"><Translate content="password_lbl" />:</label>
				<input type="password" id="password" name="_password"/>

				<button type="submit"><Translate content="login_btn" /></button>
			</form>
		)
	}
}

export default Login;
