import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageURL, box }) => {
  return (
    <div className="center ma">
      <div className=" absolute mt2">
        <img
          id="inputImage"
          src={imageURL}
          alt="face img"
          width="800rem"
          height="auto"
        />
        <div
          className="boundBox"
          style={{
            top: box.top,
            right: box.right,
            bottom: box.bottom,
            left: box.left
          }}
        />
      </div>
    </div>
  );
};

export default FaceRecognition;
