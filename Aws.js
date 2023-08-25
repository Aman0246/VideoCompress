var AWS = require("aws-sdk");
const fs = require("fs");
require("dotenv").config();
const bucketname = process.env.BUCKETNAME;
const accesskey = process.env.ACCESSKEY;
const seceretaccesskey = process.env.SECERETACCESSKEY;

const s3 = new AWS.S3({
  accessKeyId: accesskey,
  secretAccessKey: seceretaccesskey,
});

//upload file to aws3
let uploadFile = (file) => {
  const filestream = fs.createReadStream(file.path);
  var uploadParams = {
    Bucket: bucketname,
    Key: file.mimetype,
    Body: filestream,
    ContentType: "image/JPG", //does not matter
  };
  return new Promise((resolve, reject) => {
    s3.upload(uploadParams, (err, data) => {
      if (err) {
        console.log(err, "hellow");
        reject(err);
      } else {
        console.log("ok");
        resolve(data.Location); // Resolve with the uploaded file URL
      }
    });
  });
};

//download file from aws3

let download = (fileKey) => {
  const downloadParams = {
    key: fileKey,
    Bucket: bucketname,
  };
};

module.exports = { uploadFile };

////////////////////////////////ORIGINAL/////////////////////
// var AWS = require("aws-sdk");

// require("dotenv").config();
// const bucketname = process.env.BUCKETNAME;
// const accesskey = process.env.ACCESSKEY;
// const seceretaccesskey = process.env.SECERETACCESSKEY;

// const s3 = new AWS.S3({
//   accessKeyId: accesskey,
//   secretAccessKey: seceretaccesskey,
// });

// let uploadFile = (file) => {
//   console.log("hellow",file)
//   return new Promise((resolve, reject) => {
//     var uploadParams = {
//       Bucket: bucketname,
//       Key: file.mimetype,
//       Body: file.buffer,
//       ContentType: "image/JPG",
//     };
//     s3.upload(uploadParams, (err, data) => {
//       if (err) {
//         console.log("error")
//         console.log(err,"hellow");
//         reject(err);
//       } else {
//         console.log("ok");
//         resolve(data.Location); // Resolve with the uploaded file URL
//       }
//     });
//   });
// };

// // const uploadimg = async (req, res) => {
// //   try {
// //     let files = req.files;
// //     if (files && files.length > 0) {
// //       const uploadFileUrl = await uploadFile(files[0]);
// //       res.status(201).send({
// //         status: true,
// //         data: uploadFileUrl,
// //       });
// //     }
// //   } catch (error) {
// //     res.status(500).send(error);
// //   }
// // };

// module.exports = { uploadimg };
