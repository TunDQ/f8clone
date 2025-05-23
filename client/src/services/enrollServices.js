import axios from "axios";

const API_URL = "http://localhost:9999/enrolls";

export const getAllEnrollCourse = async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching enrollCourse:", error);
      throw error;
    }
  };

  export const getEnrollCourseByUser = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching enrolls by user:", error);
      throw error;
    }
  };
  