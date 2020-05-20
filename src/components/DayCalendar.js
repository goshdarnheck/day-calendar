import React from "react";
import PropTypes from "prop-types";
import Event from "./Event";
import "../css/DayCalendar.css";

const DayCalendar = ({ events }) => (
  <div className="DayCalendar">
    {events.map((event) => (
      <Event
        key={`${event.start}${event.end}${event.title}`}
        start={event.start}
        end={event.end}
        title={event.title}
      />
    ))}
  </div>
);

DayCalendar.propTypes = {
  events: PropTypes.array,
};

export default DayCalendar;
