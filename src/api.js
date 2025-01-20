import axios from "axios";
import { isRecentlyAdded, getTime } from "./utils/dateUtils";

export const addWords = async (newWords) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const promises = newWords.map((item) =>
      //base url should be in .env file
      // call api in loop since mockapi doesn't accept array so i send word by word
      axios.post(
        "https://67880bd2c4a42c9161092912.mockapi.io/api/v1/words",
        item,
      ),
    );
    await Promise.all(promises);
    return newWords;
  } catch (error) {
    throw error;
  }
};

export const deleteWord = async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(
      `https://67880bd2c4a42c9161092912.mockapi.io/api/v1/words/${id}`,
    );
    return response.data;
  } catch (error) {
    alert("Error deleting word:", error);
    return rejectWithValue(
      error.response?.data || error.message || "Error deleting word",
    );
  }
};

export const fetchWords = async () => {
  const response = await axios.get(
    "https://67880bd2c4a42c9161092912.mockapi.io/api/v1/words",
  );

  return response.data.map((word) => ({
    ...word,
    RecentlyAdded: isRecentlyAdded(word.CreationTime),
  }));
};

export const updateWord = async (updatedWord, { rejectWithValue }) => {
  try {
    const response = await axios.put(
      `https://67880bd2c4a42c9161092912.mockapi.io/api/v1/words/${updatedWord.id}`,
      { ...updatedWord, LastModificationTime: getTime(new Date()) },
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Error updating word");
  }
};
