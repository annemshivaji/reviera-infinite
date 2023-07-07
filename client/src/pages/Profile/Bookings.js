import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { message, Row, Table, Col } from "antd";
import { GetBookingsOfUser } from "../../apicalls/bookings";
import moment from "moment";


function Bookings() {
  const [bookings = [], setBookings] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetBookingsOfUser();
      if (response.success) {
        setBookings(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Row gutter={[20, 20]}>
        {bookings.map((booking) => (
          <Col span={12}>
            <div className="card p-3 flex justify-between ">
              <div>
                
                <h1 className="text-xl uppercase">
                  {booking.show.event.title}
                </h1>
                {/* <div className="divider"></div> */}<br></br>
                <h1 className="text-md">
                  {booking.show.venue.name} 
                  {/* ({booking.show.venue.address}) */}
                </h1>
                <h1 className="text-md">
                  Date : {moment(booking.show.date).format("MMM Do YYYY")}{" "}
                </h1>
                <h1 className="text-md">
                  Time : {moment(booking.show.time, "HH:mm").format("hh:mm A")}
                </h1>

                <h1 className="text-md">
                  Amount : ₹ {booking.show.ticketPrice * booking.seats.length}
                </h1>
                <br></br>
                <h1 className="text-md flex">Seats : {booking.seats.join(", ")}</h1>
                {/* <h1 className="text-sm">Booking ID: {booking._id}</h1> */}
              </div>

              <div  className="pr-1 pl-2 pt-1">
                <img
                  src={booking.show.event.poster}
                  alt=""
                  height={190}
                  width={190}
                  className="br-1 p-1"
                />
                
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Bookings;
