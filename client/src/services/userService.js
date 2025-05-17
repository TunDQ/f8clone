import axios from 'axios';

const API_URL = 'http://localhost:9999/blogs';

export const getAllBlogs = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
}