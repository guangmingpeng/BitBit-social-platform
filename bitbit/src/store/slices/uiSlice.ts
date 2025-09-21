import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  theme: "light" | "dark";
  sidebarOpen: boolean;
  toast: {
    show: boolean;
    message: string;
    type: "success" | "error" | "info" | "warning";
  };
}

const initialState: UiState = {
  theme: "light",
  sidebarOpen: false,
  toast: {
    show: false,
    message: "",
    type: "info",
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    showToast: (
      state,
      action: PayloadAction<Omit<UiState["toast"], "show">>
    ) => {
      state.toast = {
        ...action.payload,
        show: true,
      };
    },
    hideToast: (state) => {
      state.toast.show = false;
    },
  },
});

export const { toggleTheme, toggleSidebar, showToast, hideToast } =
  uiSlice.actions;
export const uiReducer = uiSlice.reducer;
