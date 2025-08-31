import { useNavigate, useParams } from "react-router-dom";
import { useSmartNavigation } from "../../../shared/hooks/useSmartNavigation";

export const useProfileNavigation = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { navigateWithSource } = useSmartNavigation();

  // 获取当前的标签页
  const currentTab = params.tab || "activities";

  const navigateFromProfile = navigateWithSource("profile");

  const navigateToActivityDetail = (activityId: string) => {
    navigateFromProfile(`/activities/${activityId}`, {
      profileTab: currentTab,
    });
  };

  const navigateToPostDetail = (postId: string) => {
    navigateFromProfile(`/community/${postId}`, { profileTab: currentTab });
  };

  const navigateToExchangeDetail = (exchangeId: string) => {
    navigateFromProfile(`/exchange/${exchangeId}`, { profileTab: currentTab });
  };

  const navigateToOrderDetail = (orderId: string) => {
    // 假设有订单详情页，如果没有可以导航到用户中心或显示模态框
    console.log("Navigate to order detail:", orderId);
    // navigate(`/order/${orderId}`);
  };

  const navigateToEditActivity = (activityId: string) => {
    navigate(`/publish-activity?edit=${activityId}`);
  };

  const navigateToEditPost = (postId: string) => {
    navigate(`/publish-post?edit=${postId}`);
  };

  const navigateToEditExchange = (exchangeId: string) => {
    navigate(`/publish-item?edit=${exchangeId}`);
  };

  const navigateToPublishActivity = () => {
    navigate("/publish-activity");
  };

  const navigateToPublishPost = () => {
    navigate("/publish-post");
  };

  const navigateToPublishItem = () => {
    navigate("/publish-item");
  };

  return {
    navigateToActivityDetail,
    navigateToPostDetail,
    navigateToExchangeDetail,
    navigateToOrderDetail,
    navigateToEditActivity,
    navigateToEditPost,
    navigateToEditExchange,
    navigateToPublishActivity,
    navigateToPublishPost,
    navigateToPublishItem,
  };
};
