import React, { useEffect } from "react";
import Button from "../../components/Button";
import EventForm from "./EventForm";
import moment from "moment";
import { message, Table } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { DeleteEvent, GetAllEvents } from "../../apicalls/events";


function EventsList() {
  const [events, setEvents] = React.useState([]);
  const [showEventFormModal, setShowEventFormModal] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [formType, setFormType] = React.useState("add");
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllEvents();
      if (response.success) {
        setEvents(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      dispatch(ShowLoading());
      const response = await DeleteEvent({
        eventId,
      });
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Poster",
      dataIndex: "poster",
      render: (text, record) => {
        return ( 
          <div className="p-1">
         <img
            src={record.poster}
            alt="poster"
            height="150"
            width="160"
            className="br-1 br flip-card"
          /></div>

        );
      },
    },

    {
      title: "Name",
      dataIndex: "title",
    },

    {
      title: "Description",
      dataIndex: "description",
    },

    {
      title: "Organiser",
      dataIndex: "organiser",
    },

    {
      title: "Duration",
      dataIndex: "duration",
    },

    {
      title: "Language",
      dataIndex: "language",
    },
    {
      title: "Date",
      dataIndex: "Date",
      render: (text, record) => {
        return moment(record.Date).format("DD-MM-YYYY");
      },
    },
    {
      title: "Edit / Delete",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-2">
            <i
              className="ri-pencil-fill"
              style={{ color: "#58880c" }}
              onClick={() => {
                setSelectedEvent(record);
                setFormType("edit");
                setShowEventFormModal(true);
              }}

            ></i>
            <i
              className="ri-delete-bin-fill"
              style={{ color: "#a03008" }}
              onClick={() => {
                handleDelete(record._id);
              }}
            ></i>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);


  return (
    <div>
      <br></br>
      <div className="flex justify-center mb-1">

        <Button
          title="  ADD  "
          type="Button"
          onClick={() => {
            setShowEventFormModal(true);
            setFormType("add");
          }}
        />
      </div>
      <br></br>

      <div className="p-5"><Table columns={columns} dataSource={events} /></div>

      {showEventFormModal && (
        <EventForm
          showEventFormModal={showEventFormModal}
          setShowEventFormModal={setShowEventFormModal}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          formType={formType}
          getData={getData}
        />
      )}
    </div>
  );
}

export default EventsList;
