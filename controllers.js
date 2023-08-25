const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const fs = require("fs");
const AWS = require("aws-sdk");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
//=========================================
require("dotenv").config();
const accesskey = process.env.ACCESSKEY;
const bucketname = process.env.BUCKETNAME;
const seceretaccesskey = process.env.SECERETACCESSKEY;
AWS.config.update({
  accessKeyId: accesskey,
  secretAccessKey: seceretaccesskey,

});
const s3 = new AWS.S3();
//=========================================
const compressVideo = (
  inputPath,
  outputPath,
  resolution,
  bitrate,
  callback
) => {
  ffmpeg.setFfmpegPath(ffmpegPath);

  ffmpeg()
    .input(inputPath)
    .output(outputPath)
    .size(resolution)
    .videoBitrate(bitrate)
    .on("end", () => {
      console.log("Video compression finished");
      callback(null);
    })
    .on("error", (err) => {
      console.error("Error compressing video:", err.message);
      console.error("FFmpeg Error Output:", err);
      callback(err);
    })
    .run();
};

const videoCompressionController = async (req, res) => {
  const videoPath = req.file.path; // Path to the uploaded video file
  const resolution = "176x144";
  const bitrate = "128k";
  const compressedPath = path.join(
    __dirname,
    "/uploads/compressed",
    "compressed_" + path.basename(videoPath)
  );

  compressVideo(videoPath, compressedPath, resolution, bitrate, (error) => {
    if (error) {
      return res.status(500).json({ error: "Error compressing the video" });
    }

    fs.unlink(videoPath, (unlinkError) => {
      if (unlinkError) {
        console.error("Error deleting original video:", unlinkError);
      }

      fs.readFile(compressedPath, (readError, compressedFile) => {
        if (readError) {
          console.error("Error reading compressed file:", readError);
          return res.status(500).json({ error: "Error reading compressed file" });
        }
  //===================================================================================
   // Upload the compressed video file to AWS S3
   const params = {
    Bucket: bucketname,
    Key: '/Compressed'+req.file.name+Date.now(),
    Body: compressedFile,
    ContentType: "video/mp4"
  };    

  s3.upload(params, (s3Error, data) => {
    if (s3Error) {
      console.error("Error uploading compressed file to S3:", s3Error);
      return res.status(500).json({ error: "Error uploading to S3" });
    }
      // Respond with the S3 object URL
      const s3ObjectUrl = data.Location;
      return res.status(200).json({ message: "Video compressed and uploaded to S3", s3ObjectUrl });
    });
      });
    });
  });
};

module.exports = { videoCompressionController };

// const conversions = [
//   { format: "3gp", resolution: "176x144", bitrate: "128k" },
//   { format: "hd", resolution: "1280x720", bitrate: "1500k" },
//   { format: "webp", resolution: "640x480", bitrate: "500k" },
//   { format: "720p", resolution: "1280x720", bitrate: "1500k" },
//   { format: "1080p", resolution: "1920x1080", bitrate: "3000k" },
// ];
