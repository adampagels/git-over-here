import express from "express";
import cors from "cors";
import repoRoutes from "./routes/repoRoutes";

const app = express();
const PORT = 8080;

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api", repoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
