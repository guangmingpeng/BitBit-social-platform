import React, { useState, useEffect } from "react";

interface Device {
  id: string;
  name: string;
  type: "desktop" | "mobile" | "tablet";
  browser: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

interface DeviceManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  devices: Device[];
  onDeviceRemove: (deviceId: string) => void;
}

export const DeviceManagementModal: React.FC<DeviceManagementModalProps> = ({
  isOpen,
  onClose,
  devices: initialDevices,
  onDeviceRemove,
}) => {
  const [devices, setDevices] = useState<Device[]>(initialDevices);
  const [loading, setLoading] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      // 模拟加载设备列表
      const mockDevices: Device[] = [
        {
          id: "1",
          name: "MacBook Pro",
          type: "desktop",
          browser: "Chrome 120.0",
          location: "北京, 中国",
          lastActive: "当前活动",
          isCurrent: true,
        },
        {
          id: "2",
          name: "iPhone 15",
          type: "mobile",
          browser: "Safari Mobile",
          location: "北京, 中国",
          lastActive: "2小时前",
          isCurrent: false,
        },
        {
          id: "3",
          name: "Windows PC",
          type: "desktop",
          browser: "Edge 120.0",
          location: "上海, 中国",
          lastActive: "1天前",
          isCurrent: false,
        },
      ];
      setDevices(mockDevices);
    }
  }, [isOpen]);

  const getDeviceIcon = (type: Device["type"]) => {
    switch (type) {
      case "desktop":
        return "💻";
      case "mobile":
        return "📱";
      case "tablet":
        return "📺";
      default:
        return "💻";
    }
  };

  const handleRemoveDevice = async (deviceId: string) => {
    if (devices.find((d) => d.id === deviceId)?.isCurrent) {
      return; // 不能移除当前设备
    }

    setLoading(true);
    setSelectedDevice(deviceId);

    try {
      // TODO: 调用API移除设备
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setDevices((prev) => prev.filter((d) => d.id !== deviceId));
      onDeviceRemove(deviceId);
    } catch (error) {
      console.error("移除设备失败:", error);
    } finally {
      setLoading(false);
      setSelectedDevice(null);
    }
  };

  const handleRemoveAllOthers = async () => {
    const otherDevices = devices.filter((d) => !d.isCurrent);
    if (otherDevices.length === 0) return;

    setLoading(true);

    try {
      // TODO: 调用API移除所有其他设备
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setDevices((prev) => prev.filter((d) => d.isCurrent));
      otherDevices.forEach((device) => onDeviceRemove(device.id));
    } catch (error) {
      console.error("移除所有设备失败:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />

      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">设备管理</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            这里显示了所有登录您账户的设备。如果发现不认识的设备，请立即移除并修改密码。
          </p>

          {devices.filter((d) => !d.isCurrent).length > 0 && (
            <button
              onClick={handleRemoveAllOthers}
              disabled={loading}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors text-sm"
            >
              {loading ? "移除中..." : "移除所有其他设备"}
            </button>
          )}
        </div>

        <div className="space-y-4">
          {devices.map((device) => (
            <div
              key={device.id}
              className={`p-4 border rounded-lg ${
                device.isCurrent
                  ? "bg-green-50 border-green-200"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{getDeviceIcon(device.type)}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900">
                        {device.name}
                      </h3>
                      {device.isCurrent && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                          当前设备
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{device.browser}</p>
                    <p className="text-sm text-gray-500">
                      📍 {device.location} • {device.lastActive}
                    </p>
                  </div>
                </div>

                {!device.isCurrent && (
                  <button
                    onClick={() => handleRemoveDevice(device.id)}
                    disabled={loading && selectedDevice === device.id}
                    className="px-3 py-1 text-red-600 hover:bg-red-50 rounded transition-colors text-sm disabled:opacity-50"
                  >
                    {loading && selectedDevice === device.id
                      ? "移除中..."
                      : "移除"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {devices.length === 0 && (
          <div className="text-center py-8">
            <span className="text-4xl mb-4 block">📱</span>
            <p className="text-gray-500">没有找到登录设备</p>
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">安全提醒：</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 定期检查登录设备，移除不认识的设备</li>
            <li>• 在公共设备上使用后记得退出登录</li>
            <li>• 发现异常活动请立即修改密码</li>
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
