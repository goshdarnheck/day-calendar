import {
  DAY_MIN_MINUTES,
  DAY_MAX_MINUTES,
  EVENT_MIN_MINUTES,
} from "./constants";

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

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
