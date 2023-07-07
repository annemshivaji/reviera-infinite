const { axiosInstance } = require(".");

// Add a new event
export const AddEvent = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/events/add-event", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

// get all events
export const GetAllEvents = async () => {
    try {
        const response = await axiosInstance.get("/api/events/get-all-events");
        return response.data;
    } catch (error) {
        return error.response;
    }
}

// update a event
export const UpdateEvent = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/events/update-event", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

// delete a event
export const DeleteEvent = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/events/delete-event", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

// get a event by id
export const GetEventById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/events/get-event-by-id/${id}`);
        return response.data;
    } catch (error) {
        return error.response;
    }
}
