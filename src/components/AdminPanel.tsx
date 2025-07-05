import React, { useState } from 'react';
import { Users, TrendingUp, AlertTriangle, BarChart3 } from 'lucide-react';

export interface SurveyResponse {
  question: string;
  answer: string;
  questionId: string;
}

interface AdminPanelProps {
  responses: SurveyResponse[][];
}

const AdminPanel: React.FC<AdminPanelProps> = ({ responses }) => {
  const [selectedTab, setSelectedTab] = useState('overview');
  
  const totalResponses = responses.length;
  
  // Mock AI insights data
  const aiInsights = [
    {
      theme: 'Claims Processing Delays',
      count: 23,
      percentage: 35,
      severity: 'high',
      trend: 'increasing',
      samples: [
        'Claims take too long to process',
        'Employees frustrated with claim delays',
        'Need faster reimbursement process'
      ]
    },
    {
      theme: 'Low Employee Awareness',
      count: 18,
      percentage: 28,
      severity: 'medium',
      trend: 'stable',
      samples: [
        'Employees dont know about all benefits',
        'Need better communication about services',
        'Lack of benefit education'
      ]
    },
    {
      theme: 'Admin Interface Complexity',
      count: 12,
      percentage: 18,
      severity: 'medium',
      trend: 'decreasing',
      samples: [
        'Dashboard is confusing',
        'Too many steps to add employees',
        'Reports are hard to generate'
      ]
    },
    {
      theme: 'Provider Network Issues',
      count: 8,
      percentage: 12,
      severity: 'low',
      trend: 'stable',
      samples: [
        'Limited doctors in our area',
        'Need more specialist options',
        'Preferred providers not available'
      ]
    },
    {
      theme: 'Communication Gaps',
      count: 5,
      percentage: 7,
      severity: 'low',
      trend: 'decreasing',
      samples: [
        'Hard to reach support',
        'Updates not communicated well',
        'Need better notifications'
      ]
    }
  ];

  const satisfactionData = [
    { category: 'Benefits Satisfaction', satisfied: 78, dissatisfied: 22 },
    { category: 'Admin Workflow', satisfied: 65, dissatisfied: 35 },
    { category: 'Support Experience', satisfied: 82, dissatisfied: 18 },
    { category: 'Employee Usage', satisfied: 58, dissatisfied: 42 }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Responses</p>
              <p className="text-2xl font-bold text-gray-900">{totalResponses}</p>
            </div>
            <Users className="w-8 h-8 text-teal-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Satisfaction</p>
              <p className="text-2xl font-bold text-emerald-600">71%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Key Issues</p>
              <p className="text-2xl font-bold text-orange-600">5</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Response Rate</p>
              <p className="text-2xl font-bold text-violet-600">84%</p>
            </div>
            <BarChart3 className="w-8 h-8 text-violet-500" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Satisfaction Breakdown</h3>
          <div className="space-y-4">
            {satisfactionData.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">{item.category}</span>
                  <span className="text-sm text-gray-500">{item.satisfied}% satisfied</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-teal-600 h-2 rounded-full"
                    style={{ width: `${item.satisfied}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Feedback</h3>
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <p className="text-sm text-emerald-800">"The new claims process is much faster now. Great improvement!"</p>
              <span className="text-xs text-emerald-600 mt-1 block">2 hours ago</span>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <p className="text-sm text-orange-800">"Could use better communication about benefit updates."</p>
              <span className="text-xs text-orange-600 mt-1 block">5 hours ago</span>
            </div>
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-sm text-red-800">"Admin interface is still confusing for new users."</p>
              <span className="text-xs text-red-600 mt-1 block">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAIInsights = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <h3 className="text-lg font-bold text-gray-800">AI-Powered Theme Analysis</h3>
        </div>
        <p className="text-gray-600 mb-6">
          Our AI has analyzed {totalResponses} survey responses and identified the following key themes:
        </p>
        
        <div className="space-y-6">
          {aiInsights.map((insight, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    insight.severity === 'high' ? 'bg-red-500' :
                    insight.severity === 'medium' ? 'bg-orange-500' : 'bg-emerald-500'
                  }`} />
                  <h4 className="text-lg font-bold text-gray-800">{insight.theme}</h4>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{insight.count}</p>
                  <p className="text-sm text-gray-500">{insight.percentage}% of responses</p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      insight.severity === 'high' ? 'bg-red-500' :
                      insight.severity === 'medium' ? 'bg-orange-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${insight.percentage}%` }}
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Sample Feedback:</p>
                <div className="space-y-2">
                  {insight.samples.map((sample, idx) => (
                    <p key={idx} className="text-sm text-gray-600 italic">"{sample}"</p>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  insight.severity === 'high' ? 'bg-red-100 text-red-800' :
                  insight.severity === 'medium' ? 'bg-orange-100 text-orange-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {insight.severity.charAt(0).toUpperCase() + insight.severity.slice(1)} Priority
                </span>
                <span className={`text-sm ${
                  insight.trend === 'increasing' ? 'text-red-600' :
                  insight.trend === 'decreasing' ? 'text-emerald-600' : 'text-gray-600'
                }`}>
                  Trend: {insight.trend}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="text-2xl font-light text-lime-400" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              loop
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Survey Analytics Dashboard</h1>
          </div>
          <p className="text-gray-600">Analyze HR feedback and AI-generated insights</p>
        </div>
        
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setSelectedTab('overview')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${selectedTab === 'overview' ? 'border-teal-600 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Overview
              </button>
              <button
                onClick={() => setSelectedTab('ai-insights')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${selectedTab === 'ai-insights' ? 'border-teal-600 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                AI Insights
              </button>
            </nav>
          </div>
        </div>
        {selectedTab === 'overview' && renderOverview()}
        {selectedTab === 'ai-insights' && renderAIInsights()}
      </div>
    </div>
  );
}

export default AdminPanel;