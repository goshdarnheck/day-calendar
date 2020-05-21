import React from "react";
import PropTypes from "prop-types";
import Event from "./Event";
import { fitEventsInColumns } from "../lib/utils";
import "../css/DayCalendar.css";

const DayCalendar = ({ events }) => {
  const columnizedEvents = fitEventsInColumns(events);

  return (
    <div
      className="DayCalendar"
      style={{ gridTemplateColumns: `repeat(${columnizedEvents.length}, 1fr)` }}
    >
      {columnizedEvents.map((column, columnIndex) => {
        return column.map((event) => {
          return (
            <Event
              key={`${event.start}${event.end}${event.title}`}
              columnIndex={columnIndex}
              columnizedEvents={columnizedEvents}
              columnCount={columnizedEvents.length}
              event={event}
            />
          );
        });
      })}
    </div>
  );
};

DayCalendar.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.number.isRequired,
      end: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};

export default DayCalendar;
