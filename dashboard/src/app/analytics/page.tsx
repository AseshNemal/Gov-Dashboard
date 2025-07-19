'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  BarChart3,
} from 'lucide-react';
import {
  DistrictBarChart,
  SectorPieChart,
  TrendLineChart,
  ExpenseAreaChart,
} from '@/components/Charts';
import StatCard from '@/components/StatCard';
import { dashboardApi } from '@/lib/api';

export default function Analytics() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const latestData = await dashboardApi.getLatestData();
      setData(latestData);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const analyticsStats = [
    {
      title: 'Revenue Growth',
      value: 12.5,
      change: 2.3,
      changeLabel: 'vs last period',
      icon: TrendingUp,
      color: 'green' as const,
      format: 'percentage' as const,
    },
    {
      title: 'Expense Ratio',
      value: 67.8,
      change: -1.2,
      changeLabel: 'vs last period',
      icon: BarChart3,
      color: 'blue' as const,
      format: 'percentage' as const,
    },
    {
      title: 'Budget Variance',
      value: 8.4,
      change: 3.1,
      changeLabel: 'vs target',
      icon: TrendingDown,
      color: 'red' as const,
      format: 'percentage' as const,
    },
    {
      title: 'Efficiency Score',
      value: 92.3,
      change: 1.7,
      changeLabel: 'vs last month',
      icon: Calendar,
      color: 'purple' as const,
      format: 'percentage' as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">
            Detailed analysis and insights into government expenses
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            title="Select time range"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Analytics Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {analyticsStats.map((stat) => (
          <StatCard key={stat.title} {...stat} loading={loading} />
        ))}
      </div>

      {/* Advanced Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Monthly Comparison
            </h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View Details
            </button>
          </div>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Monthly Comparison Chart</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Performance Metrics
            </h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Configure
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Budget Utilization</span>
              <span className="text-sm font-medium">78%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full w-[78%]"></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Cost Efficiency</span>
              <span className="text-sm font-medium">92%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full w-[92%]"></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Target Achievement</span>
              <span className="text-sm font-medium">85%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-600 h-2 rounded-full w-[85%]"></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Insights Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Key Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-900">Positive Trend</span>
              </div>
              <p className="text-sm text-green-700">
                Healthcare sector showed 15% improvement in budget efficiency this month.
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-900">Opportunity</span>
              </div>
              <p className="text-sm text-blue-700">
                Infrastructure spending can be optimized by 8% through better resource allocation.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingDown className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-yellow-900">Watch Point</span>
              </div>
              <p className="text-sm text-yellow-700">
                Education sector expenses are 12% above monthly budget target.
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-purple-900">Forecast</span>
              </div>
              <p className="text-sm text-purple-700">
                Q4 projections show 5% savings potential with current spending patterns.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
