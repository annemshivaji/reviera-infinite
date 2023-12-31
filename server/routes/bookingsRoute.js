const router = require("express").Router();
const stripe = require("stripe")(process.env.stripe_key); // imported stripe_key from env
const authMiddleware = require("../middlewares/authMiddleware");
const Booking = require("../models/bookingModel");
const Show = require("../models/showModel");

// // make payment
// router.post("/make-payment", authMiddleware, async (req, res) => {
//   try {
//     const { token, amount } = req.body;

//     const customer = await stripe.customers.create({
//       email: token.email,
//       source: token.id,
//     });

//     const charge = await stripe.paymentIntents.create({
//       amount: amount,
//       currency: "usd",
//       customer: customer.id,
//       receipt_email: token.email,
//       description: "Ticket Booked for Event",
//     });

//     const transactionId = charge.id;

//     res.send({
//       success: true,
//       message: "Payment successful",
//       data: transactionId,
//     });
//   } catch (error) {
//     res.send({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// // book shows
// router.post("/book-show", authMiddleware, async (req, res) => {
//   try {
//     // save booking
//     const newBooking = new Booking(req.body);
//     await newBooking.save();

//     const show = await Show.findById(req.body.show);
//     // update seats
//     await Show.findByIdAndUpdate(req.body.show, {
//       bookedSeats: [...show.bookedSeats, ...req.body.seats],
//     });

//     res.send({
//       success: true,
//       message: "Show booked successfully",
//       data: newBooking,
//     });
//   } catch (error) {
//     res.send({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// make payment
router.post("/make-payment", authMiddleware, async (req, res) => {
  try {
    var { show,seats,user,transactionId,token,amount } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const charge = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      customer: customer.id,
      receipt_email: token.email,
      description: "Ticket Booked for Event",
    });

    const data = {
      show: show,
      user: user,
      seats: seats,
      transactionId:charge.id,
    };
    
        // save booking
        const newBooking = new Booking(data);
        await newBooking.save();
    
        const showw = await Show.findById(req.body.show);
        // update seats
        await Show.findByIdAndUpdate(req.body.show, {
          bookedSeats: [...showw.bookedSeats, ...req.body.seats],
        });

    res.send({
      success: true,
      message: "Payment successful and Show booked successfully",
      data: newBooking,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});



// get all bookings by user
router.get("/get-bookings", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.body.userId })
      .populate("show")
      .populate({
        path: "show",
        populate: {
          path: "event",
          model: "events",
        },
      })
      .populate("user")
      .populate({
        path: "show",
        populate: {
          path: "venue",
          model: "venues",
        },
      });

    res.send({
      success: true,
      message: "Bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
