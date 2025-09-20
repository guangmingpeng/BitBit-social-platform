import { type FC, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Container,
  Breadcrumb,
  Button,
  Icon,
  ExchangeModal,
  PurchaseModal,
} from "@/components/ui";
import { ExchangeCard } from "@/features/exchange";
import { FloatingBackButton } from "@/components/common";
import { navigateToChatFromExchange } from "@/features/chat/utils";
import { useNavigationFilters } from "@/shared/hooks/useNavigationStore";
import {
  getAllExchangeItems,
  getItemsByCategory,
  searchItems,
} from "@/shared/data/exchangeItems";

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
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  // 模态框状态
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    id: string;
    title: string;
    image: string;
    price: number;
    seller: { name: string; avatar: string; rating: number };
  } | null>(null);

  // 分类选项
  const categories = [
    { id: "", name: "全部" },
    { id: "数码产品", name: "数码产品" },
    { id: "服装", name: "服装" },
    { id: "家居", name: "家居" },
    { id: "图书", name: "书籍" },
    { id: "家电", name: "家电" },
    { id: "其他", name: "其他" },
  ];

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

  // 获取筛选后的商品数据
  const getFilteredItems = () => {
    let items = getAllExchangeItems();

    // 按分类筛选
    if (selectedCategory) {
      items = getItemsByCategory(selectedCategory);
    }

    // 按搜索词筛选
    if (searchTerm) {
      items = searchItems(searchTerm);
      // 如果同时有分类筛选，需要进一步过滤
      if (selectedCategory) {
        items = items.filter((item) => item.category === selectedCategory);
      }
    }

    // 按价格排序
    if (priceSort === "asc") {
      items = items.sort((a, b) => a.price - b.price);
    } else if (priceSort === "desc") {
      items = items.sort((a, b) => b.price - a.price);
    }

    return items;
  };

  const exchangeItems = getFilteredItems();

  // 处理联系卖家
  const handleContact = (item: (typeof exchangeItems)[0]) => {
    const sellerId = `seller-${item.id}`;
    navigateToChatFromExchange(
      navigate,
      sellerId,
      {
        name: item.seller.name,
        avatar: item.seller.avatar,
      },
      {
        id: item.id,
        title: item.title,
      }
    );
  };

  // 处理交换
  const handleExchange = (item: (typeof exchangeItems)[0]) => {
    setSelectedItem({
      id: item.id,
      title: item.title,
      image: item.image || "https://picsum.photos/400/400?random=default",
      price: item.price,
      seller: {
        name: item.seller.name,
        avatar:
          item.seller.avatar || "https://picsum.photos/40/40?random=seller",
        rating: item.seller.rating,
      },
    });
    setShowExchangeModal(true);
  };

  const breadcrumbItems = [
    { label: "首页", href: "/" },
    { label: "二手交换", current: true },
  ];

  return (
    <Container size="lg" className="py-6 space-y-6">
      {/* 面包屑导航 */}
      <div className="flex items-center justify-between">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* 页面标题和描述 */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-text-primary">二手交换</h1>
        <p className="text-text-secondary">
          发现优质二手好物，安全便捷的交换平台
        </p>
      </div>

      {/* 分类筛选标签 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  flex-shrink-0 px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200
                  ${
                    selectedCategory === category.id
                      ? "bg-primary-500 text-white shadow-md"
                      : "bg-white text-text-secondary border border-gray-200 hover:bg-gray-50"
                  }
                `}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* 排序和布局切换 */}
          <div className="flex items-center gap-2">
            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value)}
              className="rounded-2xl border-gray-200 shadow-sm px-3 py-2 border text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            >
              <option value="">最新发布</option>
              <option value="asc">价格从低到高</option>
              <option value="desc">价格从高到低</option>
            </select>

            {/* 布局切换按钮 */}
            <div className="flex rounded-2xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setLayout("grid")}
                className={`
                  w-8 h-8 flex items-center justify-center text-sm transition-all
                  ${
                    layout === "grid"
                      ? "bg-primary-500 text-white"
                      : "bg-white text-text-secondary hover:bg-gray-50"
                  }
                `}
              >
                <Icon name="grid" size="xs" />
              </button>
              <button
                onClick={() => setLayout("list")}
                className={`
                  w-8 h-8 flex items-center justify-center text-sm transition-all
                  ${
                    layout === "list"
                      ? "bg-primary-500 text-white"
                      : "bg-white text-text-secondary hover:bg-gray-50"
                  }
                `}
              >
                <Icon name="list" size="xs" />
              </button>
            </div>
          </div>
        </div>

        {/* 搜索栏和发布按钮 */}
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="搜索商品..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border-gray-200 shadow-sm px-4 py-3 border focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
          </div>
          <Button
            variant="primary"
            size="lg"
            className="flex items-center gap-2 px-6"
            onClick={() => navigate("/exchange/publish")}
          >
            <Icon name="plus" size="sm" />
            发布商品
          </Button>
        </div>

        {/* 筛选标签 */}
        {(searchTerm || selectedCategory) && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary">当前筛选:</span>
            {selectedCategory && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-primary-100 text-primary-700">
                {categories.find((c) => c.id === selectedCategory)?.name}
                <button
                  onClick={() => setSelectedCategory("")}
                  className="ml-2 hover:text-primary-900"
                >
                  ×
                </button>
              </span>
            )}
            {searchTerm && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                "{searchTerm}"
                <button
                  onClick={() => setSearchTerm("")}
                  className="ml-2 hover:text-gray-900"
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

      {/* 商品展示区域 */}
      <div
        className={
          layout === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-6"
        }
      >
        {exchangeItems.length > 0 ? (
          exchangeItems.map((item) => (
            <ExchangeCard
              key={item.id}
              {...item}
              layout={layout}
              onClick={() => navigate(`/exchange/${item.id}`)}
              onExchange={() => handleExchange(item)}
              onContact={() => handleContact(item)}
              onLike={() => console.log(`收藏商品: ${item.title}`)}
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
            <button className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              上一页
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-primary-500 text-sm font-medium text-white">
              1
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              3
            </button>
            <button className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              下一页
            </button>
          </nav>
        </div>
      )}

      {/* 交换模态框 */}
      {selectedItem && (
        <ExchangeModal
          open={showExchangeModal}
          onClose={() => {
            setShowExchangeModal(false);
            setSelectedItem(null);
          }}
          item={selectedItem}
          onConfirm={(data) => {
            console.log("交换请求数据:", data);
            // 这里可以调用API发送交换请求
          }}
        />
      )}

      {/* 购买模态框 */}
      {selectedItem && (
        <PurchaseModal
          open={showPurchaseModal}
          onClose={() => {
            setShowPurchaseModal(false);
            setSelectedItem(null);
          }}
          item={selectedItem}
          onConfirm={(data) => {
            console.log("购买请求数据:", data);
            // 这里可以调用API发送购买请求
          }}
        />
      )}

      {/* 返回首页浮动按钮 */}
      <FloatingBackButton
        text="返回首页"
        onClick={() => navigate("/")}
        variant="elegant"
        size="md"
      />
    </Container>
  );
};

export default Exchange;
