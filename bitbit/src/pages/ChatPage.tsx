import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { Container } from "@/components/ui";
import FloatingBackButton from "@/components/common/FloatingBackButton";
import { ChatContainer } from "@/features/chat/components";
import type { ChatContainerRef } from "@/features/chat/components/ChatContainer";
import { parseChatUrlParams } from "@/features/chat/utils";
import { useSmartNavigation } from "@/shared/hooks/useSmartNavigation";

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { smartGoBack } = useSmartNavigation();
  const chatContainerRef = useRef<ChatContainerRef>(null);

  // 解析URL参数
  const urlParams = parseChatUrlParams(searchParams);
  const stateParams = location.state;

  // 组合参数（state优先于URL参数）
  const chatParams = useMemo(
    () => ({
      userId: stateParams?.userId || urlParams.userId,
      userName: stateParams?.userName || urlParams.userName,
      userAvatar: stateParams?.userAvatar || urlParams.userAvatar,
      conversationId: stateParams?.conversationId || urlParams.conversationId,
      conversationType:
        stateParams?.conversationType ||
        urlParams.conversationType ||
        "private",
      sourceFrom:
        stateParams?.sourceContext?.from ||
        urlParams.sourceFrom ||
        stateParams?.fromSource,
      sourceItemId:
        stateParams?.sourceContext?.itemId || urlParams.sourceItemId,
      sourceItemTitle:
        stateParams?.sourceContext?.itemTitle || urlParams.sourceItemTitle,
      presetMessage: stateParams?.presetMessage || urlParams.presetMessage,
      // 聚合消息通知相关
      messageNotification: stateParams?.messageNotification,
      isListMode: !!(
        stateParams?.fromSource === "notifications" &&
        stateParams?.messageNotification
      ),
    }),
    [
      stateParams?.userId,
      urlParams.userId,
      stateParams?.userName,
      urlParams.userName,
      stateParams?.userAvatar,
      urlParams.userAvatar,
      stateParams?.conversationId,
      urlParams.conversationId,
      stateParams?.conversationType,
      urlParams.conversationType,
      stateParams?.sourceContext?.from,
      urlParams.sourceFrom,
      stateParams?.sourceContext?.itemId,
      urlParams.sourceItemId,
      stateParams?.sourceContext?.itemTitle,
      urlParams.sourceItemTitle,
      stateParams?.presetMessage,
      urlParams.presetMessage,
      stateParams?.fromSource,
      stateParams?.messageNotification,
    ]
  );

  const [isInitialized, setIsInitialized] = useState(false);
  const [contextInfo, setContextInfo] = useState<{
    show: boolean;
    title: string;
    subtitle?: string;
  }>({ show: false, title: "" });

  // 初始化聊天会话
  const initializeChat = useCallback(async () => {
    try {
      if (chatParams.conversationId) {
        // 如果有会话ID，直接加载该会话
        console.log("加载现有会话:", chatParams.conversationId);
        chatContainerRef.current?.switchToConversation(
          chatParams.conversationId
        );
      } else if (chatParams.userId) {
        // 如果有用户ID，创建或查找与该用户的私聊会话
        console.log("创建/查找与用户的私聊:", {
          userId: chatParams.userId,
          userName: chatParams.userName,
          userAvatar: chatParams.userAvatar,
        });

        // 创建或查找与该用户的对话
        const conversationId =
          await chatContainerRef.current?.createOrFindConversationWithUser(
            chatParams.userId,
            {
              name: chatParams.userName || `用户${chatParams.userId}`,
              avatar: chatParams.userAvatar,
            }
          );

        if (conversationId) {
          // 切换到该会话
          chatContainerRef.current?.switchToConversation(conversationId);

          // 如果有预设消息，设置到输入框中
          if (chatParams.presetMessage) {
            chatContainerRef.current?.setPresetMessage(
              chatParams.presetMessage
            );
            console.log("设置预设消息:", chatParams.presetMessage);
          }
        }
      }
    } catch (error) {
      console.error("初始化聊天失败:", error);
    }
  }, [chatParams]);

  useEffect(() => {
    if (
      !isInitialized &&
      (chatParams.userId || chatParams.conversationId || chatParams.isListMode)
    ) {
      if (chatParams.userId || chatParams.conversationId) {
        initializeChat();
      }
      setIsInitialized(true);
    }
  }, [chatParams, isInitialized, initializeChat]);

  // 设置上下文信息显示
  useEffect(() => {
    // 处理聚合消息通知
    if (chatParams.isListMode && chatParams.messageNotification) {
      setContextInfo({
        show: true,
        title: "新消息通知",
        subtitle: `${chatParams.messageNotification.totalCount}个联系人发来了消息`,
      });

      // 5秒后自动隐藏上下文信息
      const timer = setTimeout(() => {
        setContextInfo((prev) => ({ ...prev, show: false }));
      }, 5000);

      return () => clearTimeout(timer);
    }

    if (chatParams.sourceFrom && chatParams.sourceItemTitle) {
      let contextTitle = "";
      let contextSubtitle = "";

      switch (chatParams.sourceFrom) {
        case "exchange":
          contextTitle = "关于商品咨询";
          contextSubtitle = chatParams.sourceItemTitle;
          break;
        case "activity":
          contextTitle = "活动群聊";
          contextSubtitle = chatParams.sourceItemTitle;
          break;
        case "userCard":
          contextTitle = "来自用户资料";
          break;
        case "notification":
          contextTitle = "来自通知消息";
          break;
        default:
          break;
      }

      if (contextTitle) {
        setContextInfo({
          show: true,
          title: contextTitle,
          subtitle: contextSubtitle,
        });

        // 5秒后自动隐藏上下文信息
        const timer = setTimeout(() => {
          setContextInfo((prev) => ({ ...prev, show: false }));
        }, 5000);

        return () => clearTimeout(timer);
      }
    }
  }, [chatParams]);

  const handleGoBack = () => {
    // 根据来源智能返回
    switch (chatParams.sourceFrom) {
      case "exchange":
        if (chatParams.sourceItemId) {
          navigate(`/exchange/${chatParams.sourceItemId}`);
        } else {
          navigate("/exchange");
        }
        break;
      case "activity":
        if (chatParams.sourceItemId) {
          navigate(`/activities/${chatParams.sourceItemId}`);
        } else {
          navigate("/activities");
        }
        break;
      case "notification":
        navigate("/notifications");
        break;
      case "userCard":
      case "profile":
        navigate("/profile");
        break;
      default:
        smartGoBack();
        break;
    }
  };

  // 如果没有必要的参数且不是列表模式，显示错误页面
  if (
    !chatParams.userId &&
    !chatParams.conversationId &&
    !chatParams.isListMode
  ) {
    return (
      <Container size="lg" className="py-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💬</div>
          <h1 className="text-2xl font-bold text-text-primary mb-4">
            无法打开聊天
          </h1>
          <p className="text-text-secondary mb-6">
            缺少必要的聊天参数，请从正确的入口进入聊天页面
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
          >
            返回首页
          </button>
        </div>
      </Container>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-col z-50 overflow-hidden">
      {/* 返回按钮 - 绝对定位在左上角 */}
      <div className="absolute top-4 left-4 z-[60]">
        <FloatingBackButton
          text="返回上页"
          variant="elegant"
          size="md"
          onClick={handleGoBack}
        />
      </div>

      {/* 上下文信息条 - 固定顶部 */}
      {contextInfo.show && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 px-4 py-3 flex-shrink-0 z-[55]">
          <div className="flex items-center justify-between max-w-4xl mx-auto ml-16">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div>
                <p className="text-sm font-medium text-blue-800">
                  {contextInfo.title}
                </p>
                {contextInfo.subtitle && (
                  <p className="text-xs text-blue-600 truncate max-w-xs">
                    {contextInfo.subtitle}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={() =>
                setContextInfo((prev) => ({ ...prev, show: false }))
              }
              className="text-blue-600 hover:text-blue-800 p-1"
            >
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* 聊天容器 - 占满整个剩余空间 */}
      <div className="flex-1 min-h-0">
        <ChatContainer ref={chatContainerRef} className="h-full" />
      </div>

      {/* 调试信息（开发环境） - 不影响布局 */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-20 right-4 bg-gray-800 text-white p-3 rounded-lg text-xs max-w-sm opacity-75 hover:opacity-100 transition-opacity z-40">
          <p className="font-bold mb-1">Chat Debug Info:</p>
          <p>User ID: {chatParams.userId || "N/A"}</p>
          <p>Conversation ID: {chatParams.conversationId || "N/A"}</p>
          <p>Type: {chatParams.conversationType || "N/A"}</p>
          <p>From: {chatParams.sourceFrom || "N/A"}</p>
          {chatParams.presetMessage && (
            <p>Preset: {chatParams.presetMessage.slice(0, 30)}...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatPage;
