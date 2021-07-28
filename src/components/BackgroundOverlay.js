import React from "react";
import { Helmet } from "react-helmet";

const BackgroundOverlay = (props) => {
  return (
    <div>
      <Helmet>
        <style>{"body { background-color: " + props.color + "; }"}</style>
      </Helmet>
    </div>
  );
};

export default BackgroundOverlay;
