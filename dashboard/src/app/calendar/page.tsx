'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Users,
  AlertCircle,
  CheckCircle,
  Calendar as CalendarSolid,
} from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  type: 'budget-review' | 'report-deadline' | 'meeting' | 'audit' | 'presentation';
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  location?: string;
  attendees?: number;
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Q1 Budget Review Meeting',
      description: 'Quarterly review of budget allocation and spending patterns across all ministries',
      date: new Date(2025, 6, 25), // July 25, 2025
      time: '09:00 AM',
      type: 'budget-review',
      status: 'upcoming',
      location: 'Ministry Conference Room A',
      attendees: 15,
    },
    {
      id: '2',
      title: 'Monthly Expense Report Deadline',
      description: 'Submission deadline for all district monthly expense reports',
      date: new Date(2025, 6, 31), // July 31, 2025
      time: '11:59 PM',
      type: 'report-deadline',
      status: 'upcoming',
    },
    {
      id: '3',
      title: 'Infrastructure Spending Audit',
      description: 'External audit of infrastructure sector spending across all districts',
      date: new Date(2025, 7, 5), // August 5, 2025
      time: '10:00 AM',
      type: 'audit',
      status: 'upcoming',
      location: 'Central Audit Office',
      attendees: 8,
    },
    {
      id: '4',
      title: 'Dashboard Presentation to Cabinet',
      description: 'Present government expense dashboard insights to cabinet ministers',
      date: new Date(2025, 7, 12), // August 12, 2025
      time: '02:00 PM',
      type: 'presentation',
      status: 'upcoming',
      location: 'Cabinet Meeting Room',
      attendees: 25,
    },
    {
      id: '5',
      title: 'Healthcare Sector Budget Meeting',
      description: 'Review healthcare sector budget utilization and future allocations',
      date: new Date(2025, 6, 20), // July 20, 2025
      time: '03:00 PM',
      type: 'meeting',
      status: 'completed',
      location: 'Ministry of Health',
      attendees: 12,
    },
  ];

  const getEventTypeColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'budget-review': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'report-deadline': return 'bg-red-100 text-red-800 border-red-200';
      case 'meeting': return 'bg-green-100 text-green-800 border-green-200';
      case 'audit': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'presentation': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: CalendarEvent['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'ongoing': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'cancelled': return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <CalendarSolid className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatEventType = (type: CalendarEvent['type']) => {
    return type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-20 sm:h-24 border border-gray-200"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getEventsForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();

      days.push(
        <div
          key={day}
          className={`h-20 sm:h-24 border border-gray-200 p-1 sm:p-2 cursor-pointer hover:bg-gray-50 transition-colors ${
            isToday ? 'bg-blue-50 border-blue-300' : ''
          } ${isSelected ? 'bg-blue-100 border-blue-400' : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          <div className={`text-xs sm:text-sm font-medium mb-1 ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map(event => (
              <div
                key={event.id}
                className={`text-xs px-1 py-0.5 rounded border ${getEventTypeColor(event.type)} truncate`}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500">
                +{dayEvents.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const upcomingEvents = events
    .filter(event => event.status === 'upcoming' && event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Calendar</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Government expense review schedule and deadlines
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <button className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto">
              <Plus className="h-4 w-4" />
              <span>Add Event</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* Calendar Header */}
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => navigateMonth('prev')}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => setCurrentDate(new Date())}
                      className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Today
                    </button>
                    <button
                      onClick={() => navigateMonth('next')}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <ChevronRight className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="p-4 sm:p-6">
                {/* Day headers */}
                <div className="grid grid-cols-7 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-xs sm:text-sm font-medium text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar days */}
                <div className="grid grid-cols-7 gap-0">
                  {renderCalendarGrid()}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                Upcoming Events
              </h3>
              <div className="space-y-3">
                {upcomingEvents.map(event => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          {getStatusIcon(event.status)}
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {event.title}
                          </h4>
                        </div>
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                          {event.description}
                        </p>
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          <span>{event.date.toLocaleDateString()}</span>
                          <span>{event.time}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-center space-x-1 mt-1 text-xs text-gray-500">
                            <MapPin className="h-3 w-3" />
                            <span className="truncate">{event.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={`inline-block mt-2 px-2 py-1 rounded-full text-xs border ${getEventTypeColor(event.type)}`}>
                      {formatEventType(event.type)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Event Types Legend */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                Event Types
              </h3>
              <div className="space-y-2">
                {[
                  { type: 'budget-review', label: 'Budget Review' },
                  { type: 'report-deadline', label: 'Report Deadline' },
                  { type: 'meeting', label: 'Meeting' },
                  { type: 'audit', label: 'Audit' },
                  { type: 'presentation', label: 'Presentation' },
                ].map(({ type, label }) => (
                  <div key={type} className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded border ${getEventTypeColor(type as CalendarEvent['type'])}`}></div>
                    <span className="text-sm text-gray-700">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
