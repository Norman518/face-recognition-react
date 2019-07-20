import React from "react";
import "./FaceRecognition.css";
const drawBoxes = [];
const FaceRecognition = ({ imageUrl, boxes }) => {
  if (boxes.boxCoorsLeft !== undefined) {
    for (let i = 0; i < boxes.boxCoorsLeft.length; i++) {
      drawBoxes.push(
        <div
          className="boundBox"
          key={i}
          style={{
            top: boxes.boxCoorsTop[i],
            left: boxes.boxCoorsLeft[i],
            width: boxes.boxCoorsRight[i] - boxes.boxCoorsLeft[i],
            height: boxes.boxCoorsBottom[i] - boxes.boxCoorsTop[i]
          }}
        />
      );
    }

    return (
      <div className="center ma">
        <div className=" absolute mt2">
          <img
            id="inputImage"
            src={imageUrl}
            alt="face img"
            width="800rem"
            height="auto"
          />
          {drawBoxes}
        </div>
      </div>
    );
  } else {
    /* if (drawBoxes.length > 0) {
console.log('hit')
} */
    return (
      <div className="center ma">
      <div className=" absolute mt2">
        <img
          id="inputImage"
          src={imageUrl}
          alt="face img"
          width="800rem"
          height="auto"
        />
        </div>
      </div>
    );
  }
};

export default FaceRecognition;
