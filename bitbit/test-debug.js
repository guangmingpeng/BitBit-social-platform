// 测试收藏筛选逻辑
const myFavorites = [
  {
    id: "2",
    type: "activity",
    title: "周末户外烧烤聚会",
    favoriteTime: "3天前",
  },
  {
    id: "1",
    type: "post",
    title: "有没有喜欢摄影的朋友？",
    favoriteTime: "1周前",
  },
  {
    id: "1",
    type: "exchange",
    title: "iPhone 14 Pro 深空黑 128GB",
    favoriteTime: "5天前",
  },
  {
    id: "3",
    type: "activity",
    title: "咖啡品鉴工作坊",
    favoriteTime: "1天前",
  },
  {
    id: "2",
    type: "post",
    title: "推荐一本最近看的书《深度工作》",
    favoriteTime: "2周前",
  },
];

// 模拟筛选函数
const filterFavorites = (item, filters) => {
  console.log("filterFavorites called:", {
    item: { id: item.id, title: item.title, type: item.type },
    filters,
    filtersKeys: Object.keys(filters),
    filtersLength: Object.keys(filters).length,
  });

  // 如果没有任何筛选条件，返回true显示所有项目
  if (!filters || Object.keys(filters).length === 0) {
    console.log("No filters, returning true");
    return true;
  }

  const typeFilter = filters.type;
  console.log("Type filter:", typeFilter, "Item type:", item.type);

  // 如果typeFilter为空字符串、"all"或者未定义，显示所有项目
  if (!typeFilter || typeFilter === "all" || typeFilter === "") {
    console.log("Type filter is all/empty, returning true");
    return true;
  }

  const result = String(item.type) === String(typeFilter);
  console.log("Filter result:", result);
  return result;
};

console.log("=== 测试收藏筛选 ===");

// 测试1：无筛选条件
console.log("\n1. 无筛选条件:");
let result = myFavorites.filter((item) => filterFavorites(item, {}));
console.log(`结果数量: ${result.length}`);

// 测试2：空字符串筛选
console.log("\n2. 空字符串筛选:");
result = myFavorites.filter((item) => filterFavorites(item, { type: "" }));
console.log(`结果数量: ${result.length}`);

// 测试3：筛选活动
console.log("\n3. 筛选活动:");
result = myFavorites.filter((item) =>
  filterFavorites(item, { type: "activity" })
);
console.log(`结果数量: ${result.length}`);
result.forEach((item) => console.log(`  - ${item.title} (${item.type})`));

// 测试4：筛选帖子
console.log("\n4. 筛选帖子:");
result = myFavorites.filter((item) => filterFavorites(item, { type: "post" }));
console.log(`结果数量: ${result.length}`);
result.forEach((item) => console.log(`  - ${item.title} (${item.type})`));

// 测试5：筛选商品
console.log("\n5. 筛选商品:");
result = myFavorites.filter((item) =>
  filterFavorites(item, { type: "exchange" })
);
console.log(`结果数量: ${result.length}`);
result.forEach((item) => console.log(`  - ${item.title} (${item.type})`));
