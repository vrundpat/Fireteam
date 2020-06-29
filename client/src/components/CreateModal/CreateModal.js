import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import UnauthenicatedModal from '../UnauthenicatedModal/UnauthenticatedModal';
import { create_fireteam, all_fireteams } from '../../actions/fireteamActions';
import { clear_error } from '../../actions/errorActions'
import './CreateModal.css';

class CreateModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            req_slider_val: 750,
            leader_power_val: 750
        }
        this.authenticated_modal.bind(this);
        this.handleSliderValue.bind(this);
        this.handleModalSubmit.bind(this);
    }

    handleSliderValue = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    handleModalSubmit = async () => {
        var leader_guardianType_ref = document.getElementById("leader-guardianType");
        var fireteam_platform_ref = document.getElementById("fireteam-platform");
        var fireteam_capacity_ref = document.getElementById("fireteam-capacity");
        var fireteam_acitvity_ref = document.getElementById("fireteam-activity");

        const leader_info = {
            username: this.props.user.username,
            guardianType: leader_guardianType_ref.options[leader_guardianType_ref.selectedIndex].value,
            light_level: this.state.leader_power_val,
            platform: fireteam_platform_ref.options[fireteam_platform_ref.selectedIndex].value,
            consoleID: this.props.user.consoleID
        }

        const fireteam_info = {
            activity_type: fireteam_acitvity_ref.options[fireteam_acitvity_ref.selectedIndex].value,
            description: document.getElementById("fireteam-description").value,
            capacity: fireteam_capacity_ref.options[fireteam_capacity_ref.selectedIndex].value,
            platform: fireteam_platform_ref.options[fireteam_platform_ref.selectedIndex].value,
            power_requirement: this.state.req_slider_val
        }

        this.props.create_fireteam(fireteam_info, leader_info);
        setTimeout(() => {
            if (this.props.create_fail === false) {
                this.props.all_fireteams();
                this.props.toggleModal();
            }
        }, 200);
    }

    authenticated_modal = () => {
        return (
                <form onSubmit={this.handleModalSubmit}>
                    <h5>Leader Information</h5>
                    <br/>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label>Leader's ConsoleID</label>
                                <input className="form-control" type="text" placeholder={this.props.user.consoleID} readOnly/>
                            </div>
                        </div>
                    </div>

                     <div className="row">
                        <div className="col form-group leader-power-slider-root">
                            <p className="leader-power-text">Leader Power Level: <span className="power-value">{this.state.leader_power_val}</span></p>
                            <input className="leader-power-slider" type="range" name="leader_power_val" min="750" max="1070" value={this.state.leader_power_val} onInput={this.handleSliderValue}/>
                        </div>
                    </div>               
                    <div className="row">
                            <div className="col form-group">
                                <select id="leader-guardianType" className="form-control font-lg">
                                    <option selected="Leader Guardian Type" value={""}>Leader Guardian Type</option>
                                    <option value="Hunter">Hunter</option>
                                    <option value="Warlock">Warlock</option>
                                    <option value="Titan">Titan</option>
                                </select>
                            </div>
                    </div>
                    <br/>
                    <h5>Fireteam Information</h5>
                    <br/>
                    <div className="row">
                        <div className="col form-group">
                            <select id="fireteam-platform" className="form-control font-sm">
                                <option selected="Choose Platform" value={""}>Fireteam Platform</option>
                                <option value="PS4">PS4</option>
                                <option value="Steam">Steam</option>
                                <option value="Xbox">Xbox</option>
                            </select>
                        </div>

                        <div className="col form-group">
                            <select id="fireteam-capacity" className="form-control font-sm">
                                <option selected="Choose Capacity" value={""}>Fireteam Capacity</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col form-group">
                            <select id="fireteam-activity" className="form-control font-lg">
                                <option selected="Leader Guardian Type" value={""}>Choose Activity</option>
                                <option value="Dungeon: Prophecy">Dungeon: Prophecy</option>
                            </select>
                            </div>
                    </div>

                    <div className="row">
                        <div className="col form-group power-req-slider-root">
                            <p className="power-req-text fireteam-power-requirement">Power Requirement: <span className="power-value">{this.state.req_slider_val}</span></p>
                            <input className="power-req-slider" type="range" name="req_slider_val" min="750" max="1070" value={this.state.req_slider_val} onInput={this.handleSliderValue}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label for="exampleFormControlTextarea1">Leave a message for your fireteam members!</label>
                                <textarea class="form-control" id="fireteam-description" rows="3"></textarea>
                            </div>
                        </div>
                    </div>

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
                        <h3>Create your Fireteam</h3>
                    </ModalHeader>
                    <ModalBody>
                        {this.props.authenticated ? this.authenticated_modal() : <UnauthenicatedModal />}
                    </ModalBody>
                    <ModalFooter>
                        {this.props.authenticated ? <Button color="primary" onClick={this.handleModalSubmit}>Create Fireteam</Button> : null}
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
    create_fail: state.fireteamReducer.create_fail,
    isCreating: state.fireteamReducer.isCreating,
    error_msg: state.errorReducer.error_msg,
    error_status: state.errorReducer.status
});

export default connect(mapStateToProps, { create_fireteam, clear_error, all_fireteams })(CreateModal);

