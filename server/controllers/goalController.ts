import { Request, Response } from "express";
import { Goal } from "../models/Goal";

// Create a new goal
export const createGoal = async (req: Request, res: Response) => {
  try {
    const { title, description, milestones } = req.body;

    const newGoal = new Goal({
      title,
      description,
      milestones,
      progress: 0,
      completed: 0,
    });

    const savedGoal = await newGoal.save();
    res.status(201).json(savedGoal);
  } catch (error) {
    console.error("Create Goal Error:", error);
    res.status(500).json({ message: "Failed to create goal" });
  }
};

// Get all goals
export const getAllGoals = async (req: Request, res: Response) => {
  try {
    const goals = await Goal.find();
    res.json(
      goals.map(goal => ({
        ...goal.toObject(),
        id: goal._id, // convert _id to id for frontend
      }))
    );
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch goals" });
  }
};
