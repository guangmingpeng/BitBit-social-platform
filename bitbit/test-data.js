import { getExchangeItemById } from "../src/shared/data/exchangeItems";

// 测试商品数据获取
console.log("测试 exchange-1:", getExchangeItemById("exchange-1"));
console.log("测试 exchange-2:", getExchangeItemById("exchange-2"));
console.log("测试普通商品 1:", getExchangeItemById("1"));
