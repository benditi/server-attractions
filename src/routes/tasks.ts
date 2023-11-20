import { Router, Request, Response } from "express";
import { Task } from "../models/task";
import { body, validationResult } from "express-validator";
import fs from "fs";

const router = Router();
let tasks: Task[] = [];

const taskValidationRules = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("completed").isBoolean().withMessage("Completed must be a boolean"),
];

// Add your CRUD API implementation here

router.post("/", taskValidationRules, (req: Request, res: Response) => {
    console.log('@@req.body',req.body);
    console.log('@@req.headers',req.headers);
    
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const task: Task = {
    id: tasks.length + 1,
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
  };
  tasks.push(task);
  res.status(201).json(task);
});

router.get("/", (req: Request, res: Response) => {
  res.json(tasks);
});

router.get("/:id", (req: Request, res: Response) => {
  let task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) {
    res.status(404).json("Task not found");
  } else {
    res.json(task);
  }
});

router.put("/:id", taskValidationRules, (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) {
    res.status(404).json("Task not found");
  } else {
    task.completed = req.body.completed;
    task.description = req.body.description;
    task.title = req.body.title;
    res.json(task);
  }
});

router.delete("/:id", (req: Request, res: Response) => {
  let taskIdx = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (taskIdx === -1) {
    res.status(404).json("Task not found");
  } else {
    tasks.splice(taskIdx, 1);
    res.status(204).send();
  }
});
export default router;
