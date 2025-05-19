import axios from "axios";

const API_URL = "http://localhost:9999/courses";

export const getAllCourse = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};
