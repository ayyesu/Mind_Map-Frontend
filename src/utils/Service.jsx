import axios from "axios";

export const baseUrl = "https://mind-map-api.onrender.com";

// GET request
export const getRequest = async (url) => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    console.log("response", response);
    if (response.status !== 200) {
      let message;
      if (data?.message) {
        message = data.message;
      } else {
        message = data;
      }
      return { error: true, message };
    }
    return data;
  } catch (error) {
    return {
      error: "Something happened fetching data, Our team will be working on it",
    };
  }
};

// Post Request
export const postRequest = async (url, body) => {
  try {
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status.error) {
      let message;
      if (response.data?.message) {
        message = response.data.message;
      } else {
        message = "An error occurred";
      }
      return { error: true, message };
    }
    return response.data;
  } catch (error) {
    console.error("An error occurred making the request:", error);
    return { error: true, message: error.response.data.message };
  }
};

// File Posting Request
export const filePostRequest = async (url, formData) => {
  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("form data response", response);

    let message;
    if (response.status !== 200) {
      if (response.data?.message) {
        message = response.data.message;
      } else {
        message = "An error occurred";
      }
      return { error: true, message };
    }

    return response.data;
  } catch (error) {
    console.error("An error occurred making the request:", error);
    return {
      error: true,
      message: error.response.data.message || "An error occurred",
    };
  }
};

// Delete Request
export const deleteRequest = async (url) => {
  try {
    const response = await axios.delete(url);
    const data = response.data;

    if (response.status !== 200) {
      let message;
      if (data?.message) {
        message = data.message;
      } else {
        message = data;
      }
      return { error: true, message };
    }
    return data;
  } catch (error) {
    return {
      error: "Something happened fetching data, Our team will be working on it",
    };
  }
};

// Update Request
export const updateRequest = async (url, body) => {
  try {
    const response = await axios.patch(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      let message;
      if (response.data?.message) {
        message = response.data.message;
      } else {
        message = "An error occurred";
      }
      return { error: true, message };
    }
    return response.data;
  } catch (error) {
    console.error("An error occurred making the request:", error);
    return { error: true, message: error.response.data.message };
  }
};
