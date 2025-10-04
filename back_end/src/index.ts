import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import characterRoutes from "./routes/characterRoutes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/characters", characterRoutes);

app.get("/", (req, res) => res.send("Fictional Stage Backend is running 🚀"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));