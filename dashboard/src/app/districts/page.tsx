'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, DollarSign, TrendingUp, Users } from 'lucide-react';
import { dashboardApi } from '@/lib/api';
import { formatCurrency, formatNumber } from '@/lib/utils';
import type { ExpenseData } from '@/types';

export default function Districts() {
  const [data, setData] = useState<ExpenseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'total' | 'population'>('total');

  useEffect(() => {
    fetchDistrictsData();
  }, []);

  const fetchDistrictsData = async () => {
    try {
      setLoading(true);
      const latestData = await dashboardApi.getLatestData();
      setData(latestData);
    } catch (error) {
      console.error('Error fetching districts data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDistrictsData = () => {
    if (!data) return [];
    
    return Object.entries(data.districts)
      .map(([name, district]) => ({
        name,
        total: district.total,
        sectors: district.sectors,
        population: Math.floor(Math.random() * 2000000) + 500000, // Mock population data
        perCapita: district.total / (Math.floor(Math.random() * 2000000) + 500000),
      }))
      .filter(district => 
        district.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'total':
            return b.total - a.total;
          case 'population':
            return b.population - a.population;
          default:
            return 0;
        }
      });
  };

  const districtsData = getDistrictsData();

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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Districts</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Expense breakdown by administrative districts
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search districts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>
          </div>
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'total' | 'population')}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full sm:w-auto"
              title="Sort by"
            >
              <option value="total">Sort by Total Expense</option>
              <option value="name">Sort by Name</option>
              <option value="population">Sort by Population</option>
            </select>
          </div>
        </div>

        {/* Districts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {districtsData.map((district, index) => (
            <motion.div
              key={district.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  {district.name}
                </h3>
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-xs sm:text-sm text-gray-600">Total Expense</span>
                  </div>
                  <span className="font-semibold text-gray-900 text-sm sm:text-base">
                    {formatCurrency(district.total)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-purple-600" />
                    <span className="text-xs sm:text-sm text-gray-600">Population</span>
                  </div>
                  <span className="font-semibold text-gray-900 text-sm sm:text-base">
                    {formatNumber(district.population)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <span className="text-xs sm:text-sm text-gray-600">Per Capita</span>
                  </div>
                  <span className="font-semibold text-gray-900 text-sm sm:text-base">
                    {formatCurrency(district.perCapita)}
                  </span>
                </div>
              </div>

              {/* Top Sectors */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-xs sm:text-sm font-medium text-gray-900 mb-2">
                  Top Sectors
                </h4>
                <div className="space-y-1">
                  {Object.entries(district.sectors)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 3)
                    .map(([sector, amount]) => (
                      <div key={sector} className="flex items-center justify-between text-xs">
                        <span className="text-gray-600 truncate">{sector}</span>
                        <span className="font-medium text-gray-900 ml-2">
                          {formatCurrency(amount)}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full mt-4 bg-blue-50 text-blue-700 py-2 rounded-lg hover:bg-blue-100 transition-colors text-xs sm:text-sm font-medium">
                View Details
              </button>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6"
        >
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
            District Summary
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-1">
                {districtsData.length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Total Districts</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-green-600 mb-1">
                {formatCurrency(
                  districtsData.reduce((sum, d) => sum + d.total, 0)
                )}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Total Expenses</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-1">
                {formatCurrency(
                  districtsData.reduce((sum, d) => sum + d.total, 0) / districtsData.length
                )}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Average per District</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-yellow-600 mb-1">
                {districtsData.length > 0 ? districtsData[0].name : 'N/A'}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Highest Spending</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
