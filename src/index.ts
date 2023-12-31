import express, { NextFunction, Request, Response } from "express";
import taskRoutes from "./api/tasks";
import cors from "cors";
import attractionRoutes from "./api/attraction/attraction.routes";
import {
  callFunctionInterval,
  callSeedAttraction,
  seedAttractions,
} from "./api/attraction/attraction.service";
import path from "path";

const app = express();
const port = process.env.PORT || 3030;
app.use(express.json());

// const corsOptions = {
//   origin: [
//     "https://nextjs-blog-zeta-eosin-57.vercel.app",
//     "https://nextjs-blog-ffsvhkhoa-david-ben-ishais-projects.vercel.app"
//   ],
//   credentials: true,
// };
app.use(cors());

app.use("/api/attraction", attractionRoutes);

// Add this error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
callFunctionInterval(callSeedAttraction, 1000 * 60 * 4);

export default app;
