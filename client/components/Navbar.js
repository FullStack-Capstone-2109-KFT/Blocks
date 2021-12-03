import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

// const Navbar = ({ handleClick, isLoggedIn }) => (
//   <div>
//     <h1>Blocks</h1>
//     <nav>
//       {isLoggedIn ? (
//         <div>
//           {/* The navbar will show these links after you log in */}
//           <Link to="/home">Home</Link>
//           <a href="#" onClick={handleClick}>
//             Logout
//           </a>
//         </div>
//       ) : (
//         <div>
//           {/* The navbar will show these links before you log in */}
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Sign Up</Link>
//         </div>
//       )}
//     </nav>
//     <hr />
//   </div>
// );

//add code to below to account for changed nav view w/ logged-in user

export class Navbar extends React.Component {
  render() {
    // const { handleClick, isLoggedIn } = this;
    console.log(this);
    return (
      <nav id="menu" className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            >
              {" "}
              <span className="sr-only">Toggle navigation</span>{" "}
              <span className="icon-bar"></span>{" "}
              <span className="icon-bar"></span>{" "}
              <span className="icon-bar"></span>{" "}
            </button>
            <a
              className="navbar-brand page-scroll"
              href="http://localhost:8080/home#header"
            >
              Blocks
            </a>{" "}
          </div>

          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/signup" className="page-scroll">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/login" className="page-scroll">
                  Login
                </Link>
              </li>
              <li>
                <a
                  href="http://localhost:8080/home#features"
                  className="page-scroll"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="http://localhost:8080/home#about"
                  className="page-scroll"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="http://localhost:8080/home#services"
                  className="page-scroll"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="http://localhost:8080/home#testimonials"
                  className="page-scroll"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href="http://localhost:8080/home#team"
                  className="page-scroll"
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  href="http://localhost:8080/home#contact"
                  className="page-scroll"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
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
