import React, { Component } from 'react';
import './Fireteam.css'

export default class Fireteam extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="fireteam-root">
                <div className="activity-type-image"></div>
                <div className="fireteam-info">
                    <div className="fireteam-info-left-column">
                        <h5>Join Button</h5>
                        <h5>Leader</h5>
                        <h5>Platform</h5>
                        <h5>Activity Type</h5>
                        <h5>Capacity</h5>
                        <h5>Time Created</h5>
                    </div>
                    <div className="fireteam-info-right-column">
                        <h5>Description</h5>
                        <h5>Members full list with powers</h5>
                    </div>
                </div>
            </div>
        )
    }
}
