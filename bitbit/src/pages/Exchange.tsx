import { type FC, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Container, Breadcrumb, Button, ExchangeItem } from "@/components/ui";
import { useNavigationFilters } from "@/shared/hooks/useNavigationStore";

const Exchange: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { exchangeFilters, setExchangeFilters } = useNavigationFilters();

  const [searchTerm, setSearchTerm] = useState(
    exchangeFilters.searchTerm || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    exchangeFilters.category || ""
  );
  const [priceSort, setPriceSort] = useState("");

  // 获取URL中的分类参数
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl && categoryFromUrl !== selectedCategory) {
      setSelectedCategory(categoryFromUrl);
      setExchangeFilters({ category: categoryFromUrl });
    }
  }, [searchParams, selectedCategory, setExchangeFilters]);

  // 处理筛选条件变化
  useEffect(() => {
    setExchangeFilters({
      searchTerm,
      category: selectedCategory,
    });
  }, [searchTerm, selectedCategory, setExchangeFilters]);

  // 模拟二手商品数据
  const exchangeItems = [
    {
      id: "1",
      title: "编程书籍合集",
      condition: "95%新",
      category: "图书",
      price: 120,
      image: "https://picsum.photos/300/200?random=books1",
      icon: "📚",
    },
    {
      id: "2",
      title: "MacBook Pro 2020",
      condition: "90%新",
      category: "电子产品",
      price: 8800,
      image: "https://picsum.photos/300/200?random=laptop",
      icon: "💻",
    },
    {
      id: "3",
      title: "单反相机",
      condition: "85%新",
      category: "电子产品",
      price: 3200,
      image: "https://picsum.photos/300/200?random=camera",
      icon: "📷",
    },
    {
      id: "4",
      title: "运动鞋",
      condition: "95%新",
      category: "服装",
      price: 280,
      image: "https://picsum.photos/300/200?random=shoes",
      icon: "👟",
    },
  ];

  const breadcrumbItems = [
    { label: "首页", href: "/" },
    { label: "二手交换", current: true },
  ];

  return (
    <Container size="lg" className="py-6 space-y-6">
      {/* 面包屑导航 */}
      <div className="flex items-center justify-between">
        <Breadcrumb items={breadcrumbItems} />
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          返回首页
        </Button>
      </div>

      <h1 className="text-3xl font-bold text-text-primary">二手交换</h1>

      {/* 筛选和搜索 */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="搜索商品..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm px-3 py-2 border focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm px-3 py-2 border focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          >
            <option value="">全部分类</option>
            <option value="图书">图书</option>
            <option value="电子产品">电子产品</option>
            <option value="服装">服装</option>
            <option value="其他">其他</option>
          </select>
          <select
            value={priceSort}
            onChange={(e) => setPriceSort(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm px-3 py-2 border focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          >
            <option value="">价格排序</option>
            <option value="asc">价格从低到高</option>
            <option value="desc">价格从高到低</option>
          </select>
          <Button variant="primary" className="flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            发布商品
          </Button>
        </div>

        {/* 筛选标签 */}
        {(searchTerm || selectedCategory) && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm text-text-secondary">当前筛选:</span>
            {selectedCategory && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-100 text-primary-700">
                {selectedCategory}
                <button
                  onClick={() => setSelectedCategory("")}
                  className="ml-1 hover:text-primary-900"
                >
                  ×
                </button>
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("");
                setPriceSort("");
              }}
              className="text-text-secondary hover:text-text-primary"
            >
              清除筛选
            </Button>
          </div>
        )}
      </div>

      {/* 商品网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {exchangeItems.length > 0 ? (
          exchangeItems.map((item) => (
            <ExchangeItem
              key={item.id}
              {...item}
              onClick={() => navigate(`/exchange/${item.id}`)}
              onExchange={() => console.log(`交换商品: ${item.title}`)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-text-primary mb-2">
              没有找到符合条件的商品
            </h3>
            <p className="text-text-secondary">
              试试调整筛选条件或{" "}
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                  setPriceSort("");
                }}
                className="text-primary-500 hover:text-primary-600"
              >
                清除筛选
              </button>
            </p>
          </div>
        )}
      </div>

      {/* 分页器 */}
      {exchangeItems.length > 0 && (
        <div className="flex justify-center">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              上一页
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              1
            </button>
            <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              下一页
            </button>
          </nav>
        </div>
      )}
    </Container>
  );
};

export default Exchange;
