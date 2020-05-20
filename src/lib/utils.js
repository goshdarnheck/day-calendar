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

// Returns a randomized event title
export const getRandomEventTitle = () => {
  const adjectives = [
    "Fun",
    "Big",
    "Boring",
    "Weird",
    "Important",
    "Challenging",
  ];
  const nouns = [
    "Party",
    "Meeting",
    "Bowling Game",
    "Lunch",
    "Game",
    "Nap",
    "Phone Call",
  ];

  const adjective = adjectives[getRandomInt(0, adjectives.length - 1)];
  const noun = nouns[getRandomInt(0, nouns.length - 1)];

  return `${adjective} ${noun}`;
};

// Returns an "Event" object with random start and end times
export const getRandomEvent = () => {
  const start = getRandomInt(
    DAY_MIN_MINUTES,
    DAY_MAX_MINUTES - EVENT_MIN_MINUTES
  );
  const end = getRandomInt(start + EVENT_MIN_MINUTES, DAY_MAX_MINUTES);
  const title = getRandomEventTitle();

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
};

// Returns a colour with a random hue and static saturation and lightness values
export const getRandomColour = () => {
  const hue = getRandomInt(0, 360);
  return `hsl(${hue}, 90%, 90%)`;
};

// Returns true if two events time ranges overlap
export const doEventsOverlap = (a, b) => {
  return a.end > b.start && a.start < b.end;
};
