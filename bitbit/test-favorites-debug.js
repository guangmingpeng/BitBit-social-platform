// 测试收藏数据结构
const { myFavorites } = require("./src/shared/data/profileMockData.ts");

console.log("=== 收藏数据调试 ===");
console.log("总数量:", myFavorites.length);
console.log("");

myFavorites.forEach((item, index) => {
  console.log(`第${index + 1}项:`);
  console.log("  ID:", item.id);
  console.log("  类型:", item.type);
  console.log("  标题:", item.title);
  console.log("  作者:", item.author?.name);
  console.log("");
});

console.log("=== 按类型分组统计 ===");
const typeStats = {};
myFavorites.forEach((item) => {
  const type = item.type;
  typeStats[type] = (typeStats[type] || 0) + 1;
});

Object.entries(typeStats).forEach(([type, count]) => {
  console.log(`${type}: ${count}个`);
});

console.log("");
console.log("=== 筛选测试 ===");

// 测试筛选"exchange"类型
const exchangeItems = myFavorites.filter(
  (item) => String(item.type) === "exchange"
);
console.log('筛选"exchange"后的结果:');
exchangeItems.forEach((item) => {
  console.log(`  - ${item.title} (类型: ${item.type})`);
});

// 测试筛选"post"类型
const postItems = myFavorites.filter((item) => String(item.type) === "post");
console.log('筛选"post"后的结果:');
postItems.forEach((item) => {
  console.log(`  - ${item.title} (类型: ${item.type})`);
});

// 测试筛选"activity"类型
const activityItems = myFavorites.filter(
  (item) => String(item.type) === "activity"
);
console.log('筛选"activity"后的结果:');
activityItems.forEach((item) => {
  console.log(`  - ${item.title} (类型: ${item.type})`);
});
