import React, { Component } from 'react';
import './Fireteam.css'

export default class Fireteam extends Component {

    constructor(props) {
        super(props);
        this.get_platform.bind(this);
        this.get_members.bind(this);
    }

    get_platform = (platform_name) => {
        if (platform_name == "basic") return ( <i className="fa fa-gamepad"></i> )
    }

    get_members = () => {
        var accumulator = [];
        for (var i = 0; i < this.props.fireteam.current_members.length; i++) {
            accumulator.push(<li className="fireteam-member"><i className="fa fa-user"></i>{this.props.fireteam.current_members[i].username}</li>);
        }

        return accumulator;
    }

    render() {
        return (
            <div className="fireteam-root">
                <div className="activity-type-image"></div>
                <div className="fireteam-info">
                    <div className="fireteam-info-left-column">
                        <div className="info-container">
                            <button className="fireteam-join-button">JOIN FIRETEAM</button>
                            <div className="fireteam-leader info-tile">
                                <h5><i className="fa fa-user"></i>Leader</h5>
                            </div>
                            <div className="fireteam-platform info-tile">
                                <h5>{this.get_platform("basic")}Platform</h5>
                            </div>
                            <div className="fireteam-activity-type info-tile">
                                <h5><i className="fa fa-wrench"></i>Activity Type</h5>
                            </div>
                            <div className="fireteam-capacity info-tile">
                                <h5><i className="fa fa-users"></i>Capacity</h5>
                            </div>
                            <div className="fireteam-time-created info-tile">
                                <h5><i className="fa fa-calendar"></i>Time Created</h5>
                            </div>
                        </div>
                    </div>
                    <div className="fireteam-info-right-column">
                        <div className="info-container">
                            <div className="right-col-fireteam-description">
                                <h5>Description</h5>
                            </div>

                            <div className="right-col-fireteam-member-list">
                                <ul className="member-list">
                                    {this.get_members()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
