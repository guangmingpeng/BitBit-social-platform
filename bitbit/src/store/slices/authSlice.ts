import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  phone: string;
  nickname: string;
  avatar?: string;
  interests?: string[];
  createdAt: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// 从 localStorage 初始化状态
const getInitialState = (): AuthState => {
  try {
    const savedAuth = localStorage.getItem("bitbit_auth");
    if (savedAuth) {
      const parsed = JSON.parse(savedAuth);
      return {
        token: parsed.token || null,
        user: parsed.user || null,
        isAuthenticated: !!parsed.token && !!parsed.user,
        loading: false,
        error: null,
      };
    }
  } catch (error) {
    console.error("Failed to parse auth from localStorage:", error);
  }

  return {
    token: null,
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  };
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ token: string; user: User }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;

      // 持久化到 localStorage
      try {
        localStorage.setItem(
          "bitbit_auth",
          JSON.stringify({
            token: action.payload.token,
            user: action.payload.user,
          })
        );
      } catch (error) {
        console.error("Failed to save auth to localStorage:", error);
      }
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (
      state,
      action: PayloadAction<{ token: string; user: User }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;

      // 持久化到 localStorage
      try {
        localStorage.setItem(
          "bitbit_auth",
          JSON.stringify({
            token: action.payload.token,
            user: action.payload.user,
          })
        );
      } catch (error) {
        console.error("Failed to save auth to localStorage:", error);
      }
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;

      // 清除 localStorage
      try {
        localStorage.removeItem("bitbit_auth");
      } catch (error) {
        console.error("Failed to remove auth from localStorage:", error);
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };

        // 更新 localStorage
        try {
          const savedAuth = localStorage.getItem("bitbit_auth");
          if (savedAuth) {
            const parsed = JSON.parse(savedAuth);
            localStorage.setItem(
              "bitbit_auth",
              JSON.stringify({
                ...parsed,
                user: state.user,
              })
            );
          }
        } catch (error) {
          console.error("Failed to update user in localStorage:", error);
        }
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
  clearError,
  updateUser,
} = authSlice.actions;

export const authReducer = authSlice.reducer;

// Selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectAuthLoading = (state: { auth: AuthState }) =>
  state.auth.loading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
