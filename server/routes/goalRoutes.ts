// src/routes/goalRoutes.ts
import express from "express";
import { createGoal, getAllGoals } from "../controllers/goalController";
import {Goal} from "../models/Goal"; // ✅ import the Goal model

const router = express.Router();

// POST /api/goals — Create a new goal
router.post("/goals", createGoal);

// GET /api/goals — Get all goals
router.get("/goals", getAllGoals);

// PATCH /api/goals/:id — Update completed/progress
router.patch("/goals/:id", async (req, res) => {
  try {
    const updated = await Goal.findByIdAndUpdate(
      req.params.id,
      {
        completed: req.body.completed,
        progress: req.body.progress,
      },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

export default router;
