const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const { mongoURI } = require("../config/configKeys");

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject({ err: "Error uploading file" });
        }
        var filename =
          buf.toString("hex") + Date.now() + path.extname(file.originalname);

        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const uploadFileGrid = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("file");

exports.uploadFile = (req, res) => {
  uploadFileGrid(req, res, (err) => {
    if (err || !req.file) {
      console.log(err);
      return res.status(500).json({ error: "couldn't upload file" });
    }
    const { filename, originalname, contentType, id } = req.file;
    return res.status(200).json({ filename, originalname, contentType, id });
  });
};

exports.getFileGrid = (req, res) => {
  const filename = req.params && req.params.filename;
  if (!filename) {
    return res.status(400).send({ err: " missing file name" });
  }
  gfs.files.findOne({ filename }, (err, file) => {
    if (err | !file || file.length === 0) {
      return res.status(404).send({ err: "File doesn't exist" });
    }
    const readstream = gfs.createReadStream(file.filename);
    res.header({ "Content-type": file.contentType });
    readstream.on("error", (err) => {
      return res.status(404).send({ err: "Error getting the file" });
    });
    readstream.pipe(res);
    readstream.on("end", function () {
      res.status(201).end();
    });
  });
};

exports.getFileId = (req, res) => {
    const filename = req.params && req.params.filename;
    gfs.files.findOne({"filename": filename}, (err, file) => {
      if(file){
        res.send({id: file._id})
      }
    })
}
