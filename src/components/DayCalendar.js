import React from "react";
import PropTypes from "prop-types";
import "../css/DayCalendar.css";

const DayCalendar = ({ events }) => {
  return <div className="DayCalendar"></div>;
};

DayCalendar.propTypes = {
  events: PropTypes.array,
};

export default DayCalendar;
