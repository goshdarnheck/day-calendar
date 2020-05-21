import React from "react";
import PropTypes from "prop-types";
import "../css/Event.css";
import { getRandomColour, getNumEmptyColumnsAfterEvent } from "../lib/utils";

function Event({ event, columnIndex, columnizedEvents }) {
  const gridRowStart = event.start + 1; // CSS grid lines start at 1, not 0, so we need to add 1 to each
  const gridRowEnd = event.end + 1;
  const gridColumnStart = columnIndex + 1;
  const gridColumnEnd =
    gridColumnStart +
    1 + // Each event should be at least 1 grid cell wide
    getNumEmptyColumnsAfterEvent(event, columnIndex + 1, columnizedEvents); // Expand to fill extra space

  return (
    <div
      className="Event"
      title={`${event.title}, ${event.start} - ${event.end}`}
      style={{
        backgroundColor: getRandomColour(),
        gridColumnStart: gridColumnStart,
        gridColumnEnd: gridColumnEnd,
        gridRowStart: gridRowStart,
        gridRowEnd: gridRowEnd,
        zIndex: 1,
      }}
    >
      {event.title}
    </div>
  );
}

Event.propTypes = {
  event: PropTypes.shape({
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }),
};

export default Event;
