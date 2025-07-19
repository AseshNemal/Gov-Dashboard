'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  MapPin,
  TrendingUp,
  BarChart3,
  Building2,
  Calendar,
  AlertTriangle,
} from 'lucide-react';
import StatCard from '@/components/StatCard';
import {
  DistrictBarChart,
  SectorPieChart,
  TrendLineChart,
  ExpenseAreaChart,
} from '@/components/Charts';
import { dashboardApi } from '@/lib/api';
import type { ExpenseData, DashboardStats } from '@/types';

export default function Dashboard() {
  const [data, setData] = useState<ExpenseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch latest data
      const latestData = await dashboardApi.getLatestData();
      setData(latestData);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatsFromData = (data: ExpenseData): DashboardStats => {
    const districts = Object.entries(data.districts);
    
    return {
      totalExpenses: data.total_expenses,
      totalDistricts: districts.length,
      avgPerDistrict: data.summary.avg_per_district,
      highestSpendingDistrict: data.summary.highest_spending_district,
      lowestSpendingDistrict: data.summary.lowest_spending_district,
      todayExpenses: data.total_expenses,
      monthlyGrowth: Math.random() * 10 - 5, // Mock data
      yearlyGrowth: Math.random() * 20 - 10, // Mock data
    };
  };

  const getDistrictChartData = (data: ExpenseData) => {
    return Object.entries(data.districts)
      .map(([name, district]) => ({
        name,
        value: district.total,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10); // Top 10 districts
  };

  const getSectorChartData = (data: ExpenseData) => {
    const sectorTotals: { [key: string]: number } = {};
    
    Object.values(data.districts).forEach(district => {
      Object.entries(district.sectors).forEach(([sector, amount]) => {
        sectorTotals[sector] = (sectorTotals[sector] || 0) + amount;
      });
    });

    return Object.entries(sectorTotals)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  };

  const getTrendData = () => {
    // Mock trend data - in real app, this would come from API
    const days = 30;
    const trendData = [];
    const baseAmount = data?.total_expenses || 35000000;
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      const variation = (Math.random() - 0.5) * 0.2;
      const amount = baseAmount * (1 + variation);
      
      trendData.push({
        date: date.toISOString().split('T')[0],
        amount: Math.round(amount),
      });
    }
    
    return trendData;
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Error Loading Dashboard
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const stats = data ? getStatsFromData(data) : null;
  const districtData = data ? getDistrictChartData(data) : [];
  const sectorData = data ? getSectorChartData(data) : [];
  const trendData = getTrendData();

  const statCards = stats ? [
    {
      title: 'Total Daily Expenses',
      value: stats.totalExpenses,
      change: stats.monthlyGrowth,
      changeLabel: 'vs last month',
      icon: DollarSign,
      color: 'blue' as const,
      format: 'currency' as const,
    },
    {
      title: 'Active Districts',
      value: stats.totalDistricts,
      icon: MapPin,
      color: 'green' as const,
      format: 'number' as const,
    },
    {
      title: 'Average per District',
      value: stats.avgPerDistrict,
      change: stats.yearlyGrowth,
      changeLabel: 'vs last year',
      icon: BarChart3,
      color: 'purple' as const,
      format: 'currency' as const,
    },
    {
      title: 'Highest Spending',
      value: stats.highestSpendingDistrict,
      icon: TrendingUp,
      color: 'yellow' as const,
      format: 'text' as const,
    },
  ] : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Government Expense Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Real-time monitoring of government expenses across Sri Lanka
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={fetchDashboardData}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Refreshing...' : 'Refresh Data'}
            </button>
            <div className="text-sm text-gray-500">
              Last updated: {data ? new Date(data.date).toLocaleString() : 'Never'}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <StatCard
            key={stat.title}
            {...stat}
            loading={loading}
          />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <DistrictBarChart data={districtData} loading={loading} />
        <SectorPieChart data={sectorData} loading={loading} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TrendLineChart data={trendData} loading={loading} />
        <ExpenseAreaChart data={trendData} loading={loading} />
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <Building2 className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-blue-900">View Districts</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <BarChart3 className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-900">Generate Report</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <Calendar className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-purple-900">Schedule Analysis</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
