import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';

import { Link, useHistory } from 'react-router-dom';
import history from '../history';

const Login = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className='login'>
      <div className='login__container'>
        <h1>Sign-in</h1>

        <form onSubmit={handleSubmit} name={name}>
          <h5>E-mail</h5>
          <input type='text' name='username' />

          <h5>Password</h5>
          <input type='password' name='password' />

          <button type='submit' className='login__signInButton'>
            Sign In
          </button>
          {error && error.response && <div> {error.response.data} </div>}
        </form>

        <button
          className='login__registerButton'
          onClick={() => {
            history.push(`/signup`);
          }}
        >
          Create your Cocktail Space Account
        </button>
      </div>
    </div>
  );
};

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName));
      // dispatch(mergeCarts(JSON.parse(localStorage.getItem('cart'))));
    },
  };
};

export const Logged = connect(mapLogin, mapDispatch)(Login);
export const Signup = connect(mapSignup, mapDispatch)(Login);
