import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';
import { Link } from 'react-router-dom';

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className='login'>
      <div className='login__container'>
        <img
          className='login__logo'
          src='https://www.kindpng.com/picc/m/235-2351000_login-icon-png-transparent-png.png'
          alt=''
        />
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor='username'></label>
            <input
              className='inputs'
              name='username'
              type='text'
              placeholder='Username*'
            />
          </div>
          <div>
            <label htmlFor='password'></label>
            <input
              className='inputs'
              name='password'
              type='password'
              placeholder='Password*'
            />
          </div>
          {name === 'signup' ? (
            <div>
              <label htmlFor='email'></label>
              <input
                className='inputs'
                name='email'
                type='email'
                placeholder='Email*'
              />
            </div>
          ) : (
            ''
          )}
          <div>
            <div className='noAccount'>
              {name !== 'signup' ? (
                <h4>
                  <Link className='linky' to='/signup'>
                    {' '}
                    Don't have an account? Sign Up
                  </Link>
                </h4>
              ) : (
                ''
              )}
            </div>
            <button className='login__signInButton' type='submit'>
              {displayName}
            </button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
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

      if (evt.target.name === 'login') {
        const formName = evt.target.name;
        const username = evt.target.username.value;
        const password = evt.target.password.value;
        dispatch(authenticate(username, password, formName));
      } else {
        const formName = evt.target.name;
        const username = evt.target.username.value;
        const password = evt.target.password.value;
        const email = evt.target.email.value;
        dispatch(authenticate(username, password, formName, email));
      }
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
