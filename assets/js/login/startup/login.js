import React from 'react';

class Login extends React.Component {
	render() {
		var errorMSG = "";
		if (this.props.error) {
			errorMSG = <div>{this.props.error.messageKey}</div>;
		}
		return (
			<div>
				{errorMSG}
				<form action={this.props.path} method="post">
					<label htmlFor="username">Username:</label>
					<input type="text" id="username" name="_username" value={this.props.last_username}/>

					<label htmlFor="password">Password:</label>
					<input type="password" id="password" name="_password"/>

					<button type="submit">Login</button>
				</form>
			</div>
		)
	}
}

export default Login;
