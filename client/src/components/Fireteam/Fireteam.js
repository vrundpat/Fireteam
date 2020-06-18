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
                <div className="fireteam-info"></div>
            </div>
        )
    }
}
