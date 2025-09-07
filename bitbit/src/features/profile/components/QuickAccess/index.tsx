import React from "react";
import { useNavigate } from "react-router-dom";
import type { QuickAccessItem } from "../../types";

interface QuickAccessProps {
  items: QuickAccessItem[];
}

export const QuickAccess: React.FC<QuickAccessProps> = ({ items }) => {
  const navigate = useNavigate();

  const handleItemClick = (item: QuickAccessItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.title === "设置") {
      navigate("/profile/settings");
    }
    // 可以根据需要添加其他默认导航逻辑
  };
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-6">快速访问</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item)}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 text-left"
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${item.color}`}
              >
                <span className="text-xl">{item.icon}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* 帮助栏 */}
      <div className="bg-gray-50 rounded-2xl p-6 flex items-center justify-between">
        <p className="text-gray-700 font-medium">
          需要帮助? 联系客服或访问帮助中心
        </p>
        <button className="px-6 py-2 bg-white border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-colors font-medium">
          获取帮助
        </button>
      </div>
    </div>
  );
};
