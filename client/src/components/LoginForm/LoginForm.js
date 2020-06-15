import React, { Component } from 'react';
import {Col, Form, FormGroup, Input, Button, Row, Alert} from 'reactstrap';
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

    attempt_login = () => this.props.login(this.state);  
    
    onChange = (event) => {
        this.setState({
           [event.target.name] : event.target.value
        });
    }

    errorMessage = (error_msg) => {
        var msg = error_msg;
        return (
        <Alert className="error-alert" color='danger'>{msg}</Alert>
        )
    }

    render() {
        return (
            <div>
                {this.props.authenticated ? <Redirect to='/'></Redirect> : null}
                    <Form className="login-form-root">
                        <h3 className="text-center">Login</h3>
                        <Row className="login-form-row">
                            <Col /*sm="8" md={{size: "4", offset: "4"}}*/>
                                <FormGroup className="login-form-input">
                                    <Input type='text' onChange={this.onChange} name='username' placeholder='Username' value={this.state.username}></Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="login-form-row">
                            <Col>
                                <FormGroup>
                                    <Input type='password' onChange={this.onChange} name='password' placeholder='Password' value={this.state.password}></Input>                                
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="login-form-row">
                            <Col>
                                <Button className="submit-button" size='lg' color='info' onClick={this.attempt_login}>Login</Button>
                            </Col>
                        </Row> 
                        <Row className="login-form-row">
                            <Col>
                                {this.props.error_msg != null ? this.errorMessage(this.props.error_msg.msg): null}
                            </Col>
                        </Row>                   
                    </Form>
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
