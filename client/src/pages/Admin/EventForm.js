import React from "react";
import { Col, Form, message, Modal, Row } from "antd";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { AddEvent, UpdateEvent } from "../../apicalls/events";
import moment from "moment";

function EventForm({
  showEventFormModal,
  setShowEventFormModal,
  selectedEvent,
  setSelectedEvent,
  formType,
  getData,
}) {

  if (selectedEvent) {
    selectedEvent.Date = moment(selectedEvent.Date).format(
      "YYYY-MM-DD"
    );
  }

  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response = null;

      if (formType === "add") {
        response = await AddEvent(values);
      } else {
        response = await UpdateEvent({
          ...values,
          eventId: selectedEvent._id,
        });

      }

      if (response.success) {
        getData();
        message.success(response.message);
        setShowEventFormModal(false);
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
      title={formType === "add" ? "ADD EVENT" : "EDIT EVENT"}
      open={showEventFormModal}
      onCancel={() => {
        setShowEventFormModal(false);
        setSelectedEvent(null);
      }}
      footer={null}
      width={600}
    >
      <Form layout="vertical" onFinish={onFinish} initialValues={selectedEvent}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Event Name" name="title">
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Event Description" name="description">
              <textarea type="text" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Event Organiser" name="organiser">
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Event Duration (Min)" name="duration">
              <input type="number" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Language" name="language">
              <select name="" id="">
                <option value="">Select Language</option>
                <option value="Telugu">Telugu</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Tamil">Tamil</option>
              </select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Event Date" name="Date">
              <input type="date" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Poster URL" name="poster">
              <input type="text" />
            </Form.Item>
          </Col>
        </Row>

        <div className="flex justify-end gap-1">
          <Button
            title="Cancel"
            
            type="button"
            onClick={() => {
              setShowEventFormModal(false);
              setSelectedEvent(null);
            }}
          />
          <Button title="Save" variant="outlined" type="submit" />
        </div>
      </Form>
    </Modal>
  );
}

export default EventForm;
