import { type FC, useMemo, useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Button } from "@/components/ui";
import { FloatingBackButton } from "@/components/common";
import { useSmartNavigation } from "@/shared/hooks/useSmartNavigation";
import PostDetailContent from "@/features/community/components/PostDetail/PostDetailContent";
import PostDetailComments from "@/features/community/components/PostDetail/PostDetailComments";
import PostDetailRecommendations from "@/features/community/components/PostDetail/PostDetailRecommendations";

const PostDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { smartGoBack, navigateWithSource } = useSmartNavigation();
  const commentInputRef = useRef<HTMLInputElement>(null);
  const [showAllComments, setShowAllComments] = useState(false);
  const [viewHistory, setViewHistory] = useState<string[]>([]);

  // 当ID变化时重置状态并更新浏览历史
  useEffect(() => {
    setShowAllComments(false);

    // 更新浏览历史
    const currentId = id || "1";
    setViewHistory((prev) => {
      const newHistory = prev.filter((historyId) => historyId !== currentId);
      return [currentId, ...newHistory].slice(0, 5); // 最多保存5个历史记录
    });

    // 滚动到页面顶部
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // 根据ID获取不同的帖子数据
  const getPostData = (postId: string) => {
    const posts = {
      "1": {
        id: "1",
        author: {
          name: "嘉丽",
          avatar: "https://picsum.photos/64/64?random=author",
          isVerified: false,
          isFollowing: false,
        },
        content: `有没有喜欢摄影的朋友？周末一起去西湖拍照呀，顺便可以交流后期技巧~

春天的西湖应该很美，樱花也开了，可以拍人像也可以拍风景。我准备了一些拍摄点位和时间安排，感兴趣的朋友一起来吧！`,
        images: [
          "https://picsum.photos/400/400?random=1",
          "https://picsum.photos/400/400?random=2",
          "https://picsum.photos/400/400?random=3",
          "https://picsum.photos/400/400?random=4",
          "https://picsum.photos/400/400?random=5",
          "https://picsum.photos/400/400?random=6",
          "https://picsum.photos/400/400?random=7",
          "https://picsum.photos/400/400?random=8",
          "https://picsum.photos/400/400?random=9",
          "https://picsum.photos/400/400?random=10",
        ],
        category: "摄影",
        publishTime: "2小时前",
        location: "📍 杭州西湖区",
        likes: 89,
        comments: 23,
        shares: 12,
        views: 156,
        isLiked: true,
        isBookmarked: false,
        activity: {
          title: "📅 拍摄活动安排",
          time: "本周六上午 9:00-12:00",
          location: "西湖莲花广场集合",
          participants: "8/15人",
          fee: "免费 (自带器材)",
        },
      },
      "2": {
        id: "2",
        author: {
          name: "文轩",
          avatar: "https://picsum.photos/64/64?random=author2",
          isVerified: true,
          isFollowing: false,
        },
        content: `推荐一本最近看的书《深度工作》，讲述如何在信息爆炸的时代保持专注。

书中的理念对提高工作效率很有帮助，特别是对于需要长时间集中注意力的工作。作者从心理学和神经科学的角度分析了专注力的重要性。`,
        images: [
          "https://picsum.photos/400/300?random=book1",
          "https://picsum.photos/400/300?random=book2",
        ],
        category: "读书",
        publishTime: "5小时前",
        location: "📍 在线分享",
        likes: 45,
        comments: 18,
        shares: 6,
        views: 89,
        isLiked: false,
        isBookmarked: true,
        // 这个帖子没有活动
      },
      rec1: {
        id: "rec1",
        author: {
          name: "文轩",
          avatar: "https://picsum.photos/64/64?random=rec1author",
          isVerified: false,
          isFollowing: false,
        },
        content:
          "春日摄影技巧分享，如何拍出更好的人像照片，掌握光线运用和构图技巧。今天分享一些实用的摄影心得，希望对大家有帮助！",
        images: ["https://picsum.photos/400/300?random=rec1photo"],
        category: "学习",
        publishTime: "1天前",
        location: "📍 摄影工作室",
        likes: 128,
        comments: 45,
        shares: 15,
        views: 256,
        isLiked: false,
        isBookmarked: false,
        // 这个帖子没有活动
      },
      rec2: {
        id: "rec2",
        author: {
          name: "李摄",
          avatar: "https://picsum.photos/64/64?random=rec2author",
          isVerified: true,
          isFollowing: true,
        },
        content:
          "西湖樱花最佳拍摄点推荐，这些地方绝对能拍出大片感觉！准备了详细的拍摄攻略和最佳时间段。",
        images: ["https://picsum.photos/400/300?random=rec2photo"],
        category: "学习",
        publishTime: "2天前",
        location: "📍 杭州西湖",
        likes: 234,
        comments: 67,
        shares: 28,
        views: 445,
        isLiked: false,
        isBookmarked: true,
        activity: {
          title: "📅 西湖樱花拍摄团",
          time: "本周日下午 2:00-5:00",
          location: "西湖断桥集合",
          participants: "12/20人",
          fee: "￥50 (含茶点)",
        },
      },
      "3": {
        id: "3",
        author: {
          name: "旅行达人",
          avatar: "https://picsum.photos/64/64?random=author3",
          isVerified: true,
          isFollowing: false,
        },
        content: `杭州周边小众拍摄地推荐，人少景美，非常适合周末去放松~

最近发现了几个杭州周边的绝美拍摄地，风景超棒而且人很少。分享给喜欢摄影和旅行的朋友们，记得带上相机哦！`,
        images: [
          "https://picsum.photos/400/300?random=travel1",
          "https://picsum.photos/400/300?random=travel2",
          "https://picsum.photos/400/300?random=travel3",
          "https://picsum.photos/400/300?random=travel4",
          "https://picsum.photos/400/300?random=travel5",
          "https://picsum.photos/400/300?random=travel6",
        ],
        category: "旅行",
        publishTime: "4天前",
        location: "📍 杭州周边",
        likes: 176,
        comments: 89,
        shares: 34,
        views: 367,
        isLiked: false,
        isBookmarked: false,
        // 这个帖子没有活动
      },
    };
    return posts[postId as keyof typeof posts] || posts["1"];
  };

  // 使用 useMemo 确保当 id 变化时重新计算数据
  const postData = useMemo(() => getPostData(id || "1"), [id]);

  // 根据帖子ID获取对应的评论
  const getCommentsData = (postId: string) => {
    const allComments = {
      "1": [
        {
          id: "1",
          author: {
            name: "张亮",
            avatar: "https://picsum.photos/48/48?random=comment1",
          },
          content: "我也想去！正好最近在学摄影，可以一起交流技巧",
          publishTime: "1小时前",
          likes: 5,
          isLiked: false,
        },
        {
          id: "2",
          author: {
            name: "李摄",
            avatar: "https://picsum.photos/48/48?random=comment2",
          },
          content: "西湖的樱花确实很美，我去年也拍了很多。可以分享一些拍摄心得",
          publishTime: "30分钟前",
          likes: 8,
          isLiked: false,
        },
        {
          id: "3",
          author: {
            name: "小美",
            avatar: "https://picsum.photos/48/48?random=comment3",
          },
          content: "好想参加！但是我是摄影小白，会不会拖后腿呀 😅",
          publishTime: "刚刚",
          likes: 3,
          isLiked: false,
        },
        {
          id: "4",
          author: {
            name: "摄影达人",
            avatar: "https://picsum.photos/48/48?random=comment4",
          },
          content: "我之前参加过类似的活动，氛围很好！建议新手带上三脚架。",
          publishTime: "10分钟前",
          likes: 12,
          isLiked: false,
        },
        {
          id: "5",
          author: {
            name: "风景爱好者",
            avatar: "https://picsum.photos/48/48?random=comment5",
          },
          content: "西湖的晨光很美，建议早点去占位置。我可以分享一些拍摄角度。",
          publishTime: "5分钟前",
          likes: 7,
          isLiked: false,
        },
      ],
      "2": [
        {
          id: "1",
          author: {
            name: "读书人",
            avatar: "https://picsum.photos/48/48?random=reader1",
          },
          content: "这本书我也看过，确实很有启发！特别是关于深度工作的概念。",
          publishTime: "2小时前",
          likes: 15,
          isLiked: false,
        },
        {
          id: "2",
          author: {
            name: "效率专家",
            avatar: "https://picsum.photos/48/48?random=reader2",
          },
          content: "推荐配合番茄工作法一起使用，效果会更好。",
          publishTime: "1小时前",
          likes: 8,
          isLiked: false,
        },
      ],
      rec1: [
        {
          id: "1",
          author: {
            name: "摄影学员",
            avatar: "https://picsum.photos/48/48?random=student1",
          },
          content: "谢谢分享！光线运用那一部分特别实用。",
          publishTime: "12小时前",
          likes: 22,
          isLiked: false,
        },
        {
          id: "2",
          author: {
            name: "人像摄影师",
            avatar: "https://picsum.photos/48/48?random=student2",
          },
          content: "构图技巧讲得很详细，已经开始实践了。",
          publishTime: "8小时前",
          likes: 18,
          isLiked: false,
        },
        {
          id: "3",
          author: {
            name: "摄影新手",
            avatar: "https://picsum.photos/48/48?random=student3",
          },
          content: "作为新手表示收获很大，期待更多教程！",
          publishTime: "6小时前",
          likes: 10,
          isLiked: false,
        },
      ],
      rec2: [
        {
          id: "1",
          author: {
            name: "杭州本地人",
            avatar: "https://picsum.photos/48/48?random=local1",
          },
          content: "这些拍摄点确实很棒！我经常去，人比较少的时候效果最好。",
          publishTime: "1天前",
          likes: 35,
          isLiked: false,
        },
        {
          id: "2",
          author: {
            name: "樱花爱好者",
            avatar: "https://picsum.photos/48/48?random=local2",
          },
          content: "今年的樱花开得特别好，推荐大家早上7-8点去拍，光线最美。",
          publishTime: "20小时前",
          likes: 28,
          isLiked: false,
        },
      ],
    };
    return allComments[postId as keyof typeof allComments] || allComments["1"];
  };

  const allComments = useMemo(() => getCommentsData(id || "1"), [id]);
  const displayedComments = showAllComments
    ? allComments
    : allComments.slice(0, 3);

  const recommendations = [
    {
      id: "rec1",
      author: {
        name: "文轩",
        avatar: "https://picsum.photos/40/40?random=rec1author",
        isVerified: false,
      },
      content:
        "春日摄影技巧分享，如何拍出更好的人像照片，掌握光线运用和构图技巧",
      images: [
        "https://picsum.photos/80/80?random=rec1-1",
        "https://picsum.photos/80/80?random=rec1-2",
        "https://picsum.photos/80/80?random=rec1-3",
      ],
      category: "learning" as const,
      publishTime: "1天前",
      comments: 45,
      likes: 128,
      shares: 15,
      isLiked: false,
      isBookmarked: false,
    },
    {
      id: "rec2",
      author: {
        name: "李摄",
        avatar: "https://picsum.photos/40/40?random=rec2author",
        isVerified: true,
      },
      content: "西湖樱花最佳拍摄点推荐，这些地方绝对能拍出大片感觉！",
      images: [
        "https://picsum.photos/80/80?random=rec2-1",
        "https://picsum.photos/80/80?random=rec2-2",
        "https://picsum.photos/80/80?random=rec2-3",
        "https://picsum.photos/80/80?random=rec2-4",
        "https://picsum.photos/80/80?random=rec2-5",
      ],
      category: "learning" as const,
      publishTime: "2天前",
      comments: 67,
      likes: 234,
      shares: 28,
      isLiked: false,
      isBookmarked: true,
    },
    {
      id: "2",
      author: {
        name: "书友会",
        avatar: "https://picsum.photos/40/40?random=rec3author",
        isVerified: false,
      },
      content: "分享一些高效学习的方法，如何在有限时间内最大化学习效果",
      images: [
        "https://picsum.photos/80/80?random=rec3-1",
        "https://picsum.photos/80/80?random=rec3-2",
      ],
      category: "reading" as const,
      publishTime: "3天前",
      comments: 32,
      likes: 95,
      shares: 12,
      isLiked: false,
      isBookmarked: false,
    },
    {
      id: "3",
      author: {
        name: "旅行达人",
        avatar: "https://picsum.photos/40/40?random=rec4author",
        isVerified: true,
      },
      content: "杭州周边小众拍摄地推荐，人少景美，非常适合周末去放松",
      images: [
        "https://picsum.photos/80/80?random=rec4-1",
        "https://picsum.photos/80/80?random=rec4-2",
        "https://picsum.photos/80/80?random=rec4-3",
        "https://picsum.photos/80/80?random=rec4-4",
        "https://picsum.photos/80/80?random=rec4-5",
        "https://picsum.photos/80/80?random=rec4-6",
      ],
      category: "learning" as const,
      publishTime: "4天前",
      comments: 89,
      likes: 176,
      shares: 34,
      isLiked: false,
      isBookmarked: false,
    },
  ];

  const handleFollow = () => {
    console.log("关注用户");
  };

  const handleJoinActivity = () => {
    console.log("报名活动");
  };

  const handleSubmitComment = (comment: string) => {
    console.log("提交评论:", comment);
  };

  const handleScrollToCommentInput = () => {
    commentInputRef.current?.focus();
    commentInputRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const handleShowMoreComments = () => {
    setShowAllComments(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* 左侧浮动返回按钮 */}
      <FloatingBackButton
        text="返回上页"
        variant="elegant"
        size="md"
        onClick={smartGoBack}
      />

      <Container
        size="lg"
        className="py-6 space-y-6 pb-24 pl-12 md:pl-16 lg:pl-20"
      >
        {/* 浏览历史和导航 */}
        {viewHistory.length > 1 && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-4">
              {/* 返回上个帖子按钮 */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (viewHistory.length > 1) {
                    const previousId = viewHistory[1];
                    const navigateToPost = navigateWithSource("community");
                    navigateToPost(`/community/${previousId}`);
                  }
                }}
                className="flex items-center gap-2 bg-white/80 hover:bg-white border border-blue-200 text-blue-700 hover:text-blue-800 px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                上个帖子
              </Button>

              {/* 分隔线 */}
              <div className="w-px h-6 bg-blue-300"></div>

              {/* 浏览历史 */}
              <div className="flex items-center gap-3 flex-1">
                <span className="text-sm font-medium text-blue-700 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  浏览历史:
                </span>
                <div className="flex items-center gap-2 overflow-x-auto">
                  {viewHistory.slice(1).map((historyId, index) => {
                    const historyPost = getPostData(historyId);
                    if (!historyPost) return null;
                    return (
                      <button
                        key={historyId}
                        onClick={() => {
                          const navigateToPost =
                            navigateWithSource("community");
                          navigateToPost(`/community/${historyId}`);
                        }}
                        className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 bg-white/90 hover:bg-white border border-blue-200 rounded-lg hover:shadow-sm transition-all text-sm group"
                        title={`查看: ${historyPost.content.slice(0, 30)}...`}
                      >
                        <span className="w-2 h-2 bg-blue-400 rounded-full group-hover:bg-blue-500 transition-colors"></span>
                        <span className="text-blue-700 group-hover:text-blue-800 max-w-[120px] truncate font-medium">
                          {historyPost.author.name}的帖子
                        </span>
                        {index === 0 && (
                          <span className="text-xs text-blue-500 bg-blue-100 px-1.5 py-0.5 rounded">
                            刚才
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 主要内容 */}
        <PostDetailContent
          post={postData}
          onFollow={handleFollow}
          onJoinActivity={handleJoinActivity}
        />

        {/* 评论区域 */}
        <PostDetailComments
          comments={displayedComments}
          totalComments={allComments.length}
          showAllComments={showAllComments}
          onSubmitComment={handleSubmitComment}
          onShowMoreComments={handleShowMoreComments}
          onScrollToCommentInput={handleScrollToCommentInput}
        />

        {/* 相关推荐 */}
        <PostDetailRecommendations
          recommendations={recommendations}
          onRecommendationClick={(id: string) => {
            console.log(
              "PostDetail: 相关推荐被点击，准备导航到:",
              `/community/${id}`
            );
            const navigateToPost = navigateWithSource("community");
            console.log("PostDetail: navigateToPost 函数获取成功");
            navigateToPost(`/community/${id}`);
            console.log("PostDetail: 导航函数已调用");
            // 页面切换后会自动滚动到顶部（在useEffect中处理）
          }}
        />
      </Container>

      {/* 固定的评论输入框 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-10">
        <Container size="lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
              <span className="text-sm text-gray-600">我</span>
            </div>
            <div className="flex-1 relative">
              <input
                ref={commentInputRef}
                type="text"
                placeholder="写评论..."
                className="w-full px-4 py-3 bg-gray-100 rounded-full border-0 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
              />
            </div>
            <button className="px-6 py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors">
              发送
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
              <span className="text-lg">😊</span>
            </button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default PostDetail;
