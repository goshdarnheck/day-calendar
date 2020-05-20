import React from "react";
import PropTypes from "prop-types";
import "../css/Event.css";
import { getRandomColour } from "../lib/utils";

function Event({ start, end, title }) {
  const colour = getRandomColour();

  return (
    <div
      className="Event"
      title={`${title}, ${start} - ${end}`}
      style={{
        backgroundColor: colour,
        top: start,
        height: `${end - start}px`,
      }}
    >
      {title}
    </div>
  );
}

Event.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default Event;
