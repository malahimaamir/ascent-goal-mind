import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Smile, Meh, Frown } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface JournalEntry {
  id: number;
  date: string;
  mood: string;
  content: string;
  preview: string;
}

interface AddJournalDialogProps {
  onAddEntry: (entry: Omit<JournalEntry, 'id' | 'date' | 'preview'>) => void;
  trigger?: React.ReactNode;
}

export function AddJournalDialog({ onAddEntry, trigger }: AddJournalDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedMood, setSelectedMood] = React.useState('happy');
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const moods = [
    { value: 'happy', icon: Smile, label: 'Happy', color: 'text-green-500' },
    { value: 'neutral', icon: Meh, label: 'Neutral', color: 'text-yellow-500' },
    { value: 'sad', icon: Frown, label: 'Sad', color: 'text-red-500' },
  ];

  const onSubmit = (data: any) => {
    onAddEntry({
      mood: selectedMood,
      content: data.content,
    });
    reset();
    setSelectedMood('happy');
    setOpen(false);
    toast({
      title: "Journal Entry Added",
      description: "Your thoughts have been saved.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            New Entry
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Journal Entry</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>How are you feeling today?</Label>
            <div className="flex space-x-2">
              {moods.map((mood) => {
                const IconComponent = mood.icon;
                return (
                  <button
                    key={mood.value}
                    type="button"
                    onClick={() => setSelectedMood(mood.value)}
                    className={`flex items-center space-x-2 p-3 rounded-lg border transition-all ${
                      selectedMood === mood.value
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <IconComponent className={`h-5 w-5 ${mood.color}`} />
                    <span className="text-sm">{mood.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">What's on your mind?</Label>
            <Textarea
              id="content"
              placeholder="Write about your day, thoughts, feelings, or any reflections..."
              rows={6}
              {...register("content", { required: "Please write something" })}
            />
            {errors.content && (
              <p className="text-sm text-red-500">{errors.content.message as string}</p>
            )}
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              Save Entry
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}