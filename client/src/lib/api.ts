import axios from "axios";

import { getServerURL } from "@/lib/utils";

export const getLatexString = async (imageUrl: string) => {
  const serverURL = getServerURL();

  try {
    const response = await axios.post(`${serverURL}/api/extract-text`, {
      imageUrl,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
