import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

import Navbar from "./components/Navbar";
import Routes from "./Routes";

library.add(fab, fas);

const App = () => {

  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
