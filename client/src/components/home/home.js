import React from "react";
import Games from "../Games/Games";
import Filters from "../searchFilter/searchFilter";
import "./Home.css";

const Home2 = () => {
  return (
    <div className="home">
      <span className="filterBar">
        <Filters />
      </span>
      <Games />
    </div>
  );
};

export default Home2;
// fixed