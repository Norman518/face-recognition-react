import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onBtnSubmit }) => {
  return (
    <div>
      <p className="f3">{"Detects Faces In Pictures"}</p>

      <div className="center form pa4 br3 shadow-5">
        <input
          type="text"
          className="w-70 f4 pa2  center"
          onChange={onInputChange}
        />
        <button
          onClick={onBtnSubmit}
          className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
        >
          Detect
        </button>
      </div>
    </div>
  );
};

export default ImageLinkForm;
