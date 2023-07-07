import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import VenueForm from "./VenueForm";
import {
  DeleteVenue,
  //GetAllVenues,
  GetAllVenuesByOwner,
} from "../../apicalls/venues";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { message, Table } from "antd";
import Shows from "./Shows";


function VenuesList() {
  const { user } = useSelector((state) => state.users);
  const [showVenueFormModal = false, setShowVenueFormModal] =
    useState(false);
  const [selectedVenue = null, setSelectedVenue] = useState(null);
  const [formType = "add", setFormType] = useState("add");
  const [venues = [], setVenues] = useState([]);
  const [openShowsModal = false, setOpenShowsModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllVenuesByOwner({
        owner: user._id,
      });
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

  const handleDelete = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await DeleteVenue({ venueId: id });
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
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "RegNo",
      dataIndex: "regno",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (text, record) => {
        if (text) {
          return "Approved";
        } else {
          return "Pending / Blocked";
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-2 items-center">

            <i
              className="ri-pencil-fill"
              style={{ color: "#58880c" }}
              onClick={() => {
                setFormType("edit");
                setSelectedVenue(record);
                setShowVenueFormModal(true);
              }}
            ></i>

            <i
              className="ri-delete-bin-fill"
              style={{ color: "#a03008" }}
              onClick={() => {
                handleDelete(record._id);
              }}
            ></i>

            {record.isActive && (
              <Button
                title="  Shows  "
                type="Button"
                variant="transparent"
                onClick={() => {
                setSelectedVenue(record); 
                setOpenShowsModal(true);
                }}
              />

            )}
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
          title="ADD"
          onClick={() => {
            setFormType("add");
            setShowVenueFormModal(true);
          }}
        />
      </div>
      <br></br>

      <div className="p-6"><Table 
      columns={columns}
      dataSource={venues}
       /></div>

      {showVenueFormModal && (
        <VenueForm
          showVenueFormModal={showVenueFormModal}
          setShowVenueFormModal={setShowVenueFormModal}
          formType={formType}
          setFormType={setFormType}
          selectedVenue={selectedVenue}
          setSelectedVenue={setSelectedVenue}
          getData={getData}
        />
      )}
     
     {openShowsModal && (
        <Shows
          openShowsModal={openShowsModal}
          setOpenShowsModal={setOpenShowsModal}
          venue={selectedVenue}
        />
      )}
    </div>
  );
}


export default VenuesList;
