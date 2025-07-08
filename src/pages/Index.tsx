
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, Brain, BookOpen, TrendingUp, Plus, CheckCircle, Circle, Smile, Meh, Frown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for demonstration
  const goals = [
    { id: 1, title: "Learn React Development", progress: 75, milestones: 4, completed: 3 },
    { id: 2, title: "Run 5K Marathon", progress: 60, milestones: 5, completed: 3 },
    { id: 3, title: "Read 24 Books This Year", progress: 45, milestones: 24, completed: 11 },
  ];

  const journalEntries = [
    { date: "2024-07-08", mood: "happy", preview: "Great progress on my React project today..." },
    { date: "2024-07-07", mood: "neutral", preview: "Feeling motivated to continue my fitness journey..." },
    { date: "2024-07-06", mood: "happy", preview: "Finished another chapter of my book..." },
  ];

  const weeklyData = [
    { day: 'Mon', progress: 65, mood: 4 },
    { day: 'Tue', progress: 70, mood: 5 },
    { day: 'Wed', progress: 68, mood: 3 },
    { day: 'Thu', progress: 75, mood: 4 },
    { day: 'Fri', progress: 80, mood: 5 },
    { day: 'Sat', progress: 77, mood: 4 },
    { day: 'Sun', progress: 82, mood: 5 },
  ];

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'happy': return <Smile className="h-4 w-4 text-green-500" />;
      case 'neutral': return <Meh className="h-4 w-4 text-yellow-500" />;
      case 'sad': return <Frown className="h-4 w-4 text-red-500" />;
      default: return <Smile className="h-4 w-4 text-green-500" />;
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back! 🌱</h1>
        <p className="text-gray-600">Your personal growth journey continues. Here's your progress overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-green-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Goals</p>
                <p className="text-2xl font-bold text-green-600">3</p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-blue-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Progress</p>
                <p className="text-2xl font-bold text-blue-600">60%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-purple-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Journal Entries</p>
                <p className="text-2xl font-bold text-purple-600">156</p>
              </div>
              <BookOpen className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-orange-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Streak Days</p>
                <p className="text-2xl font-bold text-orange-600">12</p>
              </div>
              <CheckCircle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Progress</CardTitle>
            <CardDescription>Your daily progress this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="progress" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mood Tracker</CardTitle>
            <CardDescription>Your mood patterns this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[1, 5]} />
                <Tooltip />
                <Bar dataKey="mood" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Goals */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Current Goals</CardTitle>
            <CardDescription>Track your progress on active goals</CardDescription>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Goal
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{goal.title}</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <Progress value={goal.progress} className="flex-1 max-w-xs" />
                    <span className="text-sm text-gray-600">{goal.progress}%</span>
                    <Badge variant="outline">
                      {goal.completed}/{goal.milestones} milestones
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderGoals = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Goals & Milestones</h2>
          <p className="text-gray-600">Manage your long-term goals and track milestones</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          New Goal
        </Button>
      </div>

      <div className="grid gap-6">
        {goals.map((goal) => (
          <Card key={goal.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{goal.title}</CardTitle>
                  <CardDescription>
                    {goal.completed} of {goal.milestones} milestones completed
                  </CardDescription>
                </div>
                <Badge 
                  variant={goal.progress > 50 ? "default" : "secondary"}
                  className={goal.progress > 50 ? "bg-green-500" : ""}
                >
                  {goal.progress}% Complete
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={goal.progress} className="mb-4" />
              
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Milestones:</h4>
                <div className="grid gap-2">
                  {Array.from({ length: goal.milestones }, (_, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      {i < goal.completed ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Circle className="h-4 w-4 text-gray-400" />
                      )}
                      <span className={i < goal.completed ? "text-green-700" : "text-gray-600"}>
                        Milestone {i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderMindMap = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Mind Map Visualizer</h2>
          <p className="text-gray-600">Visualize your goals and their connections</p>
        </div>
        <Button variant="outline">
          <Brain className="h-4 w-4 mr-2" />
          Edit Map
        </Button>
      </div>

      <Card className="h-96">
        <CardContent className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
          <div className="text-center">
            <Brain className="h-16 w-16 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">Mind Map Coming Soon</h3>
            <p className="text-gray-600 mb-4">Interactive visualization of your goals and their relationships</p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Create Your First Map
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderJournal = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Daily Journal</h2>
          <p className="text-gray-600">Reflect on your daily experiences and mood</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          New Entry
        </Button>
      </div>

      <div className="grid gap-4">
        {journalEntries.map((entry, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-gray-600">{entry.date}</span>
                    {getMoodIcon(entry.mood)}
                  </div>
                  <p className="text-gray-700">{entry.preview}</p>
                </div>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderInsights = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Progress Insights</h2>
        <p className="text-gray-600">Analyze your growth patterns and achievements</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Summary</CardTitle>
            <CardDescription>Your achievements this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Goals Progressed</span>
                <span className="font-medium">3/3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Milestones Completed</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Journal Entries</span>
                <span className="font-medium">7/7</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Average Mood</span>
                <div className="flex items-center gap-1">
                  <Smile className="h-4 w-4 text-green-500" />
                  <span className="font-medium">4.3/5</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Growth Trends</CardTitle>
            <CardDescription>Your progress over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-600">15% improvement this month</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-gray-600">12-day streak maintained</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-purple-500" />
                <span className="text-sm text-gray-600">67% average goal completion</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'mindmap', label: 'Mind Map', icon: Brain },
    { id: 'journal', label: 'Journal', icon: BookOpen },
    { id: 'insights', label: 'Insights', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                MindGrow
              </span>
            </div>
            
            <div className="flex space-x-1">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-green-100 text-green-700 shadow-sm'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'goals' && renderGoals()}
        {activeTab === 'mindmap' && renderMindMap()}
        {activeTab === 'journal' && renderJournal()}
        {activeTab === 'insights' && renderInsights()}
      </main>
    </div>
  );
};

export default Index;
