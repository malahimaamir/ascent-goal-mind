import mongoose, { Document, Schema } from "mongoose";

// 1. Define TypeScript interface for type safety
export interface IGoal extends Document {
  title: string;
  description?: string;
  milestones: number;
  progress: number;
  completed: number;
}

// 2. Define the schema with matching fields
const GoalSchema = new Schema<IGoal>(
  {
    title: { type: String, required: true },
    description: { type: String },
    milestones: { type: Number, required: true },
    progress: { type: Number, default: 0 },
    completed: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// 3. Export the model with the interface
export const Goal = mongoose.model<IGoal>("Goal", GoalSchema);
