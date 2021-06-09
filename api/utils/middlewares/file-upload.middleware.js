const path = require("path");
const fs = require("fs");
const formidable = require("formidable");
const fileUtils = require("../file.utils");

//testar KEEP EXTENSION
const fileUpload = (destiny, isUpdate = false) => {
  const form = formidable.IncomingForm();
  form.uploadDir = fileUtils.createAddress("temp");

  return (req, res, next) => {
    form.parse(req, (err, fields, files) => {
      req.body = {
        ...fields,
      };

      if ((!files.image || files.image.name === "") && !isUpdate) {
        return res.status(400).send({
          message: "nao foi possivel realizar a operacao",
          details: ["imagem e obrigatoria"],
        });
      }

      if (files.image) {
        const newName = fileUtils.createName(files.image.type);
        const newPath = fileUtils.createAddress(destiny, newName);
        req.body.image = {
          type: files.image.type,
          originalName: files.image.name,
          originalPath: files.image.path,
          newName,
          newPath,
        };
      }
      return next();
    });
  };
};

module.exports = fileUpload;
