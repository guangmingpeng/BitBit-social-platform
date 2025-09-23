import type {
  LoginData,
  RegisterData,
  AuthResponse,
  VerificationCodeResponse,
  User,
} from "../types/auth.types";

// Mock 用户数据存储
const MOCK_USERS = new Map<string, User>();

// 生成Mock用户ID
const generateUserId = (): string => {
  return "user_" + Math.random().toString(36).substr(2, 9);
};

// 生成Mock JWT Token
const generateToken = (userId: string): string => {
  return "mock_token_" + userId + "_" + Date.now();
};

// 模拟网络延迟
const delay = (ms: number = 1000): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// 手机号验证
const validatePhone = (phone: string): boolean => {
  return /^1[3-9]\d{9}$/.test(phone);
};

// 验证码验证（Mock - 任意4-6位数字都有效）
const validateVerificationCode = (code: string): boolean => {
  return /^\d{4,6}$/.test(code);
};

// 昵称验证
const validateNickname = (nickname: string): boolean => {
  return nickname.length >= 2 && nickname.length <= 20;
};

// 密码验证
const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

export class AuthService {
  // 发送验证码
  static async sendVerificationCode(
    phone: string
  ): Promise<VerificationCodeResponse> {
    await delay(500);

    if (!validatePhone(phone)) {
      throw new Error("请输入正确的手机号码");
    }

    // Mock: 总是成功
    return {
      success: true,
      message: "验证码已发送",
      countdown: 60,
    };
  }

  // 登录
  static async login(data: LoginData): Promise<AuthResponse> {
    await delay(1500);

    // 验证手机号
    if (!validatePhone(data.phone)) {
      throw new Error("请输入正确的手机号码");
    }

    // 验证验证码
    if (!validateVerificationCode(data.verificationCode)) {
      throw new Error("请输入4-6位验证码");
    }

    // 查找或创建用户
    let user = MOCK_USERS.get(data.phone);
    if (!user) {
      // 如果用户不存在，创建一个新用户（模拟首次登录）
      user = {
        id: generateUserId(),
        phone: data.phone,
        nickname: `用户${data.phone.slice(-4)}`,
        avatar: "",
        interests: [],
        createdAt: new Date().toISOString(),
      };
      MOCK_USERS.set(data.phone, user);
    }

    const token = generateToken(user.id);

    return {
      token,
      user,
    };
  }

  // 注册
  static async register(data: RegisterData): Promise<AuthResponse> {
    await delay(2000);

    // 验证手机号
    if (!validatePhone(data.phone)) {
      throw new Error("请输入正确的手机号码");
    }

    // 验证验证码
    if (!validateVerificationCode(data.verificationCode)) {
      throw new Error("请输入4-6位验证码");
    }

    // 验证昵称
    if (!validateNickname(data.nickname)) {
      throw new Error("昵称长度应为2-20个字符");
    }

    // 验证密码
    if (!validatePassword(data.password)) {
      throw new Error("密码至少8位");
    }

    // 验证确认密码
    if (data.password !== data.confirmPassword) {
      throw new Error("两次输入的密码不一致");
    }

    // 验证用户协议
    if (!data.agreeToTerms) {
      throw new Error("请同意用户服务协议和隐私政策");
    }

    // 检查手机号是否已注册
    if (MOCK_USERS.has(data.phone)) {
      throw new Error("该手机号已注册，请直接登录");
    }

    // 创建新用户
    const user: User = {
      id: generateUserId(),
      phone: data.phone,
      nickname: data.nickname,
      avatar: "",
      interests: data.interests || [],
      createdAt: new Date().toISOString(),
    };

    MOCK_USERS.set(data.phone, user);

    const token = generateToken(user.id);

    return {
      token,
      user,
    };
  }

  // 第三方登录（微信）
  static async wechatLogin(): Promise<AuthResponse> {
    await delay(1500);

    // Mock微信登录：生成一个随机用户
    const randomPhone = `138${Math.floor(Math.random() * 100000000)
      .toString()
      .padStart(8, "0")}`;
    const user: User = {
      id: generateUserId(),
      phone: randomPhone,
      nickname: `微信用户${Math.floor(Math.random() * 1000)}`,
      avatar: "",
      interests: ["music", "food"],
      createdAt: new Date().toISOString(),
    };

    MOCK_USERS.set(randomPhone, user);

    const token = generateToken(user.id);

    return {
      token,
      user,
    };
  }

  // 登出
  static async logout(): Promise<void> {
    await delay(500);
    // Mock: 总是成功
  }

  // 获取当前用户信息
  static async getCurrentUser(token: string): Promise<User> {
    await delay(300);

    // 从token中提取用户ID（简单的mock实现）
    const parts = token.split("_");
    if (parts.length < 3) {
      throw new Error("Invalid token");
    }

    const userId = parts[2];

    // 查找用户
    for (const user of MOCK_USERS.values()) {
      if (user.id === userId) {
        return user;
      }
    }

    throw new Error("User not found");
  }
}

// 表单验证辅助函数
export const validateForm = {
  phone: (phone: string): string | undefined => {
    if (!phone) return "请输入手机号码";
    if (!validatePhone(phone)) return "请输入正确的手机号码";
    return undefined;
  },

  verificationCode: (code: string): string | undefined => {
    if (!code) return "请输入验证码";
    if (!validateVerificationCode(code)) return "请输入4-6位验证码";
    return undefined;
  },

  nickname: (nickname: string): string | undefined => {
    if (!nickname) return "请输入昵称";
    if (!validateNickname(nickname)) return "昵称长度应为2-20个字符";
    return undefined;
  },

  password: (password: string): string | undefined => {
    if (!password) return "请输入密码";
    if (!validatePassword(password)) return "密码至少8位";
    return undefined;
  },

  confirmPassword: (
    password: string,
    confirmPassword: string
  ): string | undefined => {
    if (!confirmPassword) return "请确认密码";
    if (password !== confirmPassword) return "两次输入的密码不一致";
    return undefined;
  },
};
