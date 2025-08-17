import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
  language: "zh" | "en";
  notifications: {
    email: boolean;
    push: boolean;
    activities: boolean;
    messages: boolean;
  };
  privacy: {
    profileVisibility: "public" | "private" | "friends";
    showOnlineStatus: boolean;
  };
}

const initialState: SettingsState = {
  language: "zh",
  notifications: {
    email: true,
    push: true,
    activities: true,
    messages: true,
  },
  privacy: {
    profileVisibility: "public",
    showOnlineStatus: true,
  },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<SettingsState["language"]>) => {
      state.language = action.payload;
    },
    updateNotificationSettings: (
      state,
      action: PayloadAction<Partial<SettingsState["notifications"]>>
    ) => {
      state.notifications = {
        ...state.notifications,
        ...action.payload,
      };
    },
    updatePrivacySettings: (
      state,
      action: PayloadAction<Partial<SettingsState["privacy"]>>
    ) => {
      state.privacy = {
        ...state.privacy,
        ...action.payload,
      };
    },
  },
});

export const {
  setLanguage,
  updateNotificationSettings,
  updatePrivacySettings,
} = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;
