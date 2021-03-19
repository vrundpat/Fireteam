import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import { clear_error } from '../../actions/errorActions'
import { setEmail } from '../../actions/userActions';
import './EmailModal.css';


class EmailModal extends Component {

    constructor() {
        super();
        this.state = {
            isModalOpen: true,
            email: ""
        }

        this.toggleModal.bind(this);
        this.handleEmailInput.bind(this);
        this.handleModalSubmit.bind(this);
    }

    toggleModal() {
        this.props.clear_error();
        this.setState({isModalOpen: false});
    }

    handleEmailInput = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    handleModalSubmit = async () => {
        this.props.setEmail(this.state.email);

        // Wait for a 200 response from the server
        while(this.state.isSetting) { }
        
        // After the response is received, check if the email was successfuly set
        if(this.props.isSet === true) {
            this.toggleModal();
        }

        /* Old method of handling synchronous calls to the server */
        // setTimeout(() => {
        //     if (this.props.isSet === true && this.props.isSetting === false) {
        //         this.toggleModal();
        //     }
        // }, 200);
    }

    render() {
        return (
            <div className="modal-root">
                <Modal isOpen={this.state.isModalOpen} toggle={this.state.toggleModal} centered={true} size="lg" animation={true}>
                    <ModalHeader className="text-center">
                        <h3>Please enter an Email</h3>
                    </ModalHeader>
                    <ModalBody>
                        <p id="email-collection-text"> Hey there Guardian! In order to provide you with a better service, we require you 
                                                       to now link your account to an email. So, please provide us with a valid email that 
                                                       you wish to use for this account from here in!
                        </p>
                        <br></br>
                        <div className="row">
                            <div className="col form-group">
                                <p id="input-label">Please enter your email:  </p>
                                <input id="input-color" className="email-input" type="text" name="email" value={this.state.email} onInput={this.handleEmailInput}/>
                            </div>
                        </div>  
                        <div className="row">
                            <div className="col">
                                {this.props.error_msg ? <Alert className="alert alert-danger text-center">{this.props.error_msg.msg}</Alert> : null}
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="modal-submit" onClick={this.handleModalSubmit}>Submit Email</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    authenticated: state.authReducer.authenticated,
    user: state.authReducer.user,
    create_fail: state.fireteamReducer.create_fail,
    isCreating: state.fireteamReducer.isCreating,
    error_msg: state.errorReducer.error_msg,
    error_status: state.errorReducer.status,
    isSet: state.userReducer.isSet,
    isSetting: state.userReducer.isSetting
});

export default connect(mapStateToProps, { clear_error, setEmail })(EmailModal);