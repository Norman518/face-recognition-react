import React from "react";
import "./FaceRecognition.css";

const drawBoxes = boxes => {
  if (boxes.boxCoordinates) {
    return boxes.boxCoordinates.map((box, index) => {
      return (
        <div
          className="boundBox"
          key={index}
          style={{
            top: box.top,
            left: box.left,
            width: box.right - box.left,
            height: box.bottom - box.top
          }}
        />
      );
    });
  }
};

const FaceRecognition = ({ imageUrl, boxes }) => {
  return (
    <div className="center ma">
      <div className=" absolute mt2">
        <img
          id="inputImage"
          src={imageUrl}
          alt="Face Img goes here"
          width="800rem"
          height="auto"
        />
        {drawBoxes(boxes)}
      </div>
    </div>
  );
};

export default FaceRecognition;
