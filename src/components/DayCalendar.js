import React from "react";
import PropTypes from "prop-types";
import Event from "./Event";
import HourLines from "./HourLines";
import HourMarkers from "./HourMarkers";
import { fitEventsInColumns } from "../lib/utils";
import { DAY_MIN_MINUTES, DAY_MAX_MINUTES } from "../lib/constants";
import "../css/DayCalendar.css";

const DayCalendar = ({ events }) => {
  const columnizedEvents = fitEventsInColumns(events);

  return (
    <div className="DayCalendar">
      <HourMarkers min={DAY_MIN_MINUTES} max={DAY_MAX_MINUTES} />
      <div
        className="DayCalendar__Grid"
        style={{
          gridTemplateColumns: `repeat(${columnizedEvents.length}, 1fr)`,
        }}
      >
        <HourLines
          min={DAY_MIN_MINUTES + 60}
          max={DAY_MAX_MINUTES - 60}
          width={columnizedEvents.length}
        />
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
