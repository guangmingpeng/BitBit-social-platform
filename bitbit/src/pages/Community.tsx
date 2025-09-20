import { type FC } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@/components/ui";
import {
  CommunityHeader,
  CommunitySearch,
  CategorySidebar,
  CommunitySidebar,
  PostList,
} from "@/features/community/components";
import { FloatingBackButton } from "@/components/common";
import { useCommunity } from "@/features/community/hooks";

const Community: FC = () => {
  const navigate = useNavigate();
  const {
    searchTerm,
    selectedCategory,
    selectedTag,
    sortBy,
    loading,
    posts,
    hotTags,
    handleSearchChange,
    handleCategoryChange,
    handleSortChange,
    handleTagChange,
    handleClearFilters,
  } = useCommunity();

  return (
    <Container size="lg" className="py-6 space-y-6">
      {/* 页面头部 */}
      <CommunityHeader />

      <h1 className="text-3xl font-bold text-text-primary">社区</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 左侧边栏 - 分类和排序 */}
        <CategorySidebar
          selectedCategory={selectedCategory}
          sortBy={sortBy}
          onCategoryChange={handleCategoryChange}
          onSortChange={handleSortChange}
          className="lg:col-span-1"
        />

        {/* 主内容区 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 搜索和发帖 */}
          <CommunitySearch
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            selectedTag={selectedTag}
            onSearchChange={handleSearchChange}
            onClearFilters={handleClearFilters}
          />

          {/* 帖子列表 */}
          <PostList
            posts={posts}
            loading={loading}
            onTagClick={handleTagChange}
          />
        </div>

        {/* 右侧边栏 - 推荐内容 */}
        <CommunitySidebar
          className="lg:col-span-1"
          hotTags={hotTags}
          selectedTag={selectedTag}
          onTagChange={handleTagChange}
        />
      </div>

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

export default Community;
