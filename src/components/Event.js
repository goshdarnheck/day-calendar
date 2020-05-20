import React from "react";
import PropTypes from "prop-types";
import "../css/Event.css";

function Event({ start, end, title }) {
  return (
    <div
      className="Event"
      title={`${title}, ${start} - ${end}`}
      style={{ top: start }}
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
