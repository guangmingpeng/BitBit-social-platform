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

  return {
    activeFilter,
    setActiveFilter,
    filteredActivities,
  };
};

// 导出导航hook
export { useProfileNavigation } from "./useProfileNavigation";

// 导出分页hook
export { usePagination } from "./usePagination";
