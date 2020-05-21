import {
  getRandomInt,
  getRandomEvent,
  getRandomEvents,
  getRandomColour,
  getRandomEventTitle,
  doEventsOverlap,
  fitEventsInColumns,
  getNumEmptyColumnsAfterEvent,
  convertIntToTimeDisplay,
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

describe("fitEventsInColumns()", () => {
  it("given two events that do not overlap, returns a single column w/ both events", () => {
    const eventA = { start: 0, end: 30 };
    const eventB = { start: 45, end: 60 };
    const columnizedEvents = fitEventsInColumns([eventA, eventB]);

    expect(columnizedEvents.length).toBe(1);
    expect(columnizedEvents[0].length).toBe(2);
  });

  it("given two events that overlap, returns a two column w/ one event each", () => {
    const eventA = { start: 0, end: 60 };
    const eventB = { start: 45, end: 60 };
    const columnizedEvents = fitEventsInColumns([eventA, eventB]);

    expect(columnizedEvents.length).toBe(2);
    expect(columnizedEvents[0].length).toBe(1);
    expect(columnizedEvents[1].length).toBe(1);
  });
});

describe("getNumEmptyColumnsAfterEvent()", () => {
  it("calculates correct amount of empty columns to the right of an event", () => {
    const events = [
      { start: 0, end: 60 },
      { start: 90, end: 120 },
      { start: 100, end: 120 },
    ];
    const columnizedEvents = fitEventsInColumns(events);

    const empty = getNumEmptyColumnsAfterEvent(events[0], 1, columnizedEvents);

    expect(empty).toBe(1);
  });
});

describe("convertIntToTimeDisplay()", () => {
  it("0 -> 9:00am", () => {
    const displayTime = convertIntToTimeDisplay(0);
    expect(displayTime).toBe("9:00am");
  });

  it("meridiem changes after noon", () => {
    const displayTime = convertIntToTimeDisplay(180);
    expect(displayTime).toBe("12:00pm");
  });

  it("minutes calculated properly", () => {
    const displayTime = convertIntToTimeDisplay(205);
    expect(displayTime).toBe("12:25pm");
  });

  it("hours past noon aren't 13 etc.", () => {
    const displayTime = convertIntToTimeDisplay(265);
    expect(displayTime).toBe("1:25pm");
  });
});
