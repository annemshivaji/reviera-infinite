import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { Col, Form, Row, Table, message } from "antd";
import {GetVenueById } from "../../apicalls/venues";
import { GetAllEvents } from "../../apicalls/events";
import Button from "../../components/Button";
import {
  AddShow,
  DeleteShow,
  GetAllShowsByVenue,
} from "../../apicalls/venues";


function Venueshows() {
  // // get date from query string
  // const tempDate = new URLSearchParams(window.location.search).get("date");
  // const [date, setDate] = React.useState(
  //   tempDate || moment().format("YYYY-MM-DD")
  // );
  const [view, setView] = React.useState("table");
  const [shows, setShows] = React.useState([]);
  const [events, setEvents] = React.useState([]);
  const [venue, setVenue] = React.useState([]);
  const [Venueshows, setVenueshows] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const eventsResponse = await GetAllEvents();
      if (eventsResponse.success) {
        setEvents(eventsResponse.data);
      } else {
        message.error(eventsResponse.message);
      }
      const response = await GetVenueById(params.id);
      if (response.success) {
        setVenue(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const getVenueshows = async () => {
    try {
      dispatch(ShowLoading());
      const showsResponse = await GetAllShowsByVenue({
        venueId: params.id,
      });
      if (showsResponse.success) {
        setVenueshows(showsResponse.data);
      } else {
        message.error(showsResponse.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  // const getVenueshows = async () => {
  //   try {
  //     dispatch(ShowLoading());
  //     const response = await GetAllVenueshowsByEvent({venue: params.id });
  //     if (response.success) {
  //       setVenueshows(response.data);
  //     } else {
  //       message.error(response.message);
  //     }
  //     dispatch(HideLoading());
  //   } catch (error) {
  //     dispatch(HideLoading());
  //     message.error(error.message);
  //   }
  // };

  const handleAddShow = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await AddShow({
        ...values,
        venue: params.id,
      });
      if (response.success) {
        message.success(response.message);
        getVenueshows();
        setView("table");
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  const handleDelete = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await DeleteShow({ showId: id });

      if (response.success) {
        message.success(response.message);
        getVenueshows();
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  const columns = [
    {
      title: "Show Name",
      dataIndex: "name",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => {
        return moment(text).format("MMM Do YYYY");
      },
    },
    {
      title: "Time",
      dataIndex: "time",
    },
    {
      title: "Event",
      dataIndex: "event",
      render: (text, record) => {
        return record.event.title;
      },
    },
    {
      title: "Ticket Price",
      dataIndex: "ticketPrice",
    },
    {
      title: "Total Seats",
      dataIndex: "totalSeats",
    },
    {
      title: "Available Seats",
      dataIndex: "availableSeats",
      render: (text, record) => {
        return record.totalSeats - record.bookedSeats.length;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-1 items-center">
            {record.bookedSeats.length === 0 && (
              <i
                className="ri-delete-bin-fill"
                style={{ color: "#a03008" }}
                onClick={() => {
                  handleDelete(record._id);
                }}
              ></i>
            )}
          </div>
        );
      },
    },
  ];



  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getVenueshows();
  }, []);
  return (
    venue && (
      <div > 
        <br></br>
         <h1 className="text-primary justify-center text-2xl  mb-1">
        VENUE  :  {venue.name}
      </h1>
      <hr></hr>
      
      <div className="flex p-1 pb-3 pt-3 justify-center mt-1 mb-1 items-center">
        {view === "table" && (
          <Button
            title="Add Show"
            onClick={() => {
              setView("form");
            }}
          />
        )}
      </div>

      {view === "table" && <div className="p-5"><Table columns={columns} dataSource={Venueshows} /></div>}

      {view === "form" && (
        <Form layout="vertical" onFinish={handleAddShow}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Show Name"
                name="name"
                rules={[{ required: true, message: "Please input show name!" }]}
              >
                <input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Please input show date!" }]}
              >
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                />
              </Form.Item>
            </Col>



            <Col span={6}>
              <Form.Item
                label="Event"
                name="event"
                rules={[{ required: true, message: "Please select event!" }]}
              >
                <select>
                  <option value="">Select Event</option>
                  {events.map((event) => (
                    <option value={event._id}>{event.title}</option>
                  ))}
                </select>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="Time"
                name="time"
                rules={[{ required: true, message: "Please input show time!" }]}
              >
                <input type="time" />
              </Form.Item>
            </Col>



            <Col span={6}>
              <Form.Item
                label="Total Seats"
                name="totalSeats"
                rules={[
                  { required: true, message: "Please input total seats!" },
                ]}
              >
                <input type="number" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="Ticket Price"
                name="ticketPrice"
                rules={[
                  { required: true, message: "Please input ticket price!" },
                ]}
              >
                <input type="number" />
              </Form.Item>
            </Col>
          </Row>

          <div className="flex justify-end gap-1">
            <Button
              variant="outlined"
              title="Cancel"
              onClick={() => {
                setView("table");
              }}
            />
            <Button variant="contained" title="SAVE" type="submit" />
          </div>
        </Form>
      )}
  
        </div>

    )
  );
}

export default Venueshows;




  // const dispatch = useDispatch();







     




