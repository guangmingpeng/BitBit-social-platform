import React, { useState, useEffect } from "react";

interface SecurityLog {
  id: string;
  type:
    | "login"
    | "logout"
    | "password_change"
    | "two_factor_enable"
    | "two_factor_disable"
    | "device_remove";
  description: string;
  ip: string;
  location: string;
  device: string;
  timestamp: string;
  status: "success" | "failed" | "warning";
}

interface SecurityLogsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecurityLogsModal: React.FC<SecurityLogsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [logs, setLogs] = useState<SecurityLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "login" | "security">("all");

  useEffect(() => {
    if (isOpen) {
      loadSecurityLogs();
    }
  }, [isOpen]);

  const loadSecurityLogs = async () => {
    setLoading(true);
    try {
      // TODO: 调用API加载安全日志
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 模拟安全日志数据
      const mockLogs: SecurityLog[] = [
        {
          id: "1",
          type: "login",
          description: "账户登录",
          ip: "192.168.1.100",
          location: "北京, 中国",
          device: "MacBook Pro - Chrome",
          timestamp: "2025-01-07 14:30:25",
          status: "success",
        },
        {
          id: "2",
          type: "password_change",
          description: "密码修改",
          ip: "192.168.1.100",
          location: "北京, 中国",
          device: "MacBook Pro - Chrome",
          timestamp: "2025-01-06 10:15:42",
          status: "success",
        },
        {
          id: "3",
          type: "login",
          description: "账户登录失败",
          ip: "203.0.113.1",
          location: "未知位置",
          device: "Unknown Device",
          timestamp: "2025-01-05 22:45:18",
          status: "failed",
        },
        {
          id: "4",
          type: "two_factor_enable",
          description: "启用两步验证",
          ip: "192.168.1.100",
          location: "北京, 中国",
          device: "iPhone - Safari",
          timestamp: "2025-01-04 16:20:33",
          status: "success",
        },
        {
          id: "5",
          type: "device_remove",
          description: "移除设备",
          ip: "192.168.1.100",
          location: "北京, 中国",
          device: "MacBook Pro - Chrome",
          timestamp: "2025-01-03 09:12:15",
          status: "success",
        },
        {
          id: "6",
          type: "login",
          description: "账户登录",
          ip: "10.0.0.50",
          location: "上海, 中国",
          device: "Windows PC - Edge",
          timestamp: "2025-01-02 13:45:27",
          status: "success",
        },
      ];

      setLogs(mockLogs);
    } catch (error) {
      console.error("加载安全日志失败:", error);
    } finally {
      setLoading(false);
    }
  };

  const getLogIcon = (
    type: SecurityLog["type"],
    status: SecurityLog["status"]
  ) => {
    if (status === "failed") return "❌";
    if (status === "warning") return "⚠️";

    switch (type) {
      case "login":
        return "🔑";
      case "logout":
        return "🚪";
      case "password_change":
        return "🔐";
      case "two_factor_enable":
      case "two_factor_disable":
        return "🛡️";
      case "device_remove":
        return "📱";
      default:
        return "📋";
    }
  };

  const getStatusColor = (status: SecurityLog["status"]) => {
    switch (status) {
      case "success":
        return "text-green-600 bg-green-50";
      case "failed":
        return "text-red-600 bg-red-50";
      case "warning":
        return "text-yellow-600 bg-yellow-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getTypeLabel = (type: SecurityLog["type"]) => {
    switch (type) {
      case "login":
        return "登录";
      case "logout":
        return "退出";
      case "password_change":
        return "密码修改";
      case "two_factor_enable":
        return "启用两步验证";
      case "two_factor_disable":
        return "禁用两步验证";
      case "device_remove":
        return "设备移除";
      default:
        return "其他";
    }
  };

  const filteredLogs = logs.filter((log) => {
    if (filter === "all") return true;
    if (filter === "login") return ["login", "logout"].includes(log.type);
    if (filter === "security")
      return [
        "password_change",
        "two_factor_enable",
        "two_factor_disable",
        "device_remove",
      ].includes(log.type);
    return true;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />

      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">安全日志</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            查看您账户的所有安全相关活动记录，包括登录、密码修改、设备管理等操作。
          </p>

          {/* 筛选器 */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filter === "all"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              全部
            </button>
            <button
              onClick={() => setFilter("login")}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filter === "login"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              登录活动
            </button>
            <button
              onClick={() => setFilter("security")}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filter === "security"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              安全操作
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-500">加载中...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className={`p-4 border rounded-lg ${getStatusColor(
                  log.status
                )} border-current border-opacity-20`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">
                      {getLogIcon(log.type, log.status)}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{log.description}</h3>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-white bg-opacity-50">
                          {getTypeLabel(log.type)}
                        </span>
                      </div>
                      <div className="text-sm opacity-75 mt-1">
                        <p>
                          📍 {log.location} • IP: {log.ip}
                        </p>
                        <p>💻 {log.device}</p>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm opacity-75">{log.timestamp}</span>
                </div>
              </div>
            ))}

            {filteredLogs.length === 0 && (
              <div className="text-center py-8">
                <span className="text-4xl mb-4 block">📋</span>
                <p className="text-gray-500">没有找到相关日志</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">日志说明：</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 安全日志保留最近30天的记录</li>
            <li>• 如发现异常活动，请立即修改密码并启用两步验证</li>
            <li>• 登录失败次数过多会触发账户保护机制</li>
          </ul>
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};
