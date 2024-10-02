import axios from "axios";

import { getServerURL } from "@/lib/utils";
import { useAPIProgressStore } from "@/hooks/use-api-progress";

export const getTextString = async (imageUrl: string) => {
  const serverURL = getServerURL();

  const setLoading = useAPIProgressStore.getState().setLoading;
  const setProgress = useAPIProgressStore.getState().setProgress;
  const setProgressText = useAPIProgressStore.getState().setProgressText;
  const incrementProgress = useAPIProgressStore.getState().incrementProgress;

  try {
    setLoading(true);
    setProgress(0);

    // Simulate a progress update every 100ms
    const interval = setInterval(() => {
      incrementProgress(); // Increment progress until 90%
    }, 100);

    const response = await axios.post(`${serverURL}/api/extract-text`, {
      imageUrl,
    });

    setProgressText("Extracting text...");
    clearInterval(interval);
    setProgress(100);
    setLoading(false);

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    setLoading(false);
  }
};

export const getLatexString = async (imageUrl: string) => {
  const serverURL = getServerURL();

  try {
    const response = await axios.post(`${serverURL}/api/extract-equation`, {
      imageUrl,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
