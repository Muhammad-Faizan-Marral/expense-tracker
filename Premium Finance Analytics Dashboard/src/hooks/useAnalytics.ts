import { useState, useEffect, useCallback } from "react";
import type { AxiosError } from "axios";
import type {
  DashboardStats,
  CategoryStat,
  MonthlyData,
  DailyData,
} from "../types/analytics.types";
import * as service from "../services/analytics.service";

type DayFilter = 7 | 30;

interface UseAnalyticsReturn {
  dashboardStats: DashboardStats | null;
  categoryData: CategoryStat[];
  monthlyData: MonthlyData[];
  dailyData: DailyData[];
  dayFilter: DayFilter;
  setDayFilter: (d: DayFilter) => void;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useAnalytics(): UseAnalyticsReturn {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [categoryData, setCategoryData] = useState<CategoryStat[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [dailyData, setDailyData] = useState<DailyData[]>([]);
  const [dayFilter, setDayFilter] = useState<DayFilter>(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  const refetch = useCallback(() => setTick((t) => t + 1), []);

  // Initial load: dashboard + category + monthly (don't depend on dayFilter)
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const [stats, cats, monthly] = await Promise.all([
          service.fetchDashboardStats(),
          service.fetchCategoryAnalytics(),
          service.fetchMonthlyAnalytics(),
        ]);
        if (cancelled) return;
        setDashboardStats(stats);
        setCategoryData(cats);
        setMonthlyData(monthly);
      } catch (e) {
        if (cancelled) return;
        const err = e as AxiosError<{ message: string }>;
        setError(err.response?.data?.message ?? err.message ?? "Failed to load analytics");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [tick]);

  // Reload daily data when dayFilter changes
  useEffect(() => {
    let cancelled = false;
    service.fetchLastDaysAnalytics(dayFilter)
      .then((data) => { if (!cancelled) setDailyData(data); })
      .catch(() => { /* non-critical, ignore */ });
    return () => { cancelled = true; };
  }, [dayFilter, tick]);

  return {
    dashboardStats,
    categoryData,
    monthlyData,
    dailyData,
    dayFilter,
    setDayFilter,
    loading,
    error,
    refetch,
  };
}