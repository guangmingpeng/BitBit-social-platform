import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authReducer } from "./slices/authSlice";
import { uiReducer } from "./slices/uiSlice";
import { userReducer } from "./slices/userSlice";
import { settingsReducer } from "./slices/settingsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    user: userReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these paths in the state
        ignoredActions: ["persist/PERSIST"],
        ignoredPaths: ["ui.toast"],
      },
    }),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
