import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);

      let newBasket = [...state.items];

      index >= 0
        ? newBasket.splice(index, 1)
        : console.warn(
            `Can't remove product {id: ${action.payload.id}} as its not in basket`
          );

      state.items = newBasket;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions;

// All Selected Items Quantity In the Basket
export const selectBasketItems = (state) => state.basket.items;

// Each Selected Item Quantity In the Basket
// export const selectBasketItemsWithEachItemId = (state, id) =>
//   state.basket.items.filter((item) => item.id === id);

// Total Price of all Selected Items
// export const selectBasketItemsTotalPrice = (state) =>
//   state.basket.items.reduce((totalPr, eachItem) => (totalPr += eachItem.price), 0);

export default basketSlice.reducer;
