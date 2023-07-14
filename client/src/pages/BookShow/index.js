import { message } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GetShowById } from "../../apicalls/venues";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import StripeCheckout from "react-stripe-checkout";
import Button from "../../components/Button";
import { BookShowTickets, MakePayment } from "../../apicalls/bookings";

function BookShow() {
  const { user } = useSelector((state) => state.users);
  const [show, setShow] = React.useState(null);
  const [selectedSeats, setSelectedSeats] = React.useState([]);
 
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetShowById({
        showId: params.id,
      });
      if (response.success) {
        setShow(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  var i = 0;
  const getSeats = () => {
    const columns = 12;
    const totalSeats = show.totalSeats;
    const rows = Math.ceil(totalSeats / columns);

    return (
      <div className="flex gap-1 flex-col p-2 card card2">
        {
          Array.from(Array(rows).keys()).map((seat, index) => {

            return (
              <div className="flex gap-1 justify-center">
                {Array.from(Array(columns).keys()).map((column, index) => {
                  i++;
                  const seatNumber = i;
                  let seatClass = "seat";

                  if (selectedSeats.includes(seatNumber)) {
                    seatClass = seatClass + " selected-seat";
                  }

                  if (show.bookedSeats.includes(seatNumber)) {
                    seatClass = seatClass + " booked-seat";
                  }

                  return (
                    i <= totalSeats && (
                      <div
                        className={seatClass}
                        onClick={() => {
                          if (selectedSeats.includes(seatNumber)) {
                            setSelectedSeats(
                              selectedSeats.filter((item) => item !== seatNumber)
                            );
                          } else {
                            setSelectedSeats([...selectedSeats, seatNumber]);
                          }
                        }}
                      >
                        <h1 className="text-sm">{seatNumber}</h1>
                      </div>
                    )
                  );
                })}
              </div>
            );
          })}
      </div>
    );
  };

  // const book = async (transactionId) => {
  //   try {
  //     dispatch(ShowLoading());
  //     const response = await BookShowTickets({
  //       show: params.id,
  //       seats: selectedSeats,
  //       transactionId,
  //       user: user._id,
  //     });
  //     if (response.success) {
  //       message.success(response.message);
  //       navigate("/profile");
  //     } else {
  //       message.error(response.message);
  //     }
  //     dispatch(HideLoading());
  //   } catch (error) {
  //     message.error(error.message);
  //     dispatch(HideLoading());
  //   }
  // };

  // const onToken = async (token) => {
  //   try {
  //     dispatch(ShowLoading());
  //     const response = await MakePayment(
  //       token,
  //       selectedSeats.length * show.ticketPrice * 100,
  //     );
  //     if (response.success) {
  //       message.success(response.message);
  //       book(response.data);
  //     } else {
  //       message.error(response.message);
  //     }
  //     dispatch(HideLoading());
  //   } catch (error) {
  //     message.error(error.message);
  //     dispatch(HideLoading());
  //   }
  // };

  var [transactionId, settransactionId] = React.useState();
  
  const onToken = async (token) => {
    try {
      dispatch(ShowLoading());
      const response = await MakePayment(      
        params.id,
        selectedSeats,
        user._id,
        transactionId,
        token,
        selectedSeats.length * show.ticketPrice * 100,
      );
      if (response.success) {
        message.success(response.message);
        navigate("/profile");
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };


  useEffect(() => {
    getData();
  }, []);
  return (
    show && (
      <div >
        {/* show infomation */}

        <div className="flex justify-between card p-3 items-center">
          <div>
            <h1 className="text-md">
              {moment(show.date).format("MMM Do yyyy")} -{" "}
              {moment(show.time, "HH:mm").format("hh:mm A")}
            </h1>
          </div>

          <div>
            <h1 className="text-lg uppercase">
              PEOPLE LOOK HERE
            </h1>
          </div>

          <div>

            <h1 className="text-lg">{show.venue.name}</h1>

          </div>
        </div>

        {/* seats */}
        <br></br>

        {/* <center><Button title="STAGE"  variant="transparent1" type="submit" /></center> */}
        {selectedSeats.length > 0 && (
          <div className="mt-2 flex justify-center gap-2 items-center flex-col">
            <div className="flex justify-center">
              <div className="flex uppercase card card2 p-2 gap-3">
                {/* <h1 className="text-sm"><b>Selected Seats</b> : {selectedSeats.join(" , ")}</h1> */}
                <h1 className="text-sm"><b>Number of Seats</b> : {selectedSeats.length}</h1>
                <h1 className="text-sm"><b>Ticket Price</b> : {show.ticketPrice}</h1>
                <h1 className="text-sm">
                  <b>Total Price</b> : {selectedSeats.length * show.ticketPrice}
                </h1>
              </div>

              <div className="pt-1 pr-2 pl-2">
                <StripeCheckout
                  token={onToken}
                  amount={selectedSeats.length * show.ticketPrice * 100}
                  billingAddress
                  stripeKey="pk_test_51MgdBFSCH7qB0cImTsuPFn9EmP52GNd0ipHzigGHcXkJI6jqQxRcBME7nyZRWmfsqZKbqP5Mo37uMmAkWfDwsS5G00yL45U7sq"
                >
                  <Button title="Book Now" />
                </StripeCheckout></div>
            </div>
          </div>

        )}
        <div className="flex justify-center mt-2">{getSeats()}</div>


      </div>
    )
  );
}

export default BookShow;
