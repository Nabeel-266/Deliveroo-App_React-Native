import { createSelector } from "reselect";

export const selectedBasketItems = (state) => state?.basket.items;

export const selectBasketItemsWithEachItemId = createSelector(
  selectedBasketItems,
  (_, id) => id,
  (items, id) => items.filter((item) => item.id === id)
);

export const selectBasketItemsTotalPrice = createSelector(selectedBasketItems, (items) =>
  items.reduce((totalPr, eachItem) => (totalPr += eachItem.price), 0)
);
