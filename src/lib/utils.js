import {
  DAY_MIN_MINUTES,
  DAY_MAX_MINUTES,
  EVENT_MIN_MINUTES,
} from "./constants";

// Returns a random integer between `min` and `max`
export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Returns an "Event" object with random start and end times
export const getRandomEvent = () => {
  const start = getRandomInt(
    DAY_MIN_MINUTES,
    DAY_MAX_MINUTES - EVENT_MIN_MINUTES
  );
  const end = getRandomInt(start + EVENT_MIN_MINUTES, DAY_MAX_MINUTES);
  const title = "Event Title";

  return {
    start: start,
    end: end,
    title: `${title}`,
  };
};

// Returns an array of random "Event" objects the size of `amount`, sorted by earliest start time
export const getRandomEvents = (amount = 1) => {
  let events = [];

  for (let i = 0; i < amount; i++) {
    events.push(getRandomEvent());
  }

  events.sort((a, b) => {
    return a.start > b.start;
  });

  return events;
}