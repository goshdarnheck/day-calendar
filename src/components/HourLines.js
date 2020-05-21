import React from "react";
import "../css/HourLines.css";

const HourLine = ({ time, width }) => {
  return (
    <div
      className="HourLine"
      style={{
        gridRowStart: time,
        gridRowEnd: time + 1,
        gridColumnStart: 1,
        gridColumnEnd: width + 1,
      }}
    ></div>
  );
};

const HourLines = ({ min, max, width }) => {
  let lines = [];

  for (let i = min; i <= max; i += 60) {
    lines.push(<HourLine key={i} time={i} width={width} />);
  }

  return <>{lines.map((hourLine, i) => hourLine)}</>;
};

export default HourLines;
