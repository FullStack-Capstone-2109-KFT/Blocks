import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Services extends React.Component {
  render() {
    const { props } = this;

    return (
      <div id="services" className="text-center">
        <div className="container">
          <div className="section-title">
            <h2>Our Services</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
              dapibus leonec.
            </p>
          </div>
          <div className="row">
            {props.data
              ? props.data.map((d, i) => (
                  <div key={`${d.name}-${i}`} className="col-md-4">
                    {" "}
                    <FontAwesomeIcon
                      className={"fa fa-" + d.icon}
                      icon={d.icon}
                    />{" "}
                    <div className="service-desc">
                      <h3>{d.name}</h3>
                      <p>{d.text}</p>
                    </div>
                  </div>
                ))
              : "loading"}
          </div>
        </div>
      </div>
    );
  }
}
