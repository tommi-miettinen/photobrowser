import { createSlice } from "@reduxjs/toolkit";
import type { ImagesState, AppDispatch, Image } from "../../types/types";
import axios from "axios";

const initialState: ImagesState = {
  images: [],
  loaded: false,
  error: false,
};

export const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setImages: (state, { payload }: { payload: Image[] }) => {
      state.images = state.images.concat(payload);
    },
    setLoaded: (state) => {
      state.loaded = true;
    },
    setError: (state, { payload }: { payload: boolean }) => {
      state.error = payload;
    },
  },
});

export const fetchImages =
  (albumId: number) => async (dispatch: AppDispatch) => {
    try {
      const apiUrl = `https://jsonplaceholder.typicode.com/album/${albumId}/photos`;
      const result = await axios.get(apiUrl);
      dispatch(setImages(result.data));
      dispatch(setError(false));
    } catch (err) {
      dispatch(setError(true));
    }
  };

export const { setImages, setLoaded, setError } = imagesSlice.actions;

export default imagesSlice.reducer;
