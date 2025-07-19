'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Home,
  BarChart3,
  TrendingUp,
  MapPin,
  Building2,
  Calendar,
  FileText,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isMobileMenuOpen: boolean;
  onMobileMenuClose: () => void;
}

const navigation = [
  { name: 'Overview', href: '/', icon: Home },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'District View', href: '/districts', icon: MapPin },
  { name: 'Sector Analysis', href: '/sectors', icon: Building2 },
  { name: 'Trends', href: '/trends', icon: TrendingUp },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
];

const secondaryNavigation = [
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Help', href: '/help', icon: HelpCircle },
];

const Sidebar: React.FC<SidebarProps> = ({ isMobileMenuOpen, onMobileMenuClose }) => {
  const pathname = usePathname();

  const NavItem: React.FC<{
    item: typeof navigation[0];
    isActive: boolean;
  }> = ({ item, isActive }) => {
    const Icon = item.icon;
    
    return (
      <Link
        href={item.href}
        onClick={onMobileMenuClose}
        className={cn(
          'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
          isActive
            ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
        )}
      >
        <Icon
          className={cn(
            'mr-3 flex-shrink-0 h-5 w-5 transition-colors',
            isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
          )}
        />
        {item.name}
        {isActive && (
          <motion.div
            layoutId="activeTab"
            className="absolute left-0 w-1 h-8 bg-blue-600 rounded-r"
          />
        )}
      </Link>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo section */}
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SL</span>
          </div>
          <span className="font-bold text-gray-900">Gov Dashboard</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <div className="space-y-1">
          {navigation.map((item) => (
            <NavItem
              key={item.name}
              item={item}
              isActive={pathname === item.href}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="pt-6">
          <div className="border-t border-gray-200 pt-6">
            <div className="space-y-1">
              {secondaryNavigation.map((item) => (
                <NavItem
                  key={item.name}
                  item={item}
                  isActive={pathname === item.href}
                />
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-blue-50 rounded-lg p-3">
          <h4 className="text-sm font-medium text-blue-900 mb-1">
            Need Help?
          </h4>
          <p className="text-xs text-blue-700 mb-2">
            Contact support for assistance with the dashboard.
          </p>
          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
            Get Support →
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-white border-r border-gray-200">
            {sidebarContent}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
            onClick={onMobileMenuClose}
          />
          
          {/* Mobile menu */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-white lg:hidden"
          >
            {sidebarContent}
          </motion.div>
        </>
      )}
    </>
  );
};

export default Sidebar;
