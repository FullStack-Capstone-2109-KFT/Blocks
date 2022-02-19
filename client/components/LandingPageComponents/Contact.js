import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import emailjs from "emailjs-com";

export class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      message: "",
    };
    this.clearState = this.clearState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  clearState() {
    this.setState({ name: "", email: "", message: "" });
  }

  handleChange(evt) {
    const { name, value } = evt.target;
    this.setState((state) => ({ ...state, [name]: value }));
  }

  handleSubmit(evt) {
    const { name, email, message } = this.state;
    evt.preventDefault();
    console.log(name, email, message);
    emailjs
      .sendForm(
        "service_4frr8qa",
        "template_8augfxj",
        evt.target,
        "user_foUtc38kpDPMaRxQfojwG"
      )
      .then(
        (result) => {
          console.log(result.text), this.clearState();
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  render() {
    const { handleSubmit, handleChange, props } = this;

    return (
      <div>
        <div id="contact">
          <div className="container">
            <div className="col-md-8">
              <div className="row">
                <div className="section-title">
                  <h2>Get In Touch</h2>
                  <p>
                    Please fill out the form below to send us an email and we
                    will get back to you as soon as possible.
                  </p>
                </div>
                <form name="sentMessage" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          value={this.state.name}
                          placeholder="Name"
                          required
                          onChange={handleChange}
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          value={this.state.email}
                          placeholder="Email"
                          required
                          onChange={handleChange}
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <textarea
                      name="message"
                      id="message"
                      className="form-control"
                      value={this.state.message}
                      rows="4"
                      placeholder="Message"
                      required
                      onChange={handleChange}
                    ></textarea>
                    <p className="help-block text-danger"></p>
                  </div>
                  <div id="success"></div>
                  <button type="submit" className="btn btn-custom btn-lg">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
            <div className="col-md-3 col-md-offset-1 contact-info">
              <div className="contact-item">
                <h3>Contact Info</h3>
                <p>
                  <span>
                    <i className="fa fa-map-marker"></i> Address
                  </span>{" "}
                  {props.data ? props.data.address : "loading"}
                </p>
              </div>
              <div className="contact-item">
                <p>
                  <span>
                    <i className="fa fa-phone"></i> Phone
                  </span>{" "}
                  {props.data ? props.data.phone : "loading"}
                </p>
              </div>
              <div className="contact-item">
                <p>
                  <span>
                    <i className="fa fa-envelope-o"></i> Email
                  </span>{" "}
                  {props.data ? props.data.email : "loading"}
                </p>
              </div>
            </div>
            <div className="col-md-12">
              <div className="row">
                <div className="social">
                  <ul>
                    <li>
                      <a href={props.data ? props.data.facebook : "/"}>
                        <FontAwesomeIcon
                          className="fa fa-youtube"
                          icon={["fab", "facebook"]}
                        />
                      </a>
                    </li>
                    <li>
                      <a href={props.data ? props.data.twitter : "/"}>
                        <FontAwesomeIcon
                          className="fa fa-twitter"
                          icon={["fab", "twitter"]}
                        />
                      </a>
                    </li>
                    <li>
                      <a href={props.data ? props.data.youtube : "/"}>
                        <FontAwesomeIcon
                          className="fa fa-youtube"
                          icon={["fab", "youtube"]}
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="footer">
          <div className="container text-center">
            <a href="http://www.youtube.com/watch?v=dQw4w9WgXcQ">
              &copy; 2022 KOOL L.L.C.
            </a>
          </div>
        </div>
      </div>
    );
  }
}
