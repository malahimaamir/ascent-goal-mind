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
  id: string; // ✅ MongoDB uses string _id
  title: string;
  description?: string;
  progress: number;
  milestones: number;
  completed: number;
}

interface AddGoalDialogProps {
  onAddGoal: (goal: Goal) => void; // ✅ now expects full goal object
  trigger?: React.ReactNode;
}

export function AddGoalDialog({ onAddGoal, trigger }: AddGoalDialogProps) {
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch("http://localhost:5000/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          milestones: parseInt(data.milestones) || 1,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // ✅ Add full goal from backend response (including id, progress, completed)
        onAddGoal({
          id: result._id, // assuming backend sends `_id`
          title: result.title,
          description: result.description,
          milestones: result.milestones,
          progress: result.progress || 0,
          completed: result.completed || 0,
        });

        reset();
        setOpen(false);
        toast({
          title: "Goal Added",
          description: "Your new goal has been saved and added to the list.",
        });
      } else {
        toast({
          title: "Error",
          description: result.message || "Something went wrong.",
        });
      }
    } catch (err) {
      toast({
        title: "Server Error",
        description: "Could not save goal. Try again later.",
      });
      console.error(err);
    }
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
