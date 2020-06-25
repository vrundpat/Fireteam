import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { Component } from 'react';
import './CreateModal.css';

export default class CreateModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="modal-root">
                <Modal isOpen={this.props.isModalOpen} toggle={this.props.toggleModal}>
                    <ModalHeader toggle={this.props.toggleModal}>Create your Fireteam</ModalHeader>
                    <ModalBody>
                        <form>
                            <h5>Leader Information</h5>
                            <br/>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label>Leader's ConsoleID</label>
                                        <input className="form-control" type="text" placeholder="Insert Leader consoleID here" readOnly/>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col form-group">
                                    <select className="form-control">
                                        <option selected="Choose Platform">Leader's Power Level</option>
                                    </select>
                                </div>
                            
                                <div className="col form-group">
                                    <select className="form-control">
                                        <option selected="Leader Guardian Type">Leader Guardian Type</option>
                                        <option value="Hunter">Hunter</option>
                                        <option value="Warlock">Warlock</option>
                                        <option value="Titan">Titan</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                        <br/>
                        <form>
                            <h5>Fireteam Information</h5>
                            <br/>
                            <div className="row">
                                <div className="col form-group">
                                    <select className="form-control">
                                        <option selected="Choose Platform">Fireteam Platform</option>
                                    </select>
                                </div>

                                <div className="col form-group">
                                    <select className="form-control">
                                        <option selected="Choose Capacity">Fireteam Capacity</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col form-group">
                                    <select className="form-control">
                                        <option selected="Leader Guardian Type">Choose Activity</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col form-group">
                                
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label for="exampleFormControlTextarea1">Leave a message for your fireteam members!</label>
                                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.props.toggleModal}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.props.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
