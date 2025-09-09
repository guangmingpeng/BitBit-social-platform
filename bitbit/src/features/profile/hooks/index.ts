import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ProfileData, ProfileTab, Activity } from "../types";
import { getProfileData } from "../services";
import type { ActivityFilterType } from "../components/ActivityFilter";

export const useProfile = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setLoading(true);
        const data = await getProfileData();
        setProfileData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "加载失败");
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, []);

  return { profileData, loading, error };
};

export const useProfileTabs = () => {
  const navigate = useNavigate();
  const params = useParams();

  // 从URL参数中获取当前标签，默认为 "activities"
  const activeTab = (params.tab as ProfileTab) || "activities";

  const handleTabChange = (tab: ProfileTab) => {
    // 更新URL而不是仅仅更新状态
    navigate(`/profile/${tab}`, { replace: true });
  };

  return { activeTab, handleTabChange };
};

// 新增：用于其他用户页面的tab管理
export const useOtherUserProfileTabs = () => {
  const navigate = useNavigate();
  const params = useParams<{ userId: string; tab?: string }>();

  // 从URL参数中获取当前标签，默认为 "activities"
  const activeTab = (params.tab as ProfileTab) || "activities";

  const handleTabChange = (tab: ProfileTab) => {
    // 为其他用户页面更新URL
    if (params.userId) {
      navigate(`/user/${params.userId}/${tab}`, { replace: true });
    }
  };

  return { activeTab, handleTabChange };
};

export const useActivityFilter = (activities: Activity[] = []) => {
  const [activeFilter, setActiveFilter] = useState<ActivityFilterType>("all");

  const filteredActivities = useMemo(() => {
    switch (activeFilter) {
      case "organized":
        return activities.filter((activity) => activity.status === "organized");
      case "registered":
        return activities.filter(
          (activity) => activity.status === "registered"
        );
      case "ended":
        return activities.filter((activity) => activity.status === "ended");
      case "all":
      default:
        return activities;
    }
  }, [activities, activeFilter]);

  // 包装 setActiveFilter 以便在筛选条件变化时可以触发其他副作用
  const handleFilterChange = (filter: ActivityFilterType) => {
    setActiveFilter(filter);
  };

  return {
    activeFilter,
    setActiveFilter: handleFilterChange,
    filteredActivities,
  };
};

// 导出导航hook
export { useProfileNavigation } from "./useProfileNavigation";

// 导出分页hook
export { usePagination } from "./usePagination";

// 新增的 settings hooks
export { useSettings, useTheme } from "./useSettings";
export { useSettingsNavigation } from "./useSettingsNavigation";
export type { SettingsNavigationItem } from "./useSettingsNavigation";
