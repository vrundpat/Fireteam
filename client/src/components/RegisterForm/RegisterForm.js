import React, { Component } from 'react';
import {Col, Row} from 'reactstrap';
import { connect } from 'react-redux';
import { register } from '../../actions/authActions';
import { Redirect } from 'react-router-dom';
import { clear_error } from '../../actions/errorActions';
import './RegisterForm.css'

class RegisterForm extends Component {

    componentDidMount() { this.props.clear_error(); }

    constructor(props) {
        super(props);
        this.onChange.bind(this);
        this.attempt_to_register.bind(this);
        this.errorMessage.bind(this);
        this.state = {username: '', password: '', consoleID: ''};
    }

    attempt_to_register = (event) => {
        event.preventDefault();
        this.props.register(this.state);
    }
    
    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    errorMessage = (error_msg) => {
        var msg = error_msg;
        return (
            <h2 className="register-error-alert">{msg}</h2>
        )
    }

    render() {
        return (
            <div>
                {this.props.authenticated ? <Redirect to='/'></Redirect> : null}
                <form className="register-form-root" onSubmit={this.attempt_to_register}>
                    <h3 className='register-form-title'>Register</h3>
                    <input className="register-input"  onChange={this.onChange} name="username" type="text" placeholder="Username" value={this.state.username}></input>
                    <input className="register-input"  onChange={this.onChange} name="password" type="password" placeholder="Password" value={this.state.password}></input>
                    <input className="register-input" onChange={this.onChange} name="consoleID" placeholder="Console ID" value={this.state.consoleID}></input>
                    <button type="submit" className="register-submit-button">Submit</button>
                    <Row>
                        <Col>
                            {this.props.error_msg != null ? this.errorMessage(this.props.error_msg.msg): null}
                        </Col>
                    </Row>
                </form>
            </div>
        )
    }
}

const mapStatetoProps = state => ({
    authenticated: state.authReducer.authenticated,
    token: state.authReducer.token,
    user: state.authReducer.user,
    error_msg: state.errorReducer.error_msg,
    error_status: state.errorReducer.status
});

export default connect(mapStatetoProps, { register, clear_error })(RegisterForm);




