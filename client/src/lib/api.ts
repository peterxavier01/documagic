import axios from "axios";

export const getLatexString = async (imageUrl: string) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/extract-text",
      { imageUrl }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
