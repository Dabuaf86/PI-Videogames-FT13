import React from "react";
import loading from "./loading.gif";
import "./Loading.css";

const Loading = () => {
  return (
    <div>
      <img className="loadingGif" src={loading} alt="loading games" />
    </div>
  );
};
export default Loading;
