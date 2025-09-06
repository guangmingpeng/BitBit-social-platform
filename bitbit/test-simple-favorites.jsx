// 测试：简化的收藏筛选
import React, { useState, useMemo } from "react";

// 模拟数据
const myFavorites = [
  { id: "2", type: "activity", title: "周末户外烧烤聚会" },
  { id: "1", type: "post", title: "有没有喜欢摄影的朋友？" },
  { id: "1", type: "exchange", title: "iPhone 14 Pro 深空黑 128GB" },
  { id: "3", type: "activity", title: "咖啡品鉴工作坊" },
  { id: "2", type: "post", title: "推荐一本最近看的书《深度工作》" },
];

const SimpleFavorites = () => {
  const [activeFilter, setActiveFilter] = useState("");

  const filteredData = useMemo(() => {
    if (!activeFilter || activeFilter === "all") {
      return myFavorites;
    }
    return myFavorites.filter((item) => item.type === activeFilter);
  }, [activeFilter]);

  return (
    <div>
      <h2>简化的收藏筛选测试</h2>

      {/* 筛选按钮 */}
      <div style={{ marginBottom: "20px" }}>
        {["all", "activity", "post", "exchange"].map((type) => (
          <button
            key={type}
            onClick={() => setActiveFilter(type === "all" ? "" : type)}
            style={{
              marginRight: "10px",
              padding: "5px 10px",
              backgroundColor:
                (!activeFilter && type === "all") || activeFilter === type
                  ? "#007bff"
                  : "#f8f9fa",
              color:
                (!activeFilter && type === "all") || activeFilter === type
                  ? "white"
                  : "black",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            {type === "all"
              ? "全部"
              : type === "activity"
              ? "活动"
              : type === "post"
              ? "帖子"
              : "商品"}
            (
            {type === "all"
              ? myFavorites.length
              : myFavorites.filter((item) => item.type === type).length}
            )
          </button>
        ))}
      </div>

      {/* 当前筛选状态 */}
      <div
        style={{
          marginBottom: "20px",
          padding: "10px",
          backgroundColor: "#f8f9fa",
        }}
      >
        <strong>当前筛选:</strong> {activeFilter || "all"} |
        <strong> 总数:</strong> {myFavorites.length} |<strong> 筛选后:</strong>{" "}
        {filteredData.length}
      </div>

      {/* 结果列表 */}
      <div>
        <h3>筛选结果:</h3>
        {filteredData.map((item) => (
          <div
            key={`${item.type}-${item.id}`}
            style={{
              padding: "10px",
              margin: "5px 0",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
            <strong>{item.title}</strong> -{" "}
            <span style={{ color: "#666" }}>({item.type})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleFavorites;
