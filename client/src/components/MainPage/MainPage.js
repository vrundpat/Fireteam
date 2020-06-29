import React, { Component } from 'react';
import AppNavbar from '../AppNavBar/AppNavbar';
import { connect } from 'react-redux';
import { all_fireteams} from '../../actions/fireteamActions';
import { clear_error } from '../../actions/errorActions';
import Fireteam from '../Fireteam/Fireteam';
import CreateModal from '../CreateModal/CreateModal'
import './MainPage.css';

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            isModalOpen: false, 
            currentPage: 1, 
            fireteams_per_page: 5,
            last_index: 5,
            first_index: 0,
            fireteams: []};
        this.generate_fireteams.bind(this);
        this.toggleModal.bind(this);
        this.nextPage.bind(this);
        this.prevPage.bind(this);
        this.firstPage.bind(this);
        this.lastPage.bind(this);
    }

    nextPage = async () => {
        if (this.state.currentPage !== Math.ceil(this.props.fireteamState.all_fireteams.length / this.state.fireteams_per_page)) {
            await this.setState({ currentPage: this.state.currentPage + 1 });
            await this.setState({ last_index: this.state.currentPage * this.state.fireteams_per_page });
            await this.setState({ first_index: this.state.last_index - this.state.fireteams_per_page });
            // console.log("Next: " + this.state.currentPage, this.state.first_index, this.state.last_index);
        }
    }

    prevPage = async () => {
        if (this.state.currentPage !== 1) {
            await this.setState({ currentPage: this.state.currentPage - 1 });
            await this.setState({ last_index: this.state.currentPage * this.state.fireteams_per_page });
            await this.setState({ first_index: this.state.last_index - this.state.fireteams_per_page });
            // console.log("Previous: " + this.state.currentPage, this.state.first_index, this.state.last_index);
        }
    }

    firstPage = async () => {
        await this.setState({ currentPage: 1 });
        await this.setState({ last_index: this.state.currentPage * this.state.fireteams_per_page });
        await this.setState({ first_index: this.state.last_index - this.state.fireteams_per_page });
        // console.log("First Page: " + this.state.currentPage, this.state.first_index, this.state.last_index);
    }

    lastPage = async () => {
        await this.setState({ currentPage: Math.ceil(this.props.fireteamState.all_fireteams.length / this.state.fireteams_per_page) });
        await this.setState({ last_index: this.state.currentPage * this.state.fireteams_per_page });
        await this.setState({ first_index: this.state.last_index - this.state.fireteams_per_page });
        // console.log("Last Page: " + this.state.currentPage, this.state.first_index, this.state.last_index);
    }

    componentWillMount() {
        this.props.all_fireteams();
        this.timer = setInterval(() => this.props.all_fireteams(), 10000);
    }
    
    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    generate_fireteams() {
        console.log("Re-render " + new Date().getSeconds());
        var temp = []
        for (var i = 0; i < this.state.fireteams.length; i++) {
            temp.push(<Fireteam fireteam={this.state.fireteams[i]} />);
        }
        return temp;
    }

    toggleModal = () => {
        this.props.clear_error();
        this.setState({isModalOpen: !this.state.isModalOpen});
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
                        <button className="pagination-button" type="button" onClick={this.firstPage}>First</button>
                        <button className="pagination-button" type="button" onClick={this.nextPage}>Next</button>
                        <button className="pagination-button" type="button" onClick={this.prevPage}>Previous</button>
                        <button className="pagination-button" type="button" onClick={this.lastPage}>Last</button>
                    </div>
                </div>
                <div className="page-number">
                    <h6>Showing {this.state.currentPage} of {Math.ceil(this.props.fireteamState.all_fireteams.length / this.state.fireteams_per_page)}</h6>
                </div>
                <div className="all-fireteams-contianer">
                    {this.props.fireteamState.all_fireteams.slice(this.state.first_index, this.state.last_index).map((fireteam) => <> <Fireteam fireteam={fireteam} key={fireteam._id}/> </>)}
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

export default connect(mapStateToProps, { clear_error, all_fireteams })(MainPage);


