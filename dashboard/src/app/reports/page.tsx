'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Download,
  Calendar,
  Filter,
  Search,
  Eye,
  TrendingUp,
  BarChart3,
  PieChart,
  FileSpreadsheet,
} from 'lucide-react';
import { dashboardApi } from '@/lib/api';
import { formatDate } from '@/lib/utils';

interface Report {
  id: string;
  title: string;
  description: string;
  type: 'monthly' | 'quarterly' | 'annual' | 'custom';
  generatedAt: Date;
  size: string;
  format: 'PDF' | 'Excel' | 'CSV';
  status: 'ready' | 'generating' | 'failed';
  icon: React.ComponentType<{ className?: string }>;
}

export default function Reports() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'monthly' | 'quarterly' | 'annual' | 'custom'>('all');

  useEffect(() => {
    fetchReportsData();
  }, []);

  const fetchReportsData = async () => {
    try {
      setLoading(true);
      await dashboardApi.getLatestData();
      // Data would be used for reports in a real implementation
    } catch (error) {
      console.error('Error fetching reports data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mock reports data
  const reports: Report[] = [
    {
      id: '1',
      title: 'Monthly Expense Summary - December 2024',
      description: 'Comprehensive breakdown of government expenses across all districts and sectors',
      type: 'monthly',
      generatedAt: new Date('2024-12-31'),
      size: '2.4 MB',
      format: 'PDF',
      status: 'ready',
      icon: FileText,
    },
    {
      id: '2',
      title: 'Q4 2024 District Performance Analysis',
      description: 'Quarterly analysis of district-wise spending patterns and efficiency metrics',
      type: 'quarterly',
      generatedAt: new Date('2024-12-30'),
      size: '1.8 MB',
      format: 'Excel',
      status: 'ready',
      icon: BarChart3,
    },
    {
      id: '3',
      title: 'Annual Budget Report 2024',
      description: 'Complete annual overview of budget allocation and utilization',
      type: 'annual',
      generatedAt: new Date('2024-12-29'),
      size: '5.2 MB',
      format: 'PDF',
      status: 'ready',
      icon: TrendingUp,
    },
    {
      id: '4',
      title: 'Sector-wise Spending Analysis',
      description: 'Detailed breakdown of spending across healthcare, education, and infrastructure',
      type: 'custom',
      generatedAt: new Date('2024-12-28'),
      size: '3.1 MB',
      format: 'Excel',
      status: 'ready',
      icon: PieChart,
    },
    {
      id: '5',
      title: 'Monthly Variance Report - November 2024',
      description: 'Budget vs actual spending analysis with variance explanations',
      type: 'monthly',
      generatedAt: new Date('2024-11-30'),
      size: '1.2 MB',
      format: 'PDF',
      status: 'ready',
      icon: FileSpreadsheet,
    },
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || report.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const generateReport = (type: string) => {
    // Mock report generation
    console.log(`Generating ${type} report...`);
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
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Generate and access government expense reports
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <button
              onClick={() => generateReport('custom')}
              className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
            >
              <FileText className="h-4 w-4" />
              <span>Generate Report</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>
          </div>
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as typeof filterType)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full sm:w-auto"
              title="Filter by type"
            >
              <option value="all">All Reports</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="annual">Annual</option>
              <option value="custom">Custom</option>
            </select>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => generateReport('monthly')}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 text-left hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Monthly Report</h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">
              Generate current month expense summary
            </p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => generateReport('quarterly')}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 text-left hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <BarChart3 className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Quarterly Report</h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">
              Generate quarterly analysis report
            </p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => generateReport('annual')}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 text-left hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Annual Report</h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">
              Generate comprehensive annual overview
            </p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => generateReport('custom')}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 text-left hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Filter className="h-5 w-5 text-yellow-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Custom Report</h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">
              Create custom filtered report
            </p>
          </motion.button>
        </div>

        {/* Reports List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Recent Reports</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredReports.map((report, index) => {
              const Icon = report.icon;
              return (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 sm:p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Icon className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm sm:text-base font-medium text-gray-900 truncate">
                          {report.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">
                          {report.description}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-xs sm:text-sm text-gray-500">
                          <span>Generated: {formatDate(report.generatedAt)}</span>
                          <span>Size: {report.size}</span>
                          <span>Format: {report.format}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                      </button>
                      <button className="flex items-center space-x-1 text-green-600 hover:text-green-700 text-sm font-medium">
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
