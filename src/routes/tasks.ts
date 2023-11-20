import { Router, Request, Response } from "express";
import { Task } from "../models/task";
import fs from "fs";

const router = Router();
let tasks: Task[] = [];

// Add your CRUD API implementation here

router.post("/", (req: Request, res: Response) => {
  const task: Task = {
    id: tasks.length + 1,
    title: req.body.title,
    description: req.body.description,
    completed: false,
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

router.put("/:id", (req: Request, res: Response) => {
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
    tasks.splice(taskIdx,1);
    res.status(204).send();
  }
});
export default router;
