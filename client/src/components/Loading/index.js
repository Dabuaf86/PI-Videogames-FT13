import React from "react";
import loading from "../../multimedia/loading.gif";
import "./loading.css";

const Loading = () => {
  return (
    <div>
      <img className="loadingGif" src={loading} alt="loading games" />
    </div>
  );
};
export default Loading;