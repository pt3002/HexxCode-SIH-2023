const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const AICTEAdminRouter = require("./routes/AICTEAdmin");
const CurriculumDeveloperRouter = require("./routes/CurriculumDeveloper");

const { port } = require("./config/configKeys");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use("/api/AICTEAdmin", AICTEAdminRouter);
app.use("/api/CurriculumDeveloper", CurriculumDeveloperRouter);

app.get("/api", (req, res) => {
  res.send("This is Shiksha Niyojak");
});

const PORT = port;

app.listen(PORT, () => {
  console.log("✅ Server running on port:", PORT);
});
