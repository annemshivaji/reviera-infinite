import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { GetAllVenues, UpdateVenue } from "../../apicalls/venues";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { message, Table } from "antd";

function VenuesList() {
  const [venues = [], setVenues] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllVenues();
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

  const handleStatusChange = async (venue) => {
    try {
      dispatch(ShowLoading());
      const response = await UpdateVenue({
        venueId: venue._id,
        ...venue,
        isActive: !venue.isActive,
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
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
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
      title: "Owner",
      dataIndex: "owner",
      render: (text, record) => {
        return record.owner.name;
      },
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
          <div className="flex gap-1">
            {record.isActive && (
                            <Button
                            title="  Block  "
                            type="Button"
                            variant="transparent"
                            onClick={() => {
                              handleStatusChange(record)}
                            }
                          />
            )}
            {!record.isActive && (
                            <Button
                            title="  Approve  "
                            type="Button"
                            variant="transparent"
                            onClick={() => {
                              handleStatusChange(record)}
                            }
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
      <Table columns={columns} dataSource={venues} />
    </div>
  );
}


export default VenuesList;
