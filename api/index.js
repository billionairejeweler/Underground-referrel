import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🏗️ Example: user joins with CashApp name
app.post("/signup", (req, res) => {
  const { name, cashapp } = req.body;
  if (!name || !cashapp) {
    return res.status(400).json({ error: "Name and CashApp required" });
  }
  console.log("New user:", name, "CashApp:", cashapp);
  res.json({ success: true, message: `Welcome ${name}!` });
});

// ✅ Home route
app.get("/", (req, res) => {
  res.send("SNACKPACKS REFERRAL SYSTEM IS LIVE 🍭💸");
});

// For Vercel deployment
export default app;
