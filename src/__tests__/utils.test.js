import { getRandomInt, getRandomEvent } from "../lib/utils";
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
