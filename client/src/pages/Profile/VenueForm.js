import { Form, message, Modal } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddVenue, UpdateVenue } from "../../apicalls/venues";
import Button from "../../components/Button";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import Shows from "./Shows";


function VenueForm({
  showVenueFormModal,
  setShowVenueFormModal,
  formType,
  setFormType,
  selectedVenue,
  setSelectedVenue,
  getData,
}) {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    values.owner = user._id;
    try {
      dispatch(ShowLoading());
      let response = null;
      if (formType === "add") {
        response = await AddVenue(values);
      } else {
        values.venueId = selectedVenue._id;
        response = await UpdateVenue(values);
      }

      if (response.success) {
        message.success(response.message);
        setShowVenueFormModal(false);
        setSelectedVenue(null);
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

  return (
    <Modal
      title={formType === "add" ? "ADD VENUE" : "EDIT"}
      open={showVenueFormModal}
      onCancel={() => {
        setShowVenueFormModal(false);
        setSelectedVenue(null);
      }}
      footer={null}
    >
      <Form
        // layout="vertical"
        onFinish={onFinish}
        initialValues={selectedVenue}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter the venue name!" }]}
        >
          <input type="text" />
        </Form.Item>

        <Form.Item
          label="Floor"
          name="address"
          rules={[{ required: true, message: "Please enter the venue Floor!" }]}
        >
          <textarea type="text" />
        </Form.Item>

        <Form.Item
          label="Register number"
          name="regno"
          rules={[
            { required: true, message: "Please enter your Register number!" },
          ]}
        >
          <input type="text" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter venue email!" }]}
        >
          <input type="text" />
        </Form.Item>
        <div className="flex justify-end gap-1">
          <Button
            title="Cancel"
           
            type="button"
            onClick={() => {
              setShowVenueFormModal(false);
              setSelectedVenue(null);
            }}
          />
          <Button title="Save"  variant="outlined" type="submit" />
        </div>
      </Form>
    </Modal>
  );
}

export default VenueForm;
