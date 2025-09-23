import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import type { AppDispatch } from "@/store";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout as logoutAction,
  clearError,
  selectAuth,
  selectIsAuthenticated,
  selectUser,
  selectAuthLoading,
  selectAuthError,
} from "@/store/slices/authSlice";
import { AuthService } from "../services/authService";
import type { LoginData, RegisterData } from "../types/auth.types";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector(selectAuth);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const login = useCallback(
    async (data: LoginData) => {
      try {
        dispatch(loginStart());
        const response = await AuthService.login(data);
        dispatch(loginSuccess(response));
        return response;
      } catch (error) {
        const message = error instanceof Error ? error.message : "登录失败";
        dispatch(loginFailure(message));
        throw error;
      }
    },
    [dispatch]
  );

  const register = useCallback(
    async (data: RegisterData) => {
      try {
        dispatch(registerStart());
        const response = await AuthService.register(data);
        dispatch(registerSuccess(response));
        return response;
      } catch (error) {
        const message = error instanceof Error ? error.message : "注册失败";
        dispatch(registerFailure(message));
        throw error;
      }
    },
    [dispatch]
  );

  const wechatLogin = useCallback(async () => {
    try {
      dispatch(loginStart());
      const response = await AuthService.wechatLogin();
      dispatch(loginSuccess(response));
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : "微信登录失败";
      dispatch(loginFailure(message));
      throw error;
    }
  }, [dispatch]);

  const logout = useCallback(async () => {
    try {
      await AuthService.logout();
      dispatch(logoutAction());
    } catch (error) {
      console.error("Logout error:", error);
      // 即使出错也要清除本地状态
      dispatch(logoutAction());
    }
  }, [dispatch]);

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    // 状态
    auth,
    isAuthenticated,
    user,
    loading,
    error,

    // 方法
    login,
    register,
    wechatLogin,
    logout,
    clearError: clearAuthError,
  };
};
