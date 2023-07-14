import React, { useEffect } from "react";
import { Col, message, Row, Table } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { GetAllEvents, GetEventById } from "../../apicalls/events";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { GetAllVenuesByEvent } from "../../apicalls/venues";


function VenuesForEvent() {
  // get date from query string
  const tempDate = new URLSearchParams(window.location.search).get("date");
  const [date, setDate] = React.useState(
    tempDate || moment().format("YYYY-MM-DD")
  );

  const [event, setEvent] = React.useState([]);
  const [venues, setVenues] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetEventById(params.id);
      if (response.success) {
        setEvent(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const getVenues = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllVenuesByEvent({ date, event: params.id });
      if (response.success) {
        setVenues(response.data);
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

  useEffect(() => {
    getVenues();
  }, [date]);
  return (
    event && (
      <div > 
        {/* event information */}
        <div className="flex justify-between items-center p-2 ">
          {/* my card */}
          <div className="flex justify-between items-center card card2 p-2">
          <div className="p-1 pr-3 ">
            <h1 className="text-2xl uppercase ">
              {event.title} 
            </h1><br></br>
            <h1 className="text-md pb-01">Duration : {event.duration} mins</h1>
            <h1 className="text-md pb-01">
              Date : {moment(event.Date).format("MMM Do yyyy")}
            </h1></div>
            {/* <h1 className="text-md">Genre : {event.genre}</h1> */}
            <div className="p-1 pb-3 pl-3" >
              <br></br>
            <h1 className="text-md pb-1">Select Date</h1>
            <input
              type="date"
              className="p-1"
              min={moment().format("YYYY-MM-DD")}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                navigate(`/event/${params.id}?date=${e.target.value}`);
              }}
            /></div>
          </div>


  <div class="p-2">   
  <div class=" ">
  <div class="">
 
  <img class="img-1 flip-card" src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Vitrivieradp.png" height="110px" width="110px"  alt="Image"></img>
    </div>

  </div> 
</div> 


         


        </div>

        

        {/* event venues */}
        <div className="p-1">
          <center><h1 className="text-xl uppercase">Venues</h1></center>
          
        </div>
        <hr />

        <div className="p-3 flex flex-col gap-3">
          {venues.map((venue) => (
            <div className="card card2 p-3">
              <h1 className="text-md uppercase">{venue.name}</h1>
              {/* <h1 className="text-sm">Address : {venue.address}</h1> */}

              <div className="divider"></div>

              <div className="flex gap-2">
                {venue.shows
                  .sort(
                    (a, b) => moment(a.time, "HH:mm") - moment(b.time, "HH:mm")
                  )
                  .map((show) => (
                    <div
                      className="card p-1 cursor-pointer"
                      onClick={() => {
                        navigate(`/book-show/${show._id}`);
                      }}
                    >
                      <h1 className="text-sm">
                        {moment(show.time, "HH:mm").format("hh:mm A")}
                      </h1>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
}

export default VenuesForEvent;
