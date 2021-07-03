// // salvar em api/routes/v1/upload.js

// const multer = require("multer");
// const multerConfig = require("../../utils/multer");
// const File = require("../../models/file");

// module.exports = (router) => {
//   router
//     .route("/upload")
//     .post(multer(multerConfig).single("file"), async (req, res) => {
//       const { originalName: name, size, key, location: url = "" } = req.file;

//       const postFile = await File.create({
//         name,
//         size,
//         key,
//         url,
//       });

//       return res.json(postFile);
//     });
// };
