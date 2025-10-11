import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import characterRoutes from "./routes/characterRoutes";
import songRoutes from "./routes/songRoutes";
import roundRoutes from "./routes/roundRoutes";
import voteRoutes from "./routes/voteRoutes";
import userRoutes from "./routes/userRoutes";
import { execSync } from "child_process";
import { errorHandler } from "./middleware/errorHandler";


if (process.env.NODE_ENV === "development") {
  console.log("🟢 Resetting and seeding database for development...");
  try {
    execSync("npx prisma db push --force-reset --skip-generate && npx prisma db seed", {
      stdio: "inherit",
    });
  } catch (err) {
    console.error("❌ Failed to seed database:", err);
    process.exit(1);
  }
}

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/characters", characterRoutes);
app.use("/songs", songRoutes);
app.use("/rounds", roundRoutes);
app.use("/votes", voteRoutes);

app.use(errorHandler);

app.get("/", (_req, res) => res.send("Fictional Stage Backend is running 🚀"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
