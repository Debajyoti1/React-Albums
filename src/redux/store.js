import { configureStore } from "@reduxjs/toolkit";
import { albumReducer } from "./reducers/albumReducer";
import { notificationReducer } from "./reducers/notificationReducer";

// Create the Redux store with multiple reducers
export const store = configureStore({
  reducer: {
    // Define reducers for different parts of the state
    albumReducer, // Example: albums slice reducer
    notificationReducer, // Example: notifications slice reducer
  },
});
