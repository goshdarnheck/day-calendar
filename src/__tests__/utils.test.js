import { getRandomInt, getRandomEvent, getRandomEvents } from "../lib/utils";
import {
  DAY_MIN_MINUTES,
  DAY_MAX_MINUTES,
  EVENT_MIN_MINUTES,
} from "../lib/constants";

describe("getRandomInt", () => {
  it("returns an integer in between range", () => {
    expect(getRandomInt(0, 1000)).toBeGreaterThanOrEqual(0);
    expect(getRandomInt(0, 1000)).toBeLessThanOrEqual(1000);
  });

  it("returns a value if min and max are the same", () => {
    expect(getRandomInt(720, 720)).toBeGreaterThanOrEqual(720);
  });
});

describe("getRandomEvent", () => {
  it("generates a valid title", () => {
    const event = getRandomEvent();
    expect(typeof event.title).toBe("string");
    expect(event.title.length).toBeGreaterThan(0);
  });

  it("generates a valid start time", () => {
    const event = getRandomEvent();
    expect(typeof event.start).toBe("number");
    expect(event.start).toBeGreaterThanOrEqual(DAY_MIN_MINUTES);
  });

  it("generates a valid end time", () => {
    const event = getRandomEvent();

    expect(typeof event.end).toBe("number");
    expect(event.end).toBeLessThanOrEqual(DAY_MAX_MINUTES);
    expect(event.end >= event.start + EVENT_MIN_MINUTES).toBe(true);
  });
});

describe("getRandomEvents", () => {
  it("returns an array", () => {
    const events = getRandomEvents();
    expect(Object.prototype.toString.call(events)).toBe("[object Array]");
  });

  it("returns an array of the right length", () => {
    const events = getRandomEvents(12);
    expect(events.length).toBe(12);
  });

  it("returns an array of the right length", () => {
    const events = getRandomEvents(2);
    expect(events[0].start <= events[1].start).toBe(true);
  });
});
