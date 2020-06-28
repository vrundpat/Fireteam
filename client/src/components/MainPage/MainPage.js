import React, { Component } from 'react';
import AppNavbar from '../AppNavBar/AppNavbar';
import { connect } from 'react-redux';
import { create_fireteam, join_fireteam, all_fireteams, get_fireteam } from '../../actions/fireteamActions';
import Fireteam from '../Fireteam/Fireteam';
import CreateModal from '../CreateModal/CreateModal'
import './MainPage.css';

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = { isModalOpen: false};
        this.generate_fireteams.bind(this);
        this.toggleModal.bind(this);
        this.nextPage.bind(this);
        this.prevPage.bind(this);
        this.firstPage.bind(this);
        this.lastPage.bind(this);
    }

    toggleModal = () => this.setState({isModalOpen: !this.state.isModalOpen})

    generate_fireteams = () => {
        var temp = []
        for (var i = 0; i < this.props.fireteamState.currently_viewing.length; i++) temp.push(<Fireteam fireteam={this.props.fireteamState.currently_viewing[i]} />);
        return temp;
    }

    nextPage = () => {
        var temp = this.props.fireteamState.last_fireteam_index;
        this.props.fireteamState.first_fireteam_index = temp;
        this.props.fireteamState.last_fireteam_index += this.props.fireteamState.fireteams_per_page;
    }

    prevPage = () => {

    }

    firstPage = () => {

    }

    lastPage = () => {
        
    }

    componentWillMount() {
        this.timer = setInterval(() => this.props.all_fireteams(), 1000);
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
                            <p className="animated-typewriter">FIND YOUR FIRETEAM.</p>
                        </div>
                    </div>
                </div>
                <div className="site-intro-root">
                    <p className="site-description">
                        Join any of the groups below. Can't find your ideal fireteam? Need help with a tough raid, mission or acitivty?
                    </p>
                    <p className="site-description">
                        Simply create a fireteam below.
                    </p>
                    <button className="create-fireteam-button" onClick={this.toggleModal}>CREATE FIRETEAM</button>
                    <CreateModal isModalOpen={this.state.isModalOpen} toggleModal={this.toggleModal}/>
                </div>
                <div className="pagination-buttons-root">
                    <div className="pagination-buttons-container">
                        <button className="pagination-button" type="button" onClick={this.nextPage}>Next</button>
                        <button className="pagination-button" type="button" onClick={this.prevPage}>Previous</button>
                        <button className="pagination-button" type="button" onClick={this.firstPage}>First</button>
                        <button className="pagination-button" type="button" onClick={this.lastPage}>Last</button>
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


