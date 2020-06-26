import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import { Redirect } from 'react-router-dom';
import { clear_error} from '../../actions/errorActions';
import './LoginForm.css'

class LoginForm extends Component {

    constructor(props) {
        super(props)
        this.state = {username: '', password: ''};
        this.onChange.bind(this);
        this.attempt_login.bind(this)
        this.errorMessage.bind(this);
    }

    componentDidMount() { this.props.clear_error(); }

    attempt_login = (event) => {
        event.preventDefault();
        this.props.login(this.state);  
    }
    
    onChange = (event) => {
        this.setState({
           [event.target.name] : event.target.value
        });
    }

    errorMessage = (error_msg) => {
        var msg = error_msg;
        return (
            <h2 className="login-error-alert">{msg}</h2>
        )
    }

    render() {
        return (
            <div className="container">
                {this.props.authenticated ? <Redirect to='/'></Redirect> : null}
                <form className="login-form-root" onSubmit={this.attempt_login}>
                    <h3 className='login-form-title  animation-type-writer'>Login</h3>
                    <input className="login-input"  onChange={this.onChange} name="username" type="text" placeholder="Username" value={this.state.username}></input>
                    <input className="login-input"  onChange={this.onChange} name="password" type="password" placeholder="Password" value={this.state.password}></input>
                    <button type="submit" className="login-submit-button">Submit</button>
                    {this.props.error_msg != null ? this.errorMessage(this.props.error_msg.msg): null}
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    authenticated: state.authReducer.authenticated,
    user: state.authReducer.user,
    error_msg: state.errorReducer.error_msg,
    error_status: state.errorReducer.status
});

export default connect(mapStateToProps, { login, clear_error })(LoginForm);
