import React from "react";
import { convertIntToTimeDisplay } from "../lib/utils";
import "../css/HourMarkers.css";

const HourMarker = ({ time }) => {
  return (
    <div
      className="HourMarker"
      style={{
        gridRowStart: time + 1,
        gridRowEnd: time + 60 + 1,
        gridColumnStart: 1,
        gridColumnEnd: 2,
      }}
    >
      <div className="HourMarker__Time">{convertIntToTimeDisplay(time)}</div>
    </div>
  );
};

const HourMarkers = ({ min, max }) => {
  let markers = [];

  for (let i = min; i <= max; i += 60) {
    markers.push(<HourMarker key={i} time={i} />);
  }

  return (
    <div
      className="HourMarkers"
      style={{
        height: `${max}px`,
      }}
    >
      {markers}
    </div>
  );
};

export default HourMarkers;
