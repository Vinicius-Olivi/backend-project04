const path = require("path");
const fs = require("fs");
const formidable = require("formidable");
const fileUtils = require("../file.utils");

// const ErrorRegraDeNegocio = require('../errors/erro-regra-negocio');

const postIsValid = (files) => {
  if (!files.image || files.image.name === "") {
    return false;
  }

  return true;
};

const putIsValid = (files) => {
  if (!files.image || files.image.name === "") {
    return false;
  }

  return true;
};

const fileUpload = (destiny, isUpdate = false) => {
  return async (req, res, next) => {
    const form = formidable.IncomingForm({ keepExtensions: true });
    form.uploadDir = fileUtils.createAddress("temp");

    var formfields = await new Promise(function (resolve, reject) {
      form.parse(req, (err, fields, files) => {
        if (err) {
          return reject(err);
        }

        resolve({
          ...fields,
          files,
        });
      });
    });

    const { files, ...fields } = formfields;

    req.body = {
      ...fields,
    };

    if (req.method === "POST") {
      if (!postIsValid(files))
        return res.status(400).send({
          message: "nao foi possivel realizar a operacao",
          details: ["image e obrigatoria"],
        });
    }

    if (files.image && files.image.name !== "") {
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

    next();
  };
};

module.exports = fileUpload;
