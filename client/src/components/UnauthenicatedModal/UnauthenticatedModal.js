import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';
import './UnauthenticatedModal.css';

export default class UnauthenticatedModal extends Component {
    render() {
        return (
            <div className="modal-button-container">
                <NavLink className="modal-login-button modal-btn-text" to='/login'>Login</NavLink>
                <p className="modal-middle-text">Or</p>
                <NavLink className="modal-register-button modal-btn-text" to='/register'>Register</NavLink>
            </div>
        )
    }
}
