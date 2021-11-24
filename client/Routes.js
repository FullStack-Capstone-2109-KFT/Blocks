import React, { Component, Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import { Team } from "./components/LandingPageComponents/Team";
import { Contact } from "./components/LandingPageComponents/Contact";
import JsonData from "../script/data.json";
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
            <Route path="/home" component={Home} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          // <Switch>
          <div>
            {/* <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Redirect to="/home" /> */}
            <Team data={JsonData.Team} />
            <Contact data={JsonData.Contact} />
          </div>
          // </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
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

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
