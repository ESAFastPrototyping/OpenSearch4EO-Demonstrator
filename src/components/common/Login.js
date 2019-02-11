import React, {Component} from 'react';

class Login extends Component {
    constructor(props) {
        super(props);

        this.changeName = this.changeName.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.hide = this.hide.bind(this);

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
    
    hide() {
        this.props.hide();
    }

    render(){
        return (
            <div id="login">
                <div className="overlay" onClick={this.hide} onTouchStart={this.hide}></div>
                <div className="login-form">
                    <table>
                        <tbody>
                            <tr>
                                <td>Name: </td>
                                <td><input type="text" onChange={this.changeName} /></td>
                            </tr>
                            <tr>
                                <td>Password: </td>
                                <td><input type="password" onChange={this.changePassword} /></td>
                            </tr>
                            <tr>
                                <td colSpan="2"><button onClick={this.onLogin}>Try again</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Login;
