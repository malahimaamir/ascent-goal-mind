import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Plus, CheckCircle, Circle } from 'lucide-react';
import { AddGoalDialog } from "./AddGoalDialog";

interface Goal {
  id: number;
  title: string;
  description?: string;
  progress: number;
  milestones: number;
  completed: number;
}

interface GoalsViewProps {
  goals: Goal[];
  onAddGoal: (goal: Omit<Goal, 'id' | 'progress' | 'completed'>) => void;
  onToggleMilestone: (goalId: number, milestoneIndex: number) => void;
}

export function GoalsView({ goals, onAddGoal, onToggleMilestone }: GoalsViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Goals & Milestones</h2>
          <p className="text-gray-600">Manage your long-term goals and track milestones</p>
        </div>
        <AddGoalDialog 
          onAddGoal={onAddGoal}
          trigger={
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors">
              <Plus className="h-4 w-4" />
              New Goal
            </button>
          }
        />
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
                    <div 
                      key={i} 
                      className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                      onClick={() => onToggleMilestone(goal.id, i)}
                    >
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
}