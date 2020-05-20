import React, { useState } from "react";
import "./css/App.css";
import DayCalendar from "./components/DayCalendar";
import { getRandomEvents } from "./lib/utils";

function App() {
  const [events, setEvents] = useState(getRandomEvents(10));

  return (
    <div className="App">
      <DayCalendar events={events} />
      <button onClick={() => setEvents(getRandomEvents(10))}>Generate New Events</button>
    </div>
  );
}

export default App;
