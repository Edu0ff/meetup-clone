import { MeetupRepositoryMock } from "./MeetupRepositoryMock";
import { describe, expect, it, beforeEach } from "vitest";

describe("MeetupRepositoryMock", () => {
  let meetupRepositoryMock;

  beforeEach(() => {
    meetupRepositoryMock = new MeetupRepositoryMock();
  });

  describe("Create Meetup", () => {
    it("should create a meetup", async () => {
      const meetupData = {
        title: "Tech Meetup",
        picture: "tech_meetup.jpg",
        theme: "Technology",
        location: "123 Main St",
        date: "2024-01-01",
        time: "18:00",
        attendees_count: 50,
      };

      const meetupId = await meetupRepositoryMock.createMeetup(meetupData);
      expect(meetupId).toBe(1);
    });

    it("should throw an error when trying to create a meetup with insufficient data", async () => {
      const meetupData = {
        title: "Tech Meetup",
        picture: "tech_meetup.jpg",
        theme: "Technology",
        location: "123 Main St",
        date: "2024-01-01",
        time: "18:00",
      };
      await expect(
        meetupRepositoryMock.createMeetup(meetupData)
      ).rejects.toThrow("Please provide all required meetup information.");
    });
  });

  describe("List Meetups", () => {
    it("should list meetups", async () => {
      const meetups = await meetupRepositoryMock.listMeetups();
      expect(Array.isArray(meetups)).toBe(true);
    });
  });

  describe("Get Meetup by ID", () => {
    describe("Get Meetup by ID", () => {
      it("should get a meetup by ID", async () => {
        const meetupData = {
          id: 1,
          title: "Tech Meetup",
          picture: "tech_meetup.jpg",
          theme: "Technology",
          location: "123 Main St",
          date: "2024-01-01",
          time: "18:00",
          attendees_count: 50,
        };

        const meetupId = await meetupRepositoryMock.createMeetup(meetupData);
        const retrievedMeetup = await meetupRepositoryMock.getMeetupsById(
          meetupId
        );

        expect(retrievedMeetup).toBeDefined();
        expect(retrievedMeetup).toEqual(meetupData);
      });
    });

    it("should throw an error when trying to get a meetup that does not exist", async () => {
      const meetupId = 9999;
      await expect(
        meetupRepositoryMock.getMeetupsById(meetupId)
      ).rejects.toThrow(`the meetup with ID: ${meetupId} not found`);
    });
  });

  describe("Update Meetup", () => {
    it("should update a meetup", async () => {
      const meetupData = {
        id: 1,
        title: "Tech Meetup",
        picture: "tech_meetup.jpg",
        theme: "Technology",
        location: "123 Main St",
        date: "2024-01-01",
        time: "18:00",
        attendees_count: 50,
      };

      const meetupId = await meetupRepositoryMock.createMeetup(meetupData);

      const updatedMeetup = {
        ...meetupData,
        title: "Updated Tech Meetup",
        attendees_count: 60,
      };

      await meetupRepositoryMock.updateMeetup(meetupId, updatedMeetup);

      const retrievedMeetup = await meetupRepositoryMock.getMeetupsById(
        meetupId
      );

      expect(retrievedMeetup).toEqual(updatedMeetup);
    });

    it("should throw an error when trying to update a meetup that does not exist", async () => {
      const meetupId = 9999;
      await expect(
        meetupRepositoryMock.updateMeetup(meetupId, {
          title: "Updated Tech Meetup",
        })
      ).rejects.toThrowError(`the meetup with ID: ${meetupId} not found`);
    });
  });

  describe("Delete Meetup", () => {
    it("should delete a meetup", async () => {
      const meetupData = {
        id: 1,
        title: "Tech Meetup",
        picture: "tech_meetup.jpg",
        theme: "Technology",
        location: "123 Main St",
        date: "2024-01-01",
        time: "18:00",
        attendees_count: 50,
      };

      const meetupId = await meetupRepositoryMock.createMeetup(meetupData);
      const deletedMeetup = await meetupRepositoryMock.deleteMeetupById(
        meetupId
      );

      expect(deletedMeetup).toBeUndefined();
      expect(meetupRepositoryMock.meetups.length).toBe(0);
    });

    it("should throw an error when trying to delete a meetup that does not exist", async () => {
      const meetupId = 9999;
      await expect(
        meetupRepositoryMock.deleteMeetupById(meetupId)
      ).rejects.toThrow(`the meetup with ID: ${meetupId} not found`);
    });
  });

  describe("Update Attendees Count", () => {
    it("should update the attendees count when a user attends a meetup", async () => {
      const meetupData = {
        id: 1,
        title: "Tech Meetup",
        picture: "tech_meetup.jpg",
        theme: "Technology",
        location: "123 Main St",
        date: "2024-01-01",
        time: "18:00",
        attendees_count: 50,
      };

      const userId = 101;
      const meetupId = await meetupRepositoryMock.createMeetup(meetupData);

      await meetupRepositoryMock.updateAttendeesCountWithUserId(
        meetupId,
        userId,
        true
      );

      const updatedMeetup = await meetupRepositoryMock.getMeetupsById(meetupId);

      expect(updatedMeetup).toBeDefined();
      expect(updatedMeetup.attendees_count).toBe(51);
    });

    it("should update the attendees count when a user cancels attendance to a meetup", async () => {
      const meetupData = {
        id: 1,
        title: "Tech Meetup",
        picture: "tech_meetup.jpg",
        theme: "Technology",
        location: "123 Main St",
        date: "2024-01-01",
        time: "18:00",
        attendees_count: 32,
      };

      const userId = 102;
      const meetupId = await meetupRepositoryMock.createMeetup(meetupData);

      await meetupRepositoryMock.updateAttendeesCountWithUserId(
        meetupId,
        userId,
        false
      );

      const updatedMeetup = await meetupRepositoryMock.getMeetupsById(meetupId);

      expect(updatedMeetup).toBeDefined();
      expect(updatedMeetup.attendees_count).toBe(31);
    });
  });
});
