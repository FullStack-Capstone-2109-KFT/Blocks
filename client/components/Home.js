import React from "react";
import { connect } from "react-redux";
import { Header } from "./LandingPageComponents/Header";
import { Features } from "./LandingPageComponents/Features";
import { About } from "./LandingPageComponents/About";
import { Testimonials } from "./LandingPageComponents/Testimonials";
import { Team } from "./LandingPageComponents/Team";
import { Contact } from "./LandingPageComponents/Contact";
import JsonData from "../../script/data.json";
import MyDropzone from "./Drag&Drop";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <div>
      <Header data={JsonData.Header} />
      <Features data={JsonData.Features} />
      <About data={JsonData.About} />
      <Testimonials data={JsonData.Testimonials} />
      <Team data={JsonData.Team} />
      <Contact data={JsonData.Contact} />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
