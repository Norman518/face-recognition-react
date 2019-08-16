import React from "react";

const Entries = ({ name, entries }) => {
  return (
    <div>
      <div className="black f3">
        {`${name}, your current entry count is...`}
      </div>
      <div className="black f1">{entries}</div>
    </div>
  );
};

export default Entries;
