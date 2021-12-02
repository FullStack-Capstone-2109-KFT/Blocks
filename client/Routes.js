import React, { Component, Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import { me } from "./store";
import { Header } from "./components/LandingPageComponents/Header";
import { Features } from "./components/LandingPageComponents/Features";
import { About } from "./components/LandingPageComponents/About";
import { Services } from "./components/LandingPageComponents/Services";
import { Testimonials } from "./components/LandingPageComponents/Testimonials";
import { Team } from "./components/LandingPageComponents/Team";
import { Contact } from "./components/LandingPageComponents/Contact";
import JsonData from "../script/data.json";
import App from '../client/App'
// import SmoothScroll from "smooth-scroll";

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    // const scroll = new SmoothScroll('a[href*="#"]', {
    //   speed: 1000,
    //   speedAsDuration: true,
    // });

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            {/* <Route path="/home" component={Home} />
            <Redirect to="/home" /> */}
          </Switch>
        ) : (
          // <Switch>
          <div>
            {/* <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Redirect to="/home" /> */}
            <Header data={JsonData.Header} />
            <Features data={JsonData.Features} />
            <About data={JsonData.About} />
            <Services data={JsonData.Services} />
            <Testimonials data={JsonData.Testimonials} />
            <Team data={JsonData.Team} />
            <Contact data={JsonData.Contact} />
          </div>
          // </Switch>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));
