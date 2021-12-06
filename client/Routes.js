import React, { Component, Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import { me } from "./store";
import UploadFile from "./components/UploadFile";
import FileView from "./components/FileView";
import Home from "./components/Home";
import Share from "./components/SharePopUp"
// import SmoothScroll from "smooth-scroll";

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, userId, userName } = this.props;

    // const scroll = new SmoothScroll('a[href*="#"]', {
    //   speed: 1000,
    //   speedAsDuration: true,
    // });

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/upload">
              <UploadFile userId={userId} userName={userName} />
            </Route>
            <Route path="/login">
              <Redirect to="/upload" />
            </Route>
            <Route path="/files">
              <FileView userId={userId} />
            </Route>
            <Route path='/share' component={Share}/>
          </Switch>
        ) : (
          <div>
            {/* <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Redirect to="/home" /> */}
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
    userName: state.auth.username,
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
