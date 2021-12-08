import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Team extends React.Component {
  render() {
    const { props } = this;

    return (
      <div id="team" className="text-center">
        <div className="container">
          <div className="col-md-8 col-md-offset-2 section-title">
            <h2>Meet the Team</h2>
            <p>
              Meet the team of dedicated engineers who keep Blocks running
              behind the scenes. Connect with us on LinkedIn!
            </p>
          </div>
          <div id="row">
            {props.data
              ? props.data.map((d, i) => (
                  <div
                    key={`${d.name}-${i}`}
                    className="col-md-3 col-sm-6 team"
                  >
                    <div className="thumbnail">
                      {" "}
                      <img src={d.img} alt="..." className="team-img" />
                      <div className="hover-text">
                        <a href={d.url}>
                          <FontAwesomeIcon
                            className="fa fa-linkedin"
                            icon={["fab", "linkedin"]}
                          />
                        </a>
                      </div>
                      <div className="caption">
                        <h4>{d.name}</h4>
                        <p>{d.job}</p>
                      </div>
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
