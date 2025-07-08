
import React, { useState,useEffect } from 'react';
import { Navigation } from "@/components/Navigation";
import { Dashboard } from "@/components/Dashboard";
import { GoalsView } from "@/components/GoalsView";
import { JournalView } from "@/components/JournalView";
import { InsightsView } from "@/components/InsightsView";
import { MindMapView } from "@/components/MindMapView";
import { useToast } from "@/hooks/use-toast";

interface Goal {
  id: number;
  title: string;
  description?: string;
  progress: number;
  milestones: number;
  completed: number;
}

interface JournalEntry {
  id: number;
  date: string;
  mood: string;
  content: string;
  preview: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isEditingMindMap, setIsEditingMindMap] = useState(false);
  const { toast } = useToast();

  // State for goals and journal entries
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, title: "Learn React Development", progress: 75, milestones: 4, completed: 3 },
    { id: 2, title: "Run 5K Marathon", progress: 60, milestones: 5, completed: 3 },
    { id: 3, title: "Read 24 Books This Year", progress: 45, milestones: 24, completed: 11 },
  ]);

  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([
    { id: 1, date: "2024-07-08", mood: "happy", content: "Great progress on my React project today. I learned about hooks and state management. Feeling accomplished!", preview: "Great progress on my React project today..." },
    { id: 2, date: "2024-07-07", mood: "neutral", content: "Feeling motivated to continue my fitness journey. Did a 30-minute workout today.", preview: "Feeling motivated to continue my fitness journey..." },
    { id: 3, date: "2024-07-06", mood: "happy", content: "Finished another chapter of my book. The story is getting really interesting!", preview: "Finished another chapter of my book..." },
  ]);

  // Functions for managing goals and journal entries
  const addGoal = (goalData: Omit<Goal, 'id' | 'progress' | 'completed'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: Date.now(),
      progress: 0,
      completed: 0,
    };
    setGoals(prev => [...prev, newGoal]);
  };

  useEffect(() => {
  const fetchJournals = async () => {
    const res = await fetch("http://localhost:5000/api/journals");
    const data = await res.json();
    if (res.ok) {
      setJournalEntries(data);
    }
  };
  fetchJournals();
}, []);


  const toggleMilestone = (goalId: number, milestoneIndex: number) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        const isCompleting = milestoneIndex >= goal.completed;
        const newCompleted = isCompleting ? milestoneIndex + 1 : milestoneIndex;
        const newProgress = Math.round((newCompleted / goal.milestones) * 100);
        
        toast({
          title: isCompleting ? "Milestone Completed!" : "Milestone Unchecked",
          description: `${goal.title} - Milestone ${milestoneIndex + 1}`,
        });
        
        return {
          ...goal,
          completed: newCompleted,
          progress: newProgress,
        };
      }
      return goal;
    }));
  };

  const addJournalEntry = (entryData: Omit<JournalEntry, 'id' | 'date' | 'preview'>) => {
    const today = new Date().toISOString().split('T')[0];
    const preview = entryData.content.length > 50 
      ? entryData.content.substring(0, 50) + "..." 
      : entryData.content;
    
    const newEntry: JournalEntry = {
      ...entryData,
      id: Date.now(),
      date: today,
      preview,
    };
    setJournalEntries(prev => [newEntry, ...prev]);
  };

  const renderMindMap = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Mind Map Visualizer</h2>
          <p className="text-gray-600">Visualize your goals and their connections</p>
        </div>
        <button 
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => setIsEditingMindMap(!isEditingMindMap)}
        >
          <span className="text-sm font-medium">{isEditingMindMap ? "Done Editing" : "Edit Map"}</span>
        </button>
      </div>

      <MindMapView 
        goals={goals}
        isEditing={isEditingMindMap}
        onToggleEdit={() => setIsEditingMindMap(!isEditingMindMap)}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <Dashboard goals={goals} onAddGoal={addGoal} />
        )}
        {activeTab === 'goals' && (
          <GoalsView 
            goals={goals} 
            onAddGoal={addGoal} 
            onToggleMilestone={toggleMilestone} 
          />
        )}
        {activeTab === 'mindmap' && renderMindMap()}
        {activeTab === 'journal' && (
          <JournalView 
            journalEntries={journalEntries} 
            onAddEntry={addJournalEntry} 
          />
        )}
        {activeTab === 'insights' && <InsightsView />}
      </main>
    </div>
  );
};

export default Index;
