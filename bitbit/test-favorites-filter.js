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

// 收藏筛选逻辑
const filterFavorites = (item, filters) => {
  // 如果没有任何筛选条件，返回true显示所有项目
  if (!filters || Object.keys(filters).length === 0) {
    return true;
  }

  const typeFilter = filters.type;
  // 如果typeFilter为空字符串、"all"或者未定义，显示所有项目
  if (!typeFilter || typeFilter === "all" || typeFilter === "") {
    return true;
  }

  return String(item.type) === String(typeFilter);
};

console.log("测试收藏筛选:");

// 测试：显示所有
console.log("\n1. 显示所有（无筛选条件）:");
let result = myFavorites.filter((item) => filterFavorites(item, {}));
console.log(`结果数量: ${result.length}`);
result.forEach((item) => console.log(`  - ${item.title} (${item.type})`));

// 测试：筛选活动
console.log("\n2. 筛选活动:");
result = myFavorites.filter((item) =>
  filterFavorites(item, { type: "activity" })
);
console.log(`结果数量: ${result.length}`);
result.forEach((item) => console.log(`  - ${item.title} (${item.type})`));

// 测试：筛选帖子
console.log("\n3. 筛选帖子:");
result = myFavorites.filter((item) => filterFavorites(item, { type: "post" }));
console.log(`结果数量: ${result.length}`);
result.forEach((item) => console.log(`  - ${item.title} (${item.type})`));

// 测试：筛选商品
console.log("\n4. 筛选商品:");
result = myFavorites.filter((item) =>
  filterFavorites(item, { type: "exchange" })
);
console.log(`结果数量: ${result.length}`);
result.forEach((item) => console.log(`  - ${item.title} (${item.type})`));

// 测试：all选项
console.log("\n5. 筛选 'all' 选项:");
result = myFavorites.filter((item) => filterFavorites(item, { type: "all" }));
console.log(`结果数量: ${result.length}`);
result.forEach((item) => console.log(`  - ${item.title} (${item.type})`));
