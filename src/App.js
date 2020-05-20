import React from "react";
import "./css/App.css";
import DayCalendar from "./components/DayCalendar";

function App() {
  return <div className="App"><DayCalendar events={[]} /></div>;
}

export default App;
