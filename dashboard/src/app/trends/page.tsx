'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  LineChart,
  PieChart,
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from 'lucide-react';
import { dashboardApi } from '@/lib/api';
import { formatCurrency, formatPercentage } from '@/lib/utils';

interface TrendData {
  period: string;
  value: number;
  change: number;
  changeDirection: 'up' | 'down' | 'stable';
}

interface SectorTrend {
  name: string;
  current: number;
  previous: number;
  change: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

export default function Trends() {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('6m');
  const [selectedMetric, setSelectedMetric] = useState('total');

  useEffect(() => {
    fetchTrendsData();
  }, [timeRange]);

  const fetchTrendsData = async () => {
    try {
      setLoading(true);
      await dashboardApi.getLatestData();
      // Data would be used for trends analysis in a real implementation
    } catch (error) {
      console.error('Error fetching trends data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mock trend data
  const monthlyTrends: TrendData[] = [
    { period: 'Jan 2024', value: 2500000000, change: 5.2, changeDirection: 'up' },
    { period: 'Feb 2024', value: 2450000000, change: -2.0, changeDirection: 'down' },
    { period: 'Mar 2024', value: 2600000000, change: 6.1, changeDirection: 'up' },
    { period: 'Apr 2024', value: 2580000000, change: -0.8, changeDirection: 'down' },
    { period: 'May 2024', value: 2650000000, change: 2.7, changeDirection: 'up' },
    { period: 'Jun 2024', value: 2700000000, change: 1.9, changeDirection: 'up' },
  ];

  const sectorTrends: SectorTrend[] = [
    {
      name: 'Healthcare',
      current: 800000000,
      previous: 750000000,
      change: 6.7,
      trend: 'increasing',
    },
    {
      name: 'Education',
      current: 650000000,
      previous: 680000000,
      change: -4.4,
      trend: 'decreasing',
    },
    {
      name: 'Infrastructure',
      current: 900000000,
      previous: 850000000,
      change: 5.9,
      trend: 'increasing',
    },
    {
      name: 'Defense',
      current: 450000000,
      previous: 455000000,
      change: -1.1,
      trend: 'decreasing',
    },
    {
      name: 'Social Services',
      current: 320000000,
      previous: 310000000,
      change: 3.2,
      trend: 'increasing',
    },
  ];

  const getTrendIcon = (direction: 'up' | 'down' | 'stable') => {
    switch (direction) {
      case 'up': return <ArrowUpRight className="h-4 w-4 text-green-600" />;
      case 'down': return <ArrowDownRight className="h-4 w-4 text-red-600" />;
      case 'stable': return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = (direction: 'up' | 'down' | 'stable') => {
    switch (direction) {
      case 'up': return 'text-green-600 bg-green-50 border-green-200';
      case 'down': return 'text-red-600 bg-red-50 border-red-200';
      case 'stable': return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSectorTrendColor = (trend: 'increasing' | 'decreasing' | 'stable') => {
    switch (trend) {
      case 'increasing': return 'text-green-600';
      case 'decreasing': return 'text-red-600';
      case 'stable': return 'text-gray-600';
    }
  };

  const getSectorTrendIcon = (trend: 'increasing' | 'decreasing' | 'stable') => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="h-4 w-4" />;
      case 'decreasing': return <TrendingDown className="h-4 w-4" />;
      case 'stable': return <Minus className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          <div className="animate-pulse">
            <div className="h-6 sm:h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2 mb-6 sm:mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                  <div className="h-5 sm:h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 sm:h-8 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Trends</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Analyze spending patterns and trends over time
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full sm:w-auto"
              title="Select time range"
            >
              <option value="3m">Last 3 months</option>
              <option value="6m">Last 6 months</option>
              <option value="1y">Last year</option>
              <option value="2y">Last 2 years</option>
            </select>
            <button className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-600">Monthly Average</h3>
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              {formatCurrency(2600000000)}
            </div>
            <div className="flex items-center space-x-1">
              {getTrendIcon('up')}
              <span className="text-sm text-green-600">+3.2% from last period</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-600">Growth Rate</h3>
              <BarChart3 className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              +4.2%
            </div>
            <div className="flex items-center space-x-1">
              {getTrendIcon('up')}
              <span className="text-sm text-green-600">Year over year</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-600">Peak Month</h3>
              <Calendar className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              June 2024
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-sm text-gray-600">{formatCurrency(2700000000)}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-600">Volatility</h3>
              <LineChart className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              2.8%
            </div>
            <div className="flex items-center space-x-1">
              {getTrendIcon('down')}
              <span className="text-sm text-green-600">Lower than average</span>
            </div>
          </motion.div>
        </div>

        {/* Monthly Trends Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Monthly Expense Trends</h3>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              title="Select metric"
            >
              <option value="total">Total Expenses</option>
              <option value="growth">Growth Rate</option>
              <option value="variance">Variance</option>
            </select>
          </div>
          <div className="h-64 sm:h-80 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Expense Trend Chart Placeholder</span>
          </div>
        </motion.div>

        {/* Trends List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Monthly Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6"
          >
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
              Monthly Breakdown
            </h3>
            <div className="space-y-3">
              {monthlyTrends.map((trend) => (
                <div key={trend.period} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <div className="font-medium text-gray-900 text-sm sm:text-base">
                      {trend.period}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      {formatCurrency(trend.value)}
                    </div>
                  </div>
                  <div className={`flex items-center space-x-2 px-2 py-1 rounded-full border ${getTrendColor(trend.changeDirection)}`}>
                    {getTrendIcon(trend.changeDirection)}
                    <span className="text-xs sm:text-sm font-medium">
                      {trend.change > 0 ? '+' : ''}{formatPercentage(trend.change)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Sector Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6"
          >
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
              Sector Trends
            </h3>
            <div className="space-y-4">
              {sectorTrends.map((sector) => (
                <div key={sector.name} className="p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm sm:text-base">
                      {sector.name}
                    </h4>
                    <div className={`flex items-center space-x-1 ${getSectorTrendColor(sector.trend)}`}>
                      {getSectorTrendIcon(sector.trend)}
                      <span className="text-xs sm:text-sm font-medium">
                        {sector.change > 0 ? '+' : ''}{formatPercentage(sector.change)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
                    <span>Current: {formatCurrency(sector.current)}</span>
                    <span>Previous: {formatCurrency(sector.previous)}</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        sector.trend === 'increasing' ? 'bg-green-500' :
                        sector.trend === 'decreasing' ? 'bg-red-500' : 'bg-gray-500'
                      }`}
                      style={{ width: `${Math.min(Math.abs(sector.change) * 10, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6"
        >
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
            Trend Insights
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-900">Positive Trend</span>
              </div>
              <p className="text-sm text-green-700">
                Infrastructure spending shows consistent growth over the past 6 months with 5.9% increase.
              </p>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center space-x-2 mb-2">
                <BarChart3 className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-yellow-900">Seasonal Pattern</span>
              </div>
              <p className="text-sm text-yellow-700">
                June typically shows peak spending across all sectors, likely due to fiscal year-end activities.
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <PieChart className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-900">Budget Optimization</span>
              </div>
              <p className="text-sm text-blue-700">
                Healthcare sector efficiency improved by 6.7%, indicating better budget utilization.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
