import React from 'react';
import { Router, Redirect, Link } from "@reach/router";

import { connect } from "react-redux";
import { combineReducers } from "redux";
import { sitesRequested, sitesLoaded, sitesError } from "./actions/index";

import Sidebar from './components/Sidebar';
import ProjectContent from './components/ProjectsContent';
import ProjectServices from "./services/project-services";
import AboutMe from "./components/AboutMe";
import NotFound from './components/NotFound';

import bg from "./images/bg.JPG";
import userImg from "./images/user.JPG";

const projectServices = new ProjectServices();

class App extends React.Component {

  componentDidMount() {
    this.props.fetchSites();
  }

  render() {
    const {sites, loading, error} = this.props;
    return (
      <Router>
        <div className="page">
          <div className="main">
            <nav className="navbar">
              <div className="container">
                <div className="navbar_nav">
                  <Link to="/" className="nav_item">Главная</Link>
                  <Link to="/aboutme" className="nav_item">Обо мне</Link>
                </div>
              </div>
            </nav>
            <div className="bg_head" style={{backgroundImage: `url(${bg})`}}>
            </div>
            <div className="user_card_wrapper container">
              <div className="user_card" style={{backgroundImage: `url(${userImg})`}} />
            </div>
          </div>
    
          <div className="container">
            <div className="main_content">
              <Router>
                <ProjectContent path="home" sites={sites} />
                <AboutMe path="aboutme" />
                <Redirect from="/" to="home" />
              </Router>
            </div>
          </div>
        </div>
      </Router>
    );
  }
  
}

const mapStateToProps = ({sites, loading, error}) => {
  return { sites, loading, error };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSites: () => {
      dispatch(sitesRequested());
      projectServices.getProjects()
        .then(data => dispatch(sitesLoaded(data)))
        .catch(err => dispatch(sitesError(err)));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);