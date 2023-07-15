import { axiosInstance } from ".";

// Add a new venue
export const AddVenue = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/venues/add-venue",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// get all venues
export const GetAllVenues = async () => {
  try {
    const response = await axiosInstance.get("/api/venues/get-all-venues");
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// get all venues by owner
export const GetAllVenuesByOwner = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/venues/get-all-venues-by-owner",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// update venue
export const UpdateVenue = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/venues/update-venue",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// delete venue
export const DeleteVenue = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/venues/delete-venue",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// add show
export const AddShow = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/venues/add-show",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// delete show
export const DeleteShow = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/venues/delete-show",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// get all venues for a event
export const GetAllVenuesByEvent = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/venues/get-all-venues-by-event",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};


// get show by id
export const GetShowById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/venues/get-show-by-id",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
}

// get a venue by id
export const GetVenueById = async (id) => {
  try {
      const response = await axiosInstance.get(`/api/venues/get-venue-by-id/${id}`);
      return response.data;
  } catch (error) {
      return error.response;
  }
}


// get all shows
export const GetAllShowsByVenue = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/venues/get-all-shows-by-venue",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};
