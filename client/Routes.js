import React, { Component, Fragment, useState } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import { me } from "./store";
import UploadFile from "./components/UploadFile";
import FileView from "./components/FileView";
import Home from "./components/Home";
import Share from "./components/SharePopUp";
import CidReader from "./components/CID-Reader";
import Info from "./components/LandingPageComponents/Learn-Blocks";
import Learn from "./components/LandingPageComponents/Learn-Blocks";

// import SmoothScroll from "smooth-scroll";

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }
  render() {
    const { isLoggedIn, userId } = this.props;

    // const scroll = new SmoothScroll('a[href*="#"]', {
    //   speed: 1000,
    //   speedAsDuration: true,
    // });

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/">
              <Redirect to="/files" />
            </Route>
            <Route path="/upload">
              <UploadFile userId={userId} />
            </Route>
            <Route path="/login">
              <Redirect to="/files" />
            </Route>
            <Route path="/signup">
              <Redirect to="/files" />
            </Route>
            <Route path="/files">
              <FileView userId={userId} />
            </Route>
            <Route path="/cid-reader">
              <CidReader />
            </Route>
            <Route path="/learn-blocks">
              <Learn />
            </Route>
          </Switch>
        ) : (
          <div>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route exact path="/home" component={Home} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id,
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
