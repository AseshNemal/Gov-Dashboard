export interface ExpenseData {
  _id: string;
  date: string;
  total_expenses: number;
  districts: {
    [key: string]: {
      total: number;
      sectors: {
        [key: string]: number;
      };
    };
  };
  summary: {
    total_daily_expenses: number;
    total_districts: number;
    avg_per_district: number;
    highest_spending_district: string;
    lowest_spending_district: string;
  };
}

export interface DistrictData {
  name: string;
  total: number;
  sectors: {
    [key: string]: number;
  };
}

export interface SectorData {
  name: string;
  amount: number;
  percentage: number;
}

export interface DashboardStats {
  totalExpenses: number;
  totalDistricts: number;
  avgPerDistrict: number;
  highestSpendingDistrict: string;
  lowestSpendingDistrict: string;
  todayExpenses: number;
  monthlyGrowth: number;
  yearlyGrowth: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  fill?: string;
}

export interface LineChartDataPoint {
  date: string;
  amount: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
