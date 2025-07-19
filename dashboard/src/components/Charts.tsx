'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  Legend,
} from 'recharts';
import { motion } from 'framer-motion';
import { formatCurrency, generateChartColors } from '@/lib/utils';

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
}

const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  children,
  className = '',
  loading = false,
}) => {
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 ${className}`}
      >
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="animate-pulse">
          <div className="h-48 sm:h-64 bg-gray-200 rounded"></div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 ${className}`}
    >
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </motion.div>
  );
};

interface DistrictBarChartProps {
  data: Array<{ name: string; value: number }>;
  loading?: boolean;
}

export const DistrictBarChart: React.FC<DistrictBarChartProps> = ({
  data,
  loading = false,
}) => {
  const colors = generateChartColors(data.length);

  return (
    <ChartContainer title="Expenses by District" loading={loading}>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10 }}
            angle={-45}
            textAnchor="end"
            height={80}
            interval={0}
          />
          <YAxis
            tick={{ fontSize: 10 }}
            tickFormatter={(value) => formatCurrency(value)}
            width={60}
          />
          <Tooltip
            formatter={(value: number) => [formatCurrency(value), 'Amount']}
            labelStyle={{ color: '#374151' }}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '12px',
            }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

interface SectorPieChartProps {
  data: Array<{ name: string; value: number }>;
  loading?: boolean;
}

export const SectorPieChart: React.FC<SectorPieChartProps> = ({
  data,
  loading = false,
}) => {
  const colors = generateChartColors(data.length);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderCustomLabel = (entry: any) => {
    if (entry.percent < 0.08) return null; // Don't show labels for small slices on mobile
    
    const RADIAN = Math.PI / 180;
    const radius = entry.innerRadius + (entry.outerRadius - entry.innerRadius) * 0.5;
    const x = entry.cx + radius * Math.cos(-entry.midAngle * RADIAN);
    const y = entry.cy + radius * Math.sin(-entry.midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > entry.cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={10}
        fontWeight="bold"
      >
        {`${(entry.percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ChartContainer title="Expense Distribution by Sector" loading={loading}>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={60}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [formatCurrency(value), 'Amount']}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '12px',
            }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

interface TrendLineChartProps {
  data: Array<{ date: string; amount: number }>;
  loading?: boolean;
}

export const TrendLineChart: React.FC<TrendLineChartProps> = ({
  data,
  loading = false,
}) => {
  return (
    <ChartContainer title="Expense Trends Over Time" loading={loading}>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10 }}
            tickFormatter={(value) => new Date(value).toLocaleDateString()}
          />
          <YAxis
            tick={{ fontSize: 10 }}
            tickFormatter={(value) => formatCurrency(value)}
            width={60}
          />
          <Tooltip
            formatter={(value: number) => [formatCurrency(value), 'Amount']}
            labelFormatter={(value) => new Date(value).toLocaleDateString()}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '12px',
            }}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ r: 3, fill: '#3B82F6' }}
            activeDot={{ r: 5, fill: '#1D4ED8' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

interface ExpenseAreaChartProps {
  data: Array<{ date: string; amount: number; budget?: number }>;
  loading?: boolean;
}

export const ExpenseAreaChart: React.FC<ExpenseAreaChartProps> = ({
  data,
  loading = false,
}) => {
  return (
    <ChartContainer title="Daily Expenses vs Budget" loading={loading}>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorBudget" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10 }}
            tickFormatter={(value) => new Date(value).toLocaleDateString()}
          />
          <YAxis
            tick={{ fontSize: 10 }}
            tickFormatter={(value) => formatCurrency(value)}
            width={60}
          />
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <Tooltip
            formatter={(value: number, name: string) => [
              formatCurrency(value),
              name === 'amount' ? 'Actual Expense' : 'Budget',
            ]}
            labelFormatter={(value) => new Date(value).toLocaleDateString()}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '12px',
            }}
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#3B82F6"
            fillOpacity={1}
            fill="url(#colorExpense)"
          />
          {data.some(d => d.budget) && (
            <Area
              type="monotone"
              dataKey="budget"
              stroke="#10B981"
              fillOpacity={1}
              fill="url(#colorBudget)"
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default ChartContainer;
