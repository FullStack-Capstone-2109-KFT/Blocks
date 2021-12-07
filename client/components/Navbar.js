import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

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
              <a
                className='navbar-brand page-scroll'
                href='http://localhost:8080/upload'
              >
                Blocks
              </a>{' '}
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
                  <a href='#' onClick={this.props.handleClick}>
                    Logout
                  </a>
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
              <a
                className='navbar-brand page-scroll'
                href='http://localhost:8080/home#header'
              >
                Blocks
              </a>{' '}
            </div>

            <div
              className='collapse navbar-collapse'
              id='bs-example-navbar-collapse-1'
            >
              <ul className='nav navbar-nav navbar-right'>
                <li>
                  <a
                    href='http://localhost:8080/home#features'
                    className='page-scroll'
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href='http://localhost:8080/home#about'
                    className='page-scroll'
                  >
                    About
                  </a>
                </li>

                <li>
                  <a
                    href='http://localhost:8080/home#testimonials'
                    className='page-scroll'
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href='http://localhost:8080/home#team'
                    className='page-scroll'
                  >
                    Team
                  </a>
                </li>
                <li>
                  <a
                    href='http://localhost:8080/home#contact'
                    className='page-scroll'
                  >
                    Contact
                  </a>
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
