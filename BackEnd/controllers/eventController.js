import { Event } from "../models/index.js";
import { eventQuery } from "../utility/index.js";

//@desc     Get event by diffent selected queries, return one or more post.
//@route    GET /aip/event/get
const getEvent = async (req, res) => {
  try {
    const query = await eventQuery.getEventQuery(req, res);
    console.log(query)

    const searchedEvents = await Event.find(query);
    if (searchedEvents.length === 0) {
      res.status(400).send({ message: "No search result found." });
      return;
    } else {
      res.status(200).send({ 
        message: "Events found successfully!",
        query: query, 
        data: searchedEvents });
      console.log("Events found successfully".bgCyan);
      return searchedEvents;
    }
  } catch (error) {
    console.error("Events found unsuccessfully: ", error);
    throw error;
  }
};

//@desc     Create a event and save in database.
//@route    POST /aip/event/create
const createEvent = async (req, res) => {
  try {
    const eventData = await new Event(req.body).save();
    res.status(200).send({ 
      message: "Event created successfully!",
      data: newEvent });
    console.log("Event data saved successfully".bgCyan);
  } catch (error) { 
    console.error("Event created unsuccessfully:".bgRed, error.message);
    throw error;
  }
};

//@desc     Update a event title time description and nubmer of paticipants
//@route    PUT /aip/event/updateEventDetail
const updateEventDetail = async (req, res) => {
  try {
    if (req.body.user_id && req.body.typeOfSport) {
      res
        .status(400)
        .send({
          data: "Published event can not change author or type of sport!",
        });
    } else {
      const updatedEvent = await Event.findByIdAndUpdate(
        req.query.event_id,
        req.body,
        { new: true }
      );
      res.status(200).send({ data: updatedEvent });
      console.log("Event has been updated successfully!".bgCyan);
    }
  } catch (error) {
    console.error("Event updating unsuccessfully:".bgRed, error.message);
    throw error;
  }
};

//@desc     Update a event comment only
//@route    PUT /aip/event/updateEventComment
const updateEventComment = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.query.event_id,
      { $push: { comments: req.body.comments } },
      { new: true }
    );
    res.status(200).send({
      result: "Event comment updated successfully!",
      numberOfComments: updatedEvent.comments.length, 
      data: updatedEvent });
    console.log("Event updated successfully!".bgCyan);
  } catch (error) {
    console.error("Event updating unsuccessfully:".bgRed, error.message);
    throw error;
  }
};

//@desc     Update a event comment only
//@route    PUT /aip/event/updateEventComment
const updateEventParticipant = async (req, res) => {
  try {
    const selectedEvent = await Event.findById(req.query.event_id);
    const maxNumberOfParticipant = selectedEvent.numberOfParticipants
    if (selectedEvent.participants.length >= maxNumberOfParticipant) {
      res.status(400).send({numberOfParticipants: maxNumberOfParticipant,
        message: "Max numbert of paricipants has reached！",
      });
      console.log("Event max number of participants reached!".yellow);
    } else {
      const updatedEvent = await Event.findByIdAndUpdate(
        req.query.event_id,
        { $push: { participants: req.body.participants } },
        { new: true }
      );
      res.status(200).send({
        result: "Event participant updated successfully!",
        numberOfParticipants: updatedEvent.participants.length, 
        data: updatedEvent });
      console.log("Event updated successfully!".bgCyan);
    }
  } catch (error) {
    console.error("Event updating unsuccessfully:".bgRed, error.message); 
    throw error;
  }
};

//@desc     Update a event star only
//@route    PUT /aip/event/updateEventStar
const updateEventStar = async (req, res) => {
  try {
    const updateEvent = await Event.findByIdAndUpdate(
      req.query.event_id,
      { $push: { stars: req.body.stars } },
      { new: true }
    );
    res.status(200).send({
      result: "Event star updated successfully!",
      numberOfStars: updateEvent.stars.length, 
      data: updateEvent });
    console.log("Event updated successfully!".bgCyan);
  } catch (error) {
    console.error("Event updating unsuccessfully:".bgRed, error.message);
    throw error;
  }
};


//@desc     Delete one or more events based on query conditions
//@route    DELETE /aip/event/delete
const deleteEvent = async (req, res) => {
  try {
    if (!req.query.user_id) {
      res.status(400).send({ message: "User id must be seleted!" });
      return;
    } else {
      const query = await eventQuery.deleteEventQuery(req, res);

      console.log(query);
      const deletedEvents = await Event.deleteMany(query);
      res.status(200).send({ query: query, data: deletedEvents });
      console.log("Events deleted successfully");
      return;
    }
  } catch (error) {
    console.error("Events delete unsuccessfully: ", error);
    throw error;
  }
};

export default {
  getEvent,
  createEvent,
  updateEventDetail,
  updateEventComment,
  updateEventParticipant,
  updateEventStar,
  deleteEvent,
};
