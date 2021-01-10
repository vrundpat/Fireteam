import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import UnauthenicatedModal from '../UnauthenicatedModal/UnauthenticatedModal';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import { join_fireteam, all_fireteams } from '../../actions/fireteamActions';
import { clear_error } from '../../actions/errorActions'

import './JoinModal.css';

class JoinModal extends Component {

    constructor(props) {
        super(props);
        this.state = { member_power_val: 750 };
        this.authenticated_modal.bind(this);
        this.handleModalSubmit.bind(this);
    }

    handleSliderValue = (event) => this.setState({[event.target.name] : event.target.value});

    handleModalSubmit = () => {
        var member_guardianType_ref = document.getElementById("member-guardianType");
        var member_platform_ref = document.getElementById("member-platform");

        var member_info = {
            username: this.props.user.username,
            consoleID: this.props.user.consoleID,
            light_level: this.state.member_power_val,
            guardianType: member_guardianType_ref.options[member_guardianType_ref.selectedIndex].value,
            platform: member_platform_ref.options[member_platform_ref.selectedIndex].value,
        }

        this.props.join_fireteam(member_info, this.props.fireteam_id);

        setTimeout(() => {
            if (this.props.join_fail === false) {
                this.props.all_fireteams();
                this.props.toggleModal();
            }
        }, 200);
    }

    authenticated_modal = () => {
        return (
            <form onSubmit={this.handleModalSubmit}>
                    <h5>Member Information</h5>
                    <br/>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label>Members ConsoleID</label>
                                <input className="form-control" type="text" placeholder={this.props.user.consoleID} readOnly/>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col form-group">
                            <select id="member-platform" className="form-control font-sm">
                               <option selected="Choose Platform" value={""}>Member Platform</option>
                                <option value="PS4">PS4</option>
                                <option value="Steam">Steam</option>
                                <option value="Xbox">Xbox</option>
                                <option value="PS5">PS5</option>
                                <option value="Stadia">Stadia</option>
                            </select>
                        </div>
                    </div>

                     <div className="row">
                        <div className="col form-group member-power-slider-root">
                            <p className="member-power-text">Member Power Level: <span className="power-value">{this.state.member_power_val}</span></p>
                            <input className="member-power-slider" type="range" name="member_power_val" min="750" max="1400" value={this.state.member_power_val} onInput={this.handleSliderValue}/>
                        </div>
                    </div>               
                    <div className="row">
                            <div className="col form-group">
                                <select id="member-guardianType" className="form-control font-lg">
                                    <option selected="Member Guardian Type" value={""}>Member Guardian Type</option>
                                    <option value="Hunter">Hunter</option>
                                    <option value="Warlock">Warlock</option>
                                    <option value="Titan">Titan</option>
                                </select>
                            </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col">
                            {this.props.error_msg ? <Alert className="alert alert-danger text-center">{this.props.error_msg.msg}</Alert> : null}
                        </div>
                    </div>
                </form>
        )
    }

    render() {
        return (
            <div className="modal-root">
                <Modal isOpen={this.props.isModalOpen} toggle={this.props.toggleModal}>
                    <ModalHeader className="text-center" toggle={this.props.toggleModal}>
                        <h3>Join Fireteam</h3>
                    </ModalHeader>
                    <ModalBody>
                        {this.props.authenticated ? this.authenticated_modal() : <UnauthenicatedModal />}
                    </ModalBody>
                    <ModalFooter>
                        {this.props.authenticated ? <Button color="primary" onClick={this.handleModalSubmit}>Join Fireteam</Button> : null}
                        <Button color="secondary" onClick={this.props.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    authenticated: state.authReducer.authenticated,
    user: state.authReducer.user,
    join_fail: state.fireteamReducer.join_fail,
    error_msg: state.errorReducer.error_msg,
    error_status: state.errorReducer.status
});

export default connect(mapStateToProps, { join_fireteam, clear_error, all_fireteams })(JoinModal);

