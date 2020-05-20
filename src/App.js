import React from "react";
import "./css/App.css";
import DayCalendar from "./components/DayCalendar";
import { getRandomEvents } from "./lib/utils";

function App() {
  const events = getRandomEvents(10);

  return (
    <div className="App">
      <DayCalendar events={events} />
    </div>
  );
}

export default App;
