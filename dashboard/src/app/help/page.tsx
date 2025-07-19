'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HelpCircle,
  Search,
  Book,
  MessageCircle,
  Mail,
  Phone,
  FileText,
  Video,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Download,
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface HelpResource {
  id: string;
  title: string;
  description: string;
  type: 'guide' | 'video' | 'document';
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function Help() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'How do I generate a monthly expense report?',
      answer: 'To generate a monthly expense report, navigate to the Reports section from the sidebar. Click on "Generate Report" and select "Monthly Report". Choose your desired month and click "Generate". The report will be available for download in PDF or Excel format.',
      category: 'reports',
    },
    {
      id: '2',
      question: 'How can I view district-wise spending breakdown?',
      answer: 'Go to the Districts page from the main navigation. Here you can see all districts with their total spending, population data, and top sectors. You can also search for specific districts and sort by different criteria.',
      category: 'navigation',
    },
    {
      id: '3',
      question: 'What do the different chart colors represent?',
      answer: 'Chart colors are automatically assigned to different categories. In sector charts, each sector has a unique color. In trend charts, green typically indicates positive growth, red indicates decline, and blue represents neutral or average values.',
      category: 'charts',
    },
    {
      id: '4',
      question: 'How do I export data from the dashboard?',
      answer: 'Most pages have an "Export" button in the top-right corner. You can export data in various formats including Excel (.xlsx), CSV (.csv), and PDF. The export will include all currently displayed data with applied filters.',
      category: 'data',
    },
    {
      id: '5',
      question: 'How do I change my notification preferences?',
      answer: 'Go to Settings from the sidebar, then select "Notifications". Here you can toggle various notification types including email notifications, SMS alerts, budget threshold warnings, and report reminders.',
      category: 'settings',
    },
    {
      id: '6',
      question: 'What is the data refresh frequency?',
      answer: 'Dashboard data is updated in real-time as new expense data is received from government agencies. Most charts and statistics reflect the latest available data, typically updated within 24 hours of submission.',
      category: 'data',
    },
  ];

  const helpResources: HelpResource[] = [
    {
      id: '1',
      title: 'Getting Started Guide',
      description: 'Complete guide to navigating the Sri Lanka Government Dashboard',
      type: 'guide',
      url: '#',
      icon: Book,
    },
    {
      id: '2',
      title: 'Video Tutorial: Dashboard Overview',
      description: 'Watch a comprehensive overview of all dashboard features',
      type: 'video',
      url: '#',
      icon: Video,
    },
    {
      id: '3',
      title: 'Report Generation Manual',
      description: 'Step-by-step instructions for generating various types of reports',
      type: 'document',
      url: '#',
      icon: FileText,
    },
    {
      id: '4',
      title: 'Data Export Guidelines',
      description: 'Best practices for exporting and using dashboard data',
      type: 'document',
      url: '#',
      icon: Download,
    },
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'navigation', name: 'Navigation' },
    { id: 'reports', name: 'Reports' },
    { id: 'charts', name: 'Charts & Analytics' },
    { id: 'data', name: 'Data Management' },
    { id: 'settings', name: 'Settings' },
  ];

  const filteredFAQs = faqItems.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Help & Support</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Find answers, guides, and get support for the government dashboard
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 text-center hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-blue-100 rounded-full">
                <MessageCircle className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Get instant help from our support team
            </p>
            <button className="mt-3 text-blue-600 text-sm font-medium hover:text-blue-700">
              Start Chat
            </button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 text-center hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-green-100 rounded-full">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Send us a detailed message
            </p>
            <button className="mt-3 text-green-600 text-sm font-medium hover:text-green-700">
              Send Email
            </button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 text-center hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-purple-100 rounded-full">
                <Phone className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Phone Support</h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Call our helpline for urgent issues
            </p>
            <button className="mt-3 text-purple-600 text-sm font-medium hover:text-purple-700">
              +94 11 234 5678
            </button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 text-center hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Book className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">User Guide</h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Comprehensive documentation
            </p>
            <button className="mt-3 text-yellow-600 text-sm font-medium hover:text-yellow-700">
              View Guide
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                Frequently Asked Questions
              </h3>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search FAQs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>
                </div>
                <div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full sm:w-auto"
                    title="Filter by category"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* FAQ Items */}
              <div className="space-y-3">
                {filteredFAQs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-sm sm:text-base font-medium text-gray-900">
                        {faq.question}
                      </span>
                      {expandedFAQ === faq.id ? (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                    {expandedFAQ === faq.id && (
                      <div className="p-4 border-t border-gray-200 bg-gray-50">
                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {filteredFAQs.length === 0 && (
                <div className="text-center py-8">
                  <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No FAQs found matching your search.</p>
                </div>
              )}
            </div>
          </div>

          {/* Resources Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Help Resources */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                Help Resources
              </h3>
              <div className="space-y-3">
                {helpResources.map(resource => {
                  const Icon = resource.icon;
                  return (
                    <motion.div
                      key={resource.id}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {resource.title}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                          {resource.description}
                        </p>
                        <div className="flex items-center space-x-1 mt-2 text-blue-600 text-xs">
                          <span>Learn more</span>
                          <ExternalLink className="h-3 w-3" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Mail className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Email</div>
                    <div className="text-xs text-gray-600">support@gov.lk</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Phone className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Phone</div>
                    <div className="text-xs text-gray-600">+94 11 234 5678</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <MessageCircle className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Live Chat</div>
                    <div className="text-xs text-gray-600">Mon-Fri, 9 AM - 5 PM</div>
                  </div>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                System Status
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Dashboard</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-600">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API Services</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-600">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Reports</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-600">Operational</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
