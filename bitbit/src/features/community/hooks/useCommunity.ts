import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigationFilters } from "@/shared/hooks/useNavigationStore";

export interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    isVerified: boolean;
  };
  content: string;
  images?: string[];
  category: "learning" | "food" | "music" | "reading";
  tags?: string[]; // 添加标签字段
  publishTime: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
}

export const useCommunity = () => {
  const [searchParams] = useSearchParams();
  const { communityFilters, setCommunityFilters } = useNavigationFilters();

  const [searchTerm, setSearchTerm] = useState(
    communityFilters.searchTerm || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    communityFilters.category || ""
  );
  const [selectedTag, setSelectedTag] = useState(""); // 添加标签筛选状态
  const [sortBy, setSortBy] = useState(communityFilters.sortBy || "latest");
  const [loading] = useState(false);

  // 模拟社区数据
  const mockPosts: CommunityPost[] = [
    {
      id: "1",
      author: {
        name: "摄影爱好者小李",
        avatar: "https://picsum.photos/40/40?random=7",
        isVerified: true,
      },
      content:
        "今天参加了一个很棒的摄影活动，学到了很多技巧！大家有没有推荐的摄影课程？想继续提升自己的技能。",
      images: [
        "https://picsum.photos/400/300?random=photo1",
        "https://picsum.photos/400/300?random=photo2",
      ],
      category: "learning",
      tags: ["摄影技巧", "摄影课程", "学习"],
      publishTime: "1小时前",
      likes: 24,
      comments: 12,
      shares: 3,
      isLiked: false,
    },
    {
      id: "2",
      author: {
        name: "美食达人",
        avatar: "https://picsum.photos/40/40?random=8",
        isVerified: false,
      },
      content:
        "分享一下昨天做的意大利面，味道超棒！有兴趣的朋友可以一起来学习制作～",
      images: ["https://picsum.photos/400/300?random=pasta"],
      category: "food",
      tags: ["意大利面", "美食制作", "料理"],
      publishTime: "3小时前",
      likes: 18,
      comments: 8,
      shares: 5,
      isLiked: true,
    },
    {
      id: "3",
      author: {
        name: "读书分享者",
        avatar: "https://picsum.photos/40/40?random=9",
        isVerified: true,
      },
      content:
        "最近读了《原则》这本书，收获很大！推荐给大家，特别是关于思维模式的部分。",
      category: "reading",
      tags: ["读书分享", "思维模式", "成长"],
      publishTime: "5小时前",
      likes: 32,
      comments: 15,
      shares: 8,
      isLiked: false,
    },
    {
      id: "4",
      author: {
        name: "音乐爱好者",
        avatar: "https://picsum.photos/40/40?random=10",
        isVerified: false,
      },
      content: "分享一首最近很喜欢的歌，《夜空中最亮的星》，每次听都很有感触。",
      category: "music",
      tags: ["音乐分享", "情感", "夜空"],
      publishTime: "6小时前",
      likes: 15,
      comments: 6,
      shares: 3,
      isLiked: true,
    },
    {
      id: "5",
      author: {
        name: "技术博主",
        avatar: "https://picsum.photos/40/40?random=11",
        isVerified: true,
      },
      content:
        "刚完成了一个React项目，用到了很多新技术，想和大家分享一下学习心得。",
      category: "learning",
      tags: ["编程", "React", "技术分享"],
      publishTime: "8小时前",
      likes: 45,
      comments: 20,
      shares: 12,
      isLiked: false,
    },
  ];

  // 获取URL中的分类参数
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl && categoryFromUrl !== selectedCategory) {
      setSelectedCategory(categoryFromUrl);
      setCommunityFilters({ category: categoryFromUrl });
    }
  }, [searchParams, selectedCategory, setCommunityFilters]);

  // 处理筛选条件变化
  useEffect(() => {
    setCommunityFilters({
      searchTerm,
      category: selectedCategory,
      sortBy,
    });
  }, [searchTerm, selectedCategory, sortBy, setCommunityFilters]);

  // 筛选帖子
  const filteredPosts = mockPosts.filter((post) => {
    const matchesSearch = searchTerm
      ? post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchesCategory = selectedCategory
      ? post.category === selectedCategory
      : true;

    const matchesTag = selectedTag
      ? post.tags?.some((tag) => tag.includes(selectedTag))
      : true;

    return matchesSearch && matchesCategory && matchesTag;
  });

  // 计算热门标签
  const getHotTags = () => {
    const tagCount: Record<string, number> = {};

    mockPosts.forEach((post) => {
      post.tags?.forEach((tag) => {
        tagCount[tag] = (tagCount[tag] || 0) + post.likes + post.comments;
      });
    });

    return Object.entries(tagCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([name, count]) => ({ name, count }));
  };

  // 排序帖子
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.likes - a.likes;
      case "comments":
        return b.comments - a.comments;
      case "latest":
      default:
        return 0; // 在实际应用中，这里应该按时间排序
    }
  });

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedTag("");
  };

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag);
  };

  return {
    // State
    searchTerm,
    selectedCategory,
    selectedTag,
    sortBy,
    loading,
    posts: sortedPosts,
    hotTags: getHotTags(),

    // Actions
    handleSearchChange,
    handleCategoryChange,
    handleSortChange,
    handleTagChange,
    handleClearFilters,
  };
};
