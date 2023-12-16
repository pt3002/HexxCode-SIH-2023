const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectMongoDB = require("./config/connectMongoDb");

const { auth } = require("./middleware/auth");

const AICTEAdminRouter = require("./routes/AICTEAdmin");
const DeptHeadRouter = require("./routes/DeptHead");
const CurriculumDeveloperRouter = require("./routes/CurriculumDeveloper");
const FilesRouter = require("./routes/File");
const Educator = require("./routes/Educator");
const Calendar = require("./routes/Calendar");
const Forum = require("./routes/Forum");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// Connecting to MongoDB
connectMongoDB();

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use("/api/AICTEAdmin", AICTEAdminRouter);
app.use("/api/DeptHead", DeptHeadRouter);
app.use("/api/Educator", Educator);
app.use("/api/CurriculumDeveloper", CurriculumDeveloperRouter);
app.use("/api/File", FilesRouter);
app.use("/api/Calendar", Calendar);
app.use("/api/Forum", Forum);

app.get("/api/auth", [
  auth,
  (req, res) => {
    if (req.userId && req.userRole && req.userName && req.email) {
      let details = {
        id: req.userId,
        role: req.userRole,
        name: req.userName,
        email: req.email,
      };
      res.send({ details });
    }
  },
]);

app.get("/api", (req, res) => {
  res.send("This is Shiksha Niyojak");
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log("✅ Server running on port:", PORT);
});
