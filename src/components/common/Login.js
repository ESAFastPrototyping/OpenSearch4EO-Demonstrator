import React, {Component} from 'react';

class Login extends Component {
    constructor(props) {
        super(props);

        this.changeName = this.changeName.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.onLogin = this.onLogin.bind(this);

        this.state = {
            name: '',
            password: ''
        }
    }

    changeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    changePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onLogin() {
        this.props.onLogin(this.state.name, this.state.password);
    }

    render(){
        return (
            <div id="login">
                <div className="overlay"></div>
                <div className="login-form">
                    <div><label>Name: <input type="text" onChange={this.changeName} /></label></div>
                    <div><label>Password: <input type="password" onChange={this.changePassword} /></label></div>
                    <div><button onClick={this.onLogin}>Try again</button></div>
                </div>
            </div>
        );
    }
}

export default Login;
