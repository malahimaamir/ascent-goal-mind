import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Goal {
  id: number;
  title: string;
  description?: string;
  progress: number;
  milestones: number;
  completed: number;
}

interface AddGoalDialogProps {
  onAddGoal: (goal: Omit<Goal, 'id' | 'progress' | 'completed'>) => void;
  trigger?: React.ReactNode;
}

export function AddGoalDialog({ onAddGoal, trigger }: AddGoalDialogProps) {
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    onAddGoal({
      title: data.title,
      description: data.description,
      milestones: parseInt(data.milestones) || 1,
    });
    reset();
    setOpen(false);
    toast({
      title: "Goal Added",
      description: "Your new goal has been created successfully.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Goal
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Goal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Goal Title</Label>
            <Input
              id="title"
              placeholder="e.g., Learn React Development"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message as string}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Describe your goal in detail..."
              {...register("description")}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="milestones">Number of Milestones</Label>
            <Input
              id="milestones"
              type="number"
              min="1"
              max="20"
              defaultValue="3"
              {...register("milestones", { required: "Number of milestones is required" })}
            />
            {errors.milestones && (
              <p className="text-sm text-red-500">{errors.milestones.message as string}</p>
            )}
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Create Goal
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}