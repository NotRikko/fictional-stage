import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import characterRoutes from "./routes/characterRoutes";
import { execSync } from "child_process";

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

app.use("/api/characters", characterRoutes);

app.get("/", (req, res) => res.send("Fictional Stage Backend is running 🚀"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
