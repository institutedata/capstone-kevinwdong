import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: {
    name: "",
    lat: 0,
    lng: 0,
  },
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      const { name, lat, lng } = action.payload;
      state.name = name;
      state.lat = lat;
      state.lng = lng;
    },
    clearLocation: (state) => {
      state.location = {
        name: "",
        lat: 0,
        lng: 0,
      };
    },
  },
});

export const {setLocation, clearLocation} = locationSlice.actions;

export default locationSlice.reducer;
