import React from 'react';

class Login extends React.Component {
	render() {
		let errorMSG = "";
		if (this.props.error) {
			errorMSG = <div><label className="error-msg">{this.props.error}</label></div>;
		}

		let last_user = this.props.last_username ? this.props.last_username : undefined;
		return (
			<div>
				<form className="login-form" action={this.props.path} method="post">
					{errorMSG}
					<label htmlFor="username">Username:</label>
					<input type="text" id="username" name="_username" defaultValue={last_user}/>

					<label htmlFor="password">Password:</label>
					<input type="password" id="password" name="_password"/>

					<button type="submit">Login</button>
				</form>
			</div>
		)
	}
}

export default Login;
