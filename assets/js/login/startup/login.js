import React from 'react';

class Login extends React.Component {
    render() {
        return (
            <form action={this.props.path} method="post">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="_username" value={this.props.last_username}/>

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="_password"/>

                <button type="submit">login</button>
            </form>
        )
    }
}

export default Login;
