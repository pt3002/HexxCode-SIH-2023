const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectMongoDB = require("./config/connectMongoDb");

const AICTEAdminRouter = require("./routes/AICTEAdmin");
const CurriculumDeveloperRouter = require("./routes/CurriculumDeveloper");
const FilesRouter = require("./routes/File");
const Educator = require("./routes/Educator");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// Connecting to MongoDB
connectMongoDB();

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use("/api/AICTEAdmin", AICTEAdminRouter);
app.use("/api/Educator", Educator);
app.use("/api/CurriculumDeveloper", CurriculumDeveloperRouter);
app.use("/api/File", FilesRouter);

app.get("/api", (req, res) => {
  res.send("This is Shiksha Niyojak");
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log("✅ Server running on port:", PORT);
});
