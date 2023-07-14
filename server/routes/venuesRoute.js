const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Venue = require("../models/venueModel");
const Show = require("../models/showModel");

// add venue
router.post("/add-venue", authMiddleware, async (req, res) => {
  try {
    const newVenue = new Venue(req.body);

    const emailRegex = /^[^\s@]+@[^\s@]+\.ac.in+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.send({
        success: false,
        message: "Use VIT official mail to register",
      });
    }

    else await newVenue.save();
    res.send({
      success: true,
      message: "Venue added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get all venues
router.get("/get-all-venues", authMiddleware, async (req, res) => {
  try {
    const venues = await Venue.find().populate('owner').sort({ createdAt: -1 });
    res.send({
      success: true,
      message: "Venues fetched successfully",
      data: venues,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get all venues by owner
router.post("/get-all-venues-by-owner", authMiddleware, async (req, res) => {
  try {
    const venues = await Venue.find({ owner: req.body.owner }).sort({
      createdAt: -1,
    });
    res.send({
      success: true,
      message: "Venues fetched successfully",
      data: venues,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// update venue
router.post("/update-venue", authMiddleware, async (req, res) => {
  try {
    await Venue.findByIdAndUpdate(req.body.venueId, req.body);
    res.send({
      success: true,
      message: "Venue updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// delete venue
router.post("/delete-venue", authMiddleware, async (req, res) => {
  try {
    await Venue.findByIdAndDelete(req.body.venueId);
    res.send({
      success: true,
      message: "Venue deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// add show
router.post("/add-show", authMiddleware, async (req, res) => {
  try {
    const newShow = new Show(req.body);
    await newShow.save();
    res.send({
      success: true,
      message: "Show added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get all shows by venue
router.post("/get-all-shows-by-venue", authMiddleware, async (req, res) => {
  try {
    const shows = await Show.find({ venue: req.body.venueId })
      .populate("event")
      .sort({
        createdAt: -1,
      });

    res.send({
      success: true,
      message: "Shows fetched successfully",
      data: shows,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// delete show
router.post("/delete-show", authMiddleware, async (req, res) => {
  try {
    await Show.findByIdAndDelete(req.body.showId);
    res.send({
      success: true,
      message: "Show deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get all unique venues which have shows of a event
router.post("/get-all-venues-by-event", authMiddleware, async (req, res) => {
  try {
    const { event, date } = req.body;

    // find all shows of a event
    const shows = await Show.find({ event, date })
      .populate("venue")
      .sort({ createdAt: -1 });

    // get all unique venues
    let uniqueVenues = [];
    shows.forEach((show) => {
      const venue = uniqueVenues.find(
        (venue) => venue._id == show.venue._id
      );

      if (!venue) {
        const showsForThisVenue = shows.filter(
          (showObj) => showObj.venue._id == show.venue._id
        );
        uniqueVenues.push({
          ...show.venue._doc,
          shows: showsForThisVenue,
        });
      }
    });

    res.send({
      success: true,
      message: "Venues fetched successfully",
      data: uniqueVenues,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get show by id
router.post("/get-show-by-id", authMiddleware, async (req, res) => {
  try {
    const show = await Show.findById(req.body.showId)
      .populate("event")
      .populate("venue");
    res.send({
      success: true,
      message: "Show fetched successfully",
      data: show,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get a venue by id
router.get("/get-venue-by-id/:id", async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    res.send({
      success: true,
      message: "Venue fetched successfully",
      data: venue,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
