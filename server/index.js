import express from "express";
import cors from "cors";
import { router } from "./routes.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 4000;

/* middlewares */
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

/* petit ping santé */
app.get("/", (_, res) => res.send("Portfolio API is running 🚀"));

app.use("/api", router);

app.listen(PORT, () =>
  console.log(`✓ API ready on http://localhost:${PORT}`)
);