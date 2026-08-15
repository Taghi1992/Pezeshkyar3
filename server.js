import express from "express";
import path from "node:path";
import {fileURLToPath} from "node:url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (req, res) =>
  res.json({
    ok: true,
    app: "پزشک‌یار",
    payments: false
  })
);

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Pezeshkyar running on ${PORT}`)
);
