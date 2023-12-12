import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurant: {
    id: null,
    image: null,
    title: null,
    ratings: null,
    genre: null,
    address: null,
    short_description: null,
    dishes: null,
    lng: null,
    lat: null,
  },
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRestaurant } = restaurantSlice.actions;

// Each Selected Restaurant
export const selectRestaurant = (state) => state.restaurant.restaurant;

export default restaurantSlice.reducer;
