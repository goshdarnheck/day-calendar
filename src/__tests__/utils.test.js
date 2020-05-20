import {
  getRandomInt,
  getRandomEvent,
  getRandomEvents,
  getRandomColour,
  getRandomEventTitle,
  doEventsOverlap,
} from "../lib/utils";

import {
  DAY_MIN_MINUTES,
  DAY_MAX_MINUTES,
  EVENT_MIN_MINUTES,
} from "../lib/constants";

describe("getRandomInt()", () => {
  it("returns an integer in between range", () => {
    expect(getRandomInt(0, 1000)).toBeGreaterThanOrEqual(0);
    expect(getRandomInt(0, 1000)).toBeLessThanOrEqual(1000);
  });

  it("returns a value if min and max are the same", () => {
    expect(getRandomInt(720, 720)).toBeGreaterThanOrEqual(720);
  });
});

describe("getRandomEvent()", () => {
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

describe("getRandomEvents()", () => {
  it("returns an array", () => {
    const events = getRandomEvents();
    expect(Object.prototype.toString.call(events)).toBe("[object Array]");
  });

  it("returns an array of the right length", () => {
    const events = getRandomEvents(12);
    expect(events.length).toBe(12);
  });

  it("objects in the array are sorted by first start time to last", () => {
    const events = getRandomEvents(2);
    expect(events[0].start <= events[1].start).toBe(true);
  });
});

describe("getRandomEventTitle()", () => {
  it("returns a string", () => {
    const title = getRandomEventTitle();
    expect(typeof title).toBe("string");
    expect(title.length).toBeGreaterThan(0);
  });
});

describe("getRandomColour()", () => {
  it("returns a string", () => {
    const colour = getRandomColour();
    expect(typeof colour).toBe("string");
  });

  it("returns a hsl() value", () => {
    const hslRegex = /hsl\([0-9]+,\s?[0-9]+%,\s?[0-9]+%\)/;
    const colour = getRandomColour();
    expect(colour).toMatch(hslRegex);
  });

  it("returns a valid hue", () => {
    const hueRegex = /hsl\(([0-9]+),/;
    const colour = getRandomColour();
    const match = colour.match(hueRegex);

    expect(parseInt(match[1])).toBeGreaterThanOrEqual(0);
    expect(parseInt(match[1])).toBeLessThanOrEqual(360);
  });
});

describe("doEventsOverlap()", () => {
  it("returns true when passed events where one starts before the other ends", () => {
    const eventA = { start: 0, end: 90 };
    const eventB = { start: 30, end: 120 };
    const overlap = doEventsOverlap(eventA, eventB);
    expect(overlap).toBe(true);
  });

  it("returns true when passed events w/ same start times", () => {
    const eventA = { start: 0, end: 90 };
    const eventB = { start: 0, end: 120 };
    const overlap = doEventsOverlap(eventA, eventB);
    expect(overlap).toBe(true);
  });

  it("returns true when passed events w/ same end times", () => {
    const eventA = { start: 0, end: 90 };
    const eventB = { start: 15, end: 90 };
    const overlap = doEventsOverlap(eventA, eventB);
    expect(overlap).toBe(true);
  });

  it("returns false when passed events where first ends before the second starts", () => {
    const eventA = { start: 0, end: 90 };
    const eventB = { start: 120, end: 135 };
    const overlap = doEventsOverlap(eventA, eventB);
    expect(overlap).toBe(false);
  });

  it("returns false when passed events where second ends before the first starts", () => {
    const eventA = { start: 190, end: 250 };
    const eventB = { start: 120, end: 135 };
    const overlap = doEventsOverlap(eventA, eventB);
    expect(overlap).toBe(false);
  });
});
