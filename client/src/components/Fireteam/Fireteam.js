import React, { Component } from 'react';
import './Fireteam.css'

export default class Fireteam extends Component {

    constructor(props) {
        super(props);
        this.get_platform.bind(this);
        this.get_members.bind(this);
    }

    get_platform = (platform_name) => {
        if (platform_name == "PS4") return ( <i className="fa fa-gamepad"><span className="ps4 console-logo">PS4</span></i>)
        else if (platform_name == "Xbox") return ( <i className="fa fa-gamepad"><span className="xbox console-logo">Xbox</span></i>)
        else if (platform_name == "Steam") return ( <i className="fa fa-gamepad"><span className="steam console-logo">Steam</span></i>)
        else return ( <i className="fa fa-gamepad"></i> )

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
                <div className="fireteam-info">
                    <div className="fireteam-info-left-column">
                        <div className="info-container">
                            <button className="fireteam-join-button">JOIN FIRETEAM</button>
                            <div className="fireteam-leader info-tile">
                                <h7><i className="fa fa-user"></i>{this.props.fireteam.leader.username} <span className="leader-power">1000</span></h7>
                            </div>
                            <div className="fireteam-platform info-tile">
                                <h7>{this.get_platform(this.props.fireteam.platform)}</h7>
                            </div>
                            <div className="fireteam-activity-type info-tile">
                                <h7><i className="fa fa-wrench"></i>{this.props.fireteam.activity_type}</h7>
                            </div>
                            <div className="fireteam-capacity info-tile">
                                <h7><i className="fa fa-users"></i>{this.props.fireteam.current_members.length} / {this.props.fireteam.capacity} Guardians</h7>
                            </div>
                            <div className="fireteam-time-created info-tile">
                                <h7><i className="fa fa-calendar"></i>Time Created</h7>
                            </div>
                        </div>
                    </div>
                    <div className="fireteam-info-right-column">
                        <div className="info-container">
                            <div className="right-col-fireteam-description">
                                <span>{this.props.fireteam.description}</span>
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
