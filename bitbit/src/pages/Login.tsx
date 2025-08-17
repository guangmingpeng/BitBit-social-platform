import { type FC } from "react";
import { Link } from "react-router-dom";

const Login: FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">登录 BitBit</h2>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              邮箱
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="请输入邮箱"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              密码
            </label>
            <input
              id="password"
              type="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="请输入密码"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              登录
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/register"
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            还没有账号？立即注册
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
