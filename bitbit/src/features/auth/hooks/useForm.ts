import { useState, useCallback } from "react";
import { validateForm } from "../services/authService";
import type { FormErrors, LoginData, RegisterData } from "../types/auth.types";

// 登录表单Hook
export const useLoginForm = () => {
  const [formData, setFormData] = useState<LoginData>({
    phone: "",
    verificationCode: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = useCallback(
    (field: keyof LoginData, value: string | boolean | undefined) => {
      switch (field) {
        case "phone":
          return typeof value === "string"
            ? validateForm.phone(value)
            : "请输入手机号码";
        case "verificationCode":
          return typeof value === "string"
            ? validateForm.verificationCode(value)
            : "请输入验证码";
        default:
          return undefined;
      }
    },
    []
  );

  const updateField = useCallback(
    (field: keyof LoginData, value: string | boolean) => {
      setFormData((prev) => ({ ...prev, [field]: value }));

      // 实时验证
      if (touched[field]) {
        const error = validateField(field, value);
        setErrors((prev) => ({ ...prev, [field]: error }));
      }
    },
    [validateField, touched]
  );

  const touchField = useCallback(
    (field: keyof LoginData) => {
      setTouched((prev) => ({ ...prev, [field]: true }));

      const value = formData[field];
      if (value !== undefined) {
        const error = validateField(field, value);
        setErrors((prev) => ({ ...prev, [field]: error }));
      }
    },
    [formData, validateField]
  );

  const validateAll = useCallback(() => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // 验证所有字段
    const fieldsToValidate: Array<keyof LoginData> = [
      "phone",
      "verificationCode",
    ];

    fieldsToValidate.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field as keyof FormErrors] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(
      fieldsToValidate.reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    return isValid;
  }, [formData, validateField]);

  const reset = useCallback(() => {
    setFormData({
      phone: "",
      verificationCode: "",
      rememberMe: false,
    });
    setErrors({});
    setTouched({});
  }, []);

  return {
    formData,
    errors,
    touched,
    updateField,
    touchField,
    validateAll,
    reset,
  };
};

// 注册表单Hook
export const useRegisterForm = () => {
  const [formData, setFormData] = useState<RegisterData>({
    phone: "",
    verificationCode: "",
    nickname: "",
    password: "",
    confirmPassword: "",
    interests: [],
    agreeToTerms: false,
    acceptMarketing: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = useCallback(
    (
      field: keyof RegisterData,
      value: string | boolean | string[] | undefined,
      allData?: RegisterData
    ) => {
      const data = allData || formData;

      switch (field) {
        case "phone":
          return typeof value === "string"
            ? validateForm.phone(value)
            : "请输入手机号码";
        case "verificationCode":
          return typeof value === "string"
            ? validateForm.verificationCode(value)
            : "请输入验证码";
        case "nickname":
          return typeof value === "string"
            ? validateForm.nickname(value)
            : "请输入昵称";
        case "password":
          return typeof value === "string"
            ? validateForm.password(value)
            : "请输入密码";
        case "confirmPassword":
          return typeof value === "string"
            ? validateForm.confirmPassword(data.password, value)
            : "请确认密码";
        case "agreeToTerms":
          return typeof value === "boolean" && value
            ? undefined
            : "请同意用户服务协议和隐私政策";
        default:
          return undefined;
      }
    },
    [formData]
  );

  const updateField = useCallback(
    (field: keyof RegisterData, value: string | boolean | string[]) => {
      const newData = { ...formData, [field]: value };
      setFormData(newData);

      // 实时验证
      if (touched[field]) {
        const error = validateField(field, value, newData);
        setErrors((prev) => ({ ...prev, [field]: error }));
      }

      // 如果是密码字段，同时验证确认密码
      if (field === "password" && touched.confirmPassword) {
        const confirmError = validateField(
          "confirmPassword",
          newData.confirmPassword,
          newData
        );
        setErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
      }
    },
    [formData, validateField, touched]
  );

  const touchField = useCallback(
    (field: keyof RegisterData) => {
      setTouched((prev) => ({ ...prev, [field]: true }));

      const value = formData[field];
      if (value !== undefined) {
        const error = validateField(field, value);
        setErrors((prev) => ({ ...prev, [field]: error }));
      }
    },
    [formData, validateField]
  );

  const validateAll = useCallback(() => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // 验证所有字段
    const fieldsToValidate: Array<keyof RegisterData> = [
      "phone",
      "verificationCode",
      "nickname",
      "password",
      "confirmPassword",
      "agreeToTerms",
    ];

    fieldsToValidate.forEach((field) => {
      const value = formData[field];
      const error = validateField(field, value);
      if (error) {
        newErrors[field as keyof FormErrors] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(
      fieldsToValidate.reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    return isValid;
  }, [formData, validateField]);

  const reset = useCallback(() => {
    setFormData({
      phone: "",
      verificationCode: "",
      nickname: "",
      password: "",
      confirmPassword: "",
      interests: [],
      agreeToTerms: false,
      acceptMarketing: false,
    });
    setErrors({});
    setTouched({});
  }, []);

  return {
    formData,
    errors,
    touched,
    updateField,
    touchField,
    validateAll,
    reset,
  };
};
