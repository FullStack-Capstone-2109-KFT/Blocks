import React, { Component, Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import { me } from "./store";
import UploadFile from "./components/UploadFile";
import Home from './components/Home';
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
          <div>
            {/* <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Redirect to="/home" /> */}
            <Route exact path='/home' component={Home} />
            <Route path='/upload' component={UploadFile} />
            <Route path='/signup' component={Signup}/>
            <Route path='/login' component={Login} />
          </div>
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
