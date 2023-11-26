import cors from "cors";
import express, { Application, Request, Response } from "express";
import userRoutes from "./modules/user/user.route";

const app: Application = express();

// parsers for req info handling
app.use(cors());
app.use(express.json());

// backend home
// app.use("/api", (req: Request, res: Response) => {
//   res.send("Hello PH L2 B2 Assignment2");
// });

// user routes
app.use("/api/users", userRoutes);

export default app;
