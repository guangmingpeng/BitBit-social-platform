import {
  PASSWORD_MIN_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
} from "../config/constants";

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return (
    password.length >= PASSWORD_MIN_LENGTH &&
    /[A-Z]/.test(password) && // 至少一个大写字母
    /[a-z]/.test(password) && // 至少一个小写字母
    /[0-9]/.test(password) && // 至少一个数字
    /[!@#$%^&*]/.test(password) // 至少一个特殊字符
  );
};

export const isValidUsername = (username: string): boolean => {
  return (
    username.length >= USERNAME_MIN_LENGTH &&
    username.length <= USERNAME_MAX_LENGTH &&
    /^[a-zA-Z0-9_-]+$/.test(username)
  );
};

export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^1[3-9]\d{9}$/; // 中国大陆手机号格式
  return phoneRegex.test(phone);
};

export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const stripHtml = (html: string): string => {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};
