import React from "react";
import { convertIntToTimeDisplay } from "../lib/utils";

const HourMarker = ({ time }) => {
  return (
    <div
      style={{
        gridRowStart: time + 1,
        gridRowEnd: time + 60 + 1,
        gridColumnStart: 1,
        gridColumnEnd: 2,
        position: "relative",
      }}
    >
      <div
        style={{
          textAlign: "right",
          right: 0,
          position: "absolute",
          top: "-0.6em",
          padding: "0 0.8em",
          lineHeight: "1",
        }}
      >
        {convertIntToTimeDisplay(time)}
      </div>
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
      style={{
        width: "4em",
        height: `${max}px`,
        display: "grid",
        gridTemplateRows: "repeat(720, 1px)",
        gridTemplateColumns: "1fr",
      }}
    >
      {markers}
    </div>
  );
};

export default HourMarkers;
