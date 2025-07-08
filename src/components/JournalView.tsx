import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Smile, Meh, Frown } from 'lucide-react';
import { AddJournalDialog } from "./AddJournalDialog";

interface JournalEntry {
  id: number;
  date: string;
  mood: string;
  content: string;
  preview: string;
}

interface JournalViewProps {
  journalEntries: JournalEntry[];
  onAddEntry: (entry: Omit<JournalEntry, 'id' | 'date' | 'preview'>) => void;
}

export function JournalView({ journalEntries, onAddEntry }: JournalViewProps) {
  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'happy': return <Smile className="h-4 w-4 text-green-500" />;
      case 'neutral': return <Meh className="h-4 w-4 text-yellow-500" />;
      case 'sad': return <Frown className="h-4 w-4 text-red-500" />;
      default: return <Smile className="h-4 w-4 text-green-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Daily Journal</h2>
          <p className="text-gray-600">Reflect on your daily experiences and mood</p>
        </div>
        <AddJournalDialog onAddEntry={onAddEntry} />
      </div>

      <div className="grid gap-4">
        {journalEntries.map((entry) => (
          <Card key={entry.id} className="hover:shadow-md transition-shadow cursor-pointer">
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
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}