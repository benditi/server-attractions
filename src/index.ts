import express, { NextFunction, Request, Response } from "express";
import taskRoutes from "./api/tasks";
import cors from "cors";
import attractionRoutes from "./api/attraction/attraction.routes";
import { callSeedAttraction, seedAttractions } from "./api/attraction/attraction.service";

const app = express();
const port = process.env.PORT || 3030;

app.use(express.json());
const corsOptions = {
  origin: [
    "http://127.0.0.1:8080",
    "http://localhost:8080",
    "http://127.0.0.1:3000",
    "http://localhost:3000",
  ],
  credentials: true,
};
app.use(cors(corsOptions));
app.use("/tasks", taskRoutes);
app.use("/api/attraction", attractionRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

// Add this error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

seedAttractions() // this function is async
callSeedAttraction()
