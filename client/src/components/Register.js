import React, { Component } from 'react';
import {Col, Form, FormGroup, Input, Button, Row, Alert} from 'reactstrap';
import { connect } from 'react-redux';
import { register } from '../actions/authActions';
import { Redirect } from 'react-router-dom';
import { clear_error } from '../actions/errorActions';


class Register extends Component {

    componentDidMount() { this.props.clear_error(); }

    constructor(props) {
        super(props);
        this.onChange.bind(this);
        this.attempt_to_register.bind(this);
        this.errorMessage.bind(this);
        this.state = {username: '', password: '', consoleID: ''};
    }

    attempt_to_register = (event) => this.props.register(this.state);
    
    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    errorMessage = (error_msg) => {
        var msg = error_msg;
        return (
            <Alert style={{marginTop: '20px', textAlign: 'center'}} color='danger'>{msg}</Alert>
        )
    }

    render() {
        return (
            <div style={{paddingTop: "150px"}}>

                {this.props.authenticated ? <Redirect to='/'></Redirect> : null}
                {this.props.authReducer ? this.props.clear_error() : null}
                <Form>
                    <Row>
                        <Col sm="8" md={{size: "4", offset: "4"}}>
                            <FormGroup>
                                <Input type='text' onChange={this.onChange} name='username' placeholder='Username' value={this.state.username}></Input>
                             </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm="8" md={{size: "4", offset: "4"}}>
                            <FormGroup>
                                <Input type='password' onChange={this.onChange} name='password' placeholder='Password' value={this.state.password}></Input>                                
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm="8" md={{size: "4", offset: "4"}}>
                            <FormGroup>
                                <Input type='text' onChange={this.onChange} name='consoleID' placeholder='Console-Id (PSN/Xbox/Steam)' value={this.state.consoleID}></Input>                                
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm="8" md={{size: "4", offset: "4"}}>
                            <Button style={buttonStyle} size='lg' onClick={this.attempt_to_register}>Register</Button>
                        </Col>
                    </Row> 

                    <Row>
                        <Col sm="8" md={{size: "4", offset: "4"}}>
                            {this.props.error_msg != null ? this.errorMessage(this.props.error_msg.msg): null}
                        </Col>
                    </Row>                      
                </Form>
            </div>
        )
    }
}

const buttonStyle = {width: "100%"}

const mapStatetoProps = state => ({
    authenticated: state.authReducer.authenticated,
    token: state.authReducer.token,
    user: state.authReducer.user,
    error_msg: state.errorReducer.error_msg,
    error_status: state.errorReducer.status
});

export default connect(mapStatetoProps, { register, clear_error })(Register);




