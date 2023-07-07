const router = require("express").Router();
const event = require("../models/eventModel");
const authMiddleware = require("../middlewares/authMiddleware");

// Add a new event
router.post("/add-event", authMiddleware, async (req, res) => {
  try {
    const newevent = new event(req.body);
    await newevent.save();
    res.send({
      success: true,
      message: "Event added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get all events
router.get("/get-all-events", async (req, res) => {
  try {
    const events = await event.find().sort({ createdAt: -1 });
    res.send({
      success: true,
      message: "Events fetched successfully",
      data: events,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// update a event
router.post("/update-event", authMiddleware, async (req, res) => {
  try {
    await event.findByIdAndUpdate(req.body.eventId, req.body);
    res.send({
      success: true,
      message: "Event updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// delete a event
router.post("/delete-event", authMiddleware, async (req, res) => {
  try {
    await event.findByIdAndDelete(req.body.eventId);
    res.send({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get a event by id
router.get("/get-event-by-id/:id", async (req, res) => {
  try {
    const Event = await event.findById(req.params.id);
    res.send({
      success: true,
      message: "Event fetched successfully",
      data: Event,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
