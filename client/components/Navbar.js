import React from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../store";
import { HashLink } from 'react-router-hash-link'

export class Navbar extends React.Component {
  render() {
    return (
      <nav id='menu' className='navbar navbar-default navbar-fixed-top'>
        {this.props.isLoggedIn ? (
          <div className='container'>
            <div className='navbar-header'>
              <button
                type='button'
                className='navbar-toggle collapsed'
                data-toggle='collapse'
                data-target='#bs-example-navbar-collapse-1'
              >
                {' '}
                <span className='sr-only'>Toggle navigation</span>{' '}
                <span className='icon-bar'></span>{' '}
                <span className='icon-bar'></span>{' '}
                <span className='icon-bar'></span>{' '}
              </button>
              <Link className='navbar-brand page-scroll' to='/upload'>
                Blocks
              </Link>
            </div>

            <div
              className='collapse navbar-collapse'
              id='bs-example-navbar-collapse-1'
            >
              <ul className='nav navbar-nav navbar-right'>
                <li>
                  <Link to='/cid-reader' className='page-scroll'>
                    CID Reader
                  </Link>
                </li>
                <li>
                  <Link to='/upload' className='page-scroll'>
                    Upload File
                  </Link>
                </li>
                <li>
                  <Link to='/files' className='page-scroll'>
                    Files
                  </Link>
                </li>
                <li>
                  <HashLink to='#' onClick={this.props.handleClick}>
                    Logout
                  </HashLink>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className='container'>
            <div className='navbar-header'>
              <button
                type='button'
                className='navbar-toggle collapsed'
                data-toggle='collapse'
                data-target='#bs-example-navbar-collapse-1'
              >
                {' '}
                <span className='sr-only'>Toggle navigation</span>{' '}
                <span className='icon-bar'></span>{' '}
                <span className='icon-bar'></span>{' '}
                <span className='icon-bar'></span>{' '}
              </button>
              <HashLink to='/home#header' className='navbar-brand page-scroll'>
                Blocks
              </HashLink>
            </div>
            <div
              className='collapse navbar-collapse'
              id='bs-example-navbar-collapse-1'
            >
              <ul className='nav navbar-nav navbar-right'>
                <li>
                  <HashLink to='/home#features' className='page-scroll'>
                    Features
                  </HashLink>
                </li>
                <li>
                  <HashLink to='/home#about' className='page-scroll'>
                    About
                  </HashLink>
                </li>
                <li>
                  <HashLink to='/home#testimonials' className='page-scroll'>
                    Testimonials
                  </HashLink>
                </li>
                <li>
                  <HashLink to='/home#team' className='page-scroll'>
                    Team
                  </HashLink>
                </li>
                <li>
                  <HashLink to='/home#contact' className='page-scroll'>
                    Contact
                  </HashLink>
                </li>
                <li>
                  <Link to='/login' className='page-scroll'>
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
