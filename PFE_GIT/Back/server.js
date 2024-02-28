const express = require("express");
const cors = require("cors");
const app = express();
const multer = require("multer");
const path = require("path");
const http = require("http");
require("dotenv").config();
require("./connection");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: "*",
  methods: "*",
});

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const imageRoutes = require("./routes/imageRoutes");
const Story = require("./models/Story");
const User = require("./models/User");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/images", imageRoutes);

// Keep track of uploaded videos
const uploadedVideos = [];

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = file.originalname + "-" + uniqueSuffix;
    uploadedVideos.push(filename);
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("video"), async (req, res) => {
  const videoPath = req.file.path;
  const { name } = req.body;

  try {
    const newStory = new Story({
      videoUrl: videoPath,
      name: name,
    });

    const savedStory = await newStory.save();

    res.json({ videoPath: savedStory.videoUrl, likes: savedStory.likes });
  } catch (error) {
    console.error(
      "Erreur lors de l'enregistrement de la vidéo dans la base de données:",
      error
    );
    res.status(500).send("Internal Server Error");
  }
});

app.use("/uploads", express.static("uploads"));

app.get("/videos", async (req, res) => {
  try {
    const videos = await Story.find({}, { __v: 0 });

    res.json({ videos });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des vidéos depuis la base de données:",
      error
    );
    res.status(500).send("Internal Server Error");
  }
});

app.post("/video/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const video = await Story.findOne({ _id: id });

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (video.membersLiked.includes(userId)) {
      return res.status(400).json({ message: "User already liked the video" });
    }

    video.likes += 1;
    video.membersLiked.push(userId);

    await video.save();

    res.json({ video });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

server.listen(8080, () => {
  console.log("server running at port", 8080);
});
