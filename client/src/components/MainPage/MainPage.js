import React, { Component } from 'react';
import AppNavbar from '../AppNavBar/AppNavbar';
import { connect } from 'react-redux';
import { create_fireteam, join_fireteam, all_fireteams, get_fireteam } from '../../actions/fireteamActions';
import Fireteam from '../Fireteam/Fireteam';
import AppJumbotron from '../AppJumbotron/AppJumbotron'
import './MainPage.css';

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.generate_fireteams.bind(this);
    }

    generate_fireteams = () => {
        var temp = []
        for (var i = 0; i < this.props.fireteamState.all_fireteams.length; i++) {
            temp.push(<Fireteam fireteam={this.props.fireteamState.all_fireteams[i]} />);
        }

        return temp;
    }

    componentWillMount() {
        // this.timer = setInterval(() => this.props.all_fireteams(), 2000);
        this.props.all_fireteams();
    }
    
    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    render() {

        var test = {
            leader: {"consoleID": "testLeader", "light_level": 1000},
            current_members: [{"consoleID" : "testLeader", "light_level": 1000}, {"consoleID" : "test2", "light_level": 1000}, {"consoleID" : "test3", "light_level": 1000}, {"consoleID" : "test4", "light_level": 1000}, {"consoleID" : "test5", "light_level": 1000}, {"consoleID" : "test6", "light_level": 1000}],
            activity_type: "Dungeon: Prophecy",
            description: "Need help with Prophecy dungeon /join",
            platform: "PS4",
            capacity: "6",
            time_created: "...",
            power_requirement: "None"
        }

        return (
            <div className="mainpage-background-root">
                <div className="mainpage-jumbotron">
                    <div className="mainpage-blurscreen">
                        <AppNavbar isAlpha={true}/>
                        <div className="animated-text-container">
                            <h3 className="animated-typewriter">Find your team.</h3>
                        </div>
                    </div>
                </div>
                <div className="all-fireteams-contianer">
                    {/* <Fireteam fireteam={test} /> */}
                    {this.generate_fireteams()}
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    authenticated: state.authReducer.authenticated,
    user: state.authReducer.user,
    error_msg: state.errorReducer.error_msg,
    error_status: state.errorReducer.status,
    fireteamState: state.fireteamReducer

});

export default connect(mapStateToProps, { create_fireteam, join_fireteam, all_fireteams, get_fireteam })(MainPage);


