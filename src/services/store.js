import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice, apiSliceWithRefresh } from "./apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [apiSliceWithRefresh.reducerPath]: apiSliceWithRefresh.reducer,
  },
  middleware: (gDM) =>
    gDM({
      thunk: {
        extraArgument: apiSlice.middleware,
      },
      serializableCheck: false,
    }).concat([apiSlice.middleware, apiSliceWithRefresh.middleware]),
  devTools: true,
});

setupListeners(store.dispatch);

export default store;
