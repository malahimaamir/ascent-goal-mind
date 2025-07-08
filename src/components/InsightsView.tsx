import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, CheckCircle, Target, Smile } from 'lucide-react';

export function InsightsView() {
  return (
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
}