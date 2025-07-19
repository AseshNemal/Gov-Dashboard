'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Heart,
  GraduationCap,
  Shield,
  Zap,
  TreePine,
  Truck,
  Landmark,
  Droplets,
  Users,
  TrendingUp,
} from 'lucide-react';
import { SectorPieChart } from '@/components/Charts';
import StatCard from '@/components/StatCard';
import { dashboardApi } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import type { ExpenseData } from '@/types';
import type { LucideIcon } from 'lucide-react';

const sectorIcons: { [key: string]: LucideIcon } = {
  Healthcare: Heart,
  Education: GraduationCap,
  Infrastructure: Building2,
  Defense: Shield,
  Energy: Zap,
  Environment: TreePine,
  Transportation: Truck,
  'Public Administration': Landmark,
  'Water & Sanitation': Droplets,
  'Social Services': Users,
};

export default function Sectors() {
  const [data, setData] = useState<ExpenseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  useEffect(() => {
    fetchSectorsData();
  }, []);

  const fetchSectorsData = async () => {
    try {
      setLoading(true);
      const latestData = await dashboardApi.getLatestData();
      setData(latestData);
    } catch (error) {
      console.error('Error fetching sectors data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSectorsData = () => {
    if (!data) return [];
    
    const sectorTotals: { [key: string]: number } = {};
    const sectorDistricts: { [key: string]: number } = {};
    
    Object.entries(data.districts).forEach(([, district]) => {
      Object.entries(district.sectors).forEach(([sector, amount]) => {
        sectorTotals[sector] = (sectorTotals[sector] || 0) + amount;
        sectorDistricts[sector] = (sectorDistricts[sector] || 0) + 1;
      });
    });

    return Object.entries(sectorTotals)
      .map(([name, total]) => ({
        name,
        total,
        districts: sectorDistricts[name],
        average: total / sectorDistricts[name],
        percentage: (total / data.total_expenses) * 100,
        icon: sectorIcons[name] || Building2,
      }))
      .sort((a, b) => b.total - a.total);
  };

  const sectorsData = getSectorsData();
  const chartData = sectorsData.map(sector => ({
    name: sector.name,
    value: sector.total,
  }));

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
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Sectors</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Government spending analysis by sector
            </p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard
            title="Total Sectors"
            value={sectorsData.length}
            icon={Building2}
            color="blue"
            format="number"
            loading={loading}
          />
          <StatCard
            title="Largest Sector"
            value={sectorsData[0]?.name || 'N/A'}
            icon={sectorsData[0]?.icon || Building2}
            color="green"
            format="text"
            loading={loading}
          />
          <StatCard
            title="Average Spending"
            value={sectorsData.reduce((sum, s) => sum + s.total, 0) / sectorsData.length || 0}
            icon={Landmark}
            color="purple"
            format="currency"
            loading={loading}
          />
          <StatCard
            title="Top Sector Share"
            value={sectorsData[0]?.percentage || 0}
            icon={TrendingUp}
            color="yellow"
            format="percentage"
            loading={loading}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          {/* Pie Chart */}
          <SectorPieChart data={chartData} loading={loading} />

          {/* Top Sectors List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6"
          >
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
              Sector Rankings
            </h3>
            <div className="space-y-3">
              {sectorsData.slice(0, 8).map((sector, index) => {
                const Icon = sector.icon;
                return (
                  <div
                    key={sector.name}
                    className={`flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer ${
                      selectedSector === sector.name
                        ? 'bg-blue-50 border border-blue-200'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedSector(
                      selectedSector === sector.name ? null : sector.name
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                        <Icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm sm:text-base">
                          {index + 1}. {sector.name}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500">
                          {sector.districts} districts
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900 text-sm sm:text-base">
                        {formatCurrency(sector.total)}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500">
                        {sector.percentage.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Detailed Sector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {sectorsData.map((sector, index) => {
            const Icon = sector.icon;
            return (
              <motion.div
                key={sector.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    {sector.name}
                  </h3>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Total Spending</span>
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">
                      {formatCurrency(sector.total)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Active Districts</span>
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">
                      {sector.districts}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Average per District</span>
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">
                      {formatCurrency(sector.average)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Budget Share</span>
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">
                      {sector.percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`bg-blue-600 h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${Math.min(sector.percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <button className="w-full mt-4 bg-blue-50 text-blue-700 py-2 rounded-lg hover:bg-blue-100 transition-colors text-xs sm:text-sm font-medium">
                  View Details
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
