import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use(
  express.static(path.join(__dirname, "public"))
);

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    app: "پزشک‌یار",
    payments: false
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Pezeshkyar is running on port ${PORT}`);
});
