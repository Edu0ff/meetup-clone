import { Meetup } from "./Meetup.js";
import { describe, expect, it } from "vitest";
describe("Meetup", () => {
  it("should create a meetup and check attributes", () => {
    const meetup = Meetup.create(
      "1",
      "title",
      "picture",
      "theme",
      "location",
      "date",
      "time",
      0
    );
    expect(meetup.getId()).toEqual("1");
    expect(meetup.hasId("2")).toEqual(false);
    expect(meetup.getTitle()).toEqual("title");
    expect(meetup.getPicture()).toEqual("picture");
    expect(meetup.getTheme()).toEqual("theme");
    expect(meetup.getLocation()).toEqual("location");
    expect(meetup.getDate()).toEqual("date");
    expect(meetup.getTime()).toEqual("time");
    expect(meetup.getAttendees_Count()).toEqual(0);
  });
});
