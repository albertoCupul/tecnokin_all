const express = require("express");

const validate = require("../../../public/javascript/modules/validateData/validateUserClient");

const nCredit = require("./create");
const eCredit = require("./edit");
const dCredit = require("./delete");
const gCredit = require("./getData");
// const lCredit = require("./getList");

const respApi = require("../../../public/javascript/modules/reponsesApi/create");

const routePerfil = express.Router();

routePerfil.post("/new", async (req, resp) => {
  try {
    const object = req.body;
    let response;
    const isValid = validate.validateCredit(object);
    if (isValid) {
      response = await nCredit(object);
      switch (response) {
        case null:
          response = respApi.createSuccess(
            400,
            "Crédito Cliente",
            "New",
            "Identificador de cliente no existe en el sistema."
          );
          break;
        case true:
          response = respApi.createSuccess(
            400,
            "Crédito Cliente",
            "New",
            "Identificador de cliente ya tiene asociado un crédito en el sistema."
          );
          break;
        case false:
          response = respApi.createSuccess(
            500,
            "Crédito Cliente",
            "New",
            "Hubo un error interno en el sistema. Favor de reportarlo a soporte."
          );
          break;
        default:
          response = respApi.createSuccess(
            201,
            "Crédito Cliente",
            "New",
            "Crédito añadido exitosamente."
          );
          break;
      }
    } else {
      response = respApi.createSuccess(
        400,
        "Crédito Cliente",
        "New",
        "La información enviada no cumple con las reglas permitidas. Favor de validar"
      );
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(
      500,
      "Crédito Cliente",
      "New",
      "Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.",
      error.message
    );
    resp.send(errResponse);
  }
});

routePerfil.put("/edit", async (req, resp) => {
  try {
    const object = req.body;
    let response;
    const isValid = validate.validateCredit(object);
    if (isValid) {
      response = await eCredit(object);
      switch (response) {
        case null:
          response = respApi.createSuccess(
            400,
            "Crédito Cliente",
            "New",
            "Identificador de cliente o de crédito no existe en el sistema."
          );
          break;
        case false:
          response = respApi.createSuccess(
            500,
            "Crédito Cliente",
            "New",
            "Hubo un error interno en el sistema. Favor de reportarlo a soporte."
          );
          break;
        case true:
          response = respApi.createSuccess(
            400,
            "Crédito Cliente",
            "New",
            "El identificador de crédito no corresponde al cliente enviado."
          );
          break;
        default:
          response = respApi.createSuccess(
            100,
            "Crédito Cliente",
            "New",
            "Crédito actualizado exitosamente."
          );
          break;
      }
    } else {
      response = respApi.createSuccess(
        400,
        "Crédito Cliente",
        "New",
        "La información enviada no cumple con las reglas permitidas. Favor de validar"
      );
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(
      500,
      "Crédito Cliente",
      "New",
      "Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.",
      error.message
    );
    resp.send(errResponse);
  }
});

routePerfil.delete("/delete/:id", async (req, resp) => {
  try {
    const { id } = req.params;
    let response;
    const isValid = validate.identificador(id);
    if (isValid) {
      response = await dCredit(id);
      switch (response) {
        case null:
          response = respApi.createSuccess(
            400,
            "Crédito Cliente",
            "New",
            "Identificador de crédito no existe en el sistema."
          );
          break;
        case false:
        case true:
          response = respApi.createSuccess(
            500,
            "Crédito Cliente",
            "New",
            "Hubo un error interno en el sistema. Favor de reportarlo a soporte."
          );
          break;
        default:
          response = respApi.createSuccess(
            100,
            "Crédito Cliente",
            "New",
            "Crédito eliminado exitosamente."
          );
          break;
      }
    } else {
      response = respApi.createSuccess(
        400,
        "Crédito Cliente",
        "New",
        "La información enviada no cumple con las reglas permitidas. Favor de validar"
      );
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(
      500,
      "Crédito Cliente",
      "New",
      "Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.",
      error.message
    );
    resp.send(errResponse);
  }
});

routePerfil.get("/get/:id", async (req, resp) => {
  try {
    const { id } = req.params;
    let response;
    const isValid = validate.identificador(id);
    if (isValid) {
      response = await gCredit(id);
      switch (response) {
        case true:
          response = respApi.createSuccess(
            400,
            "Crédito Cliente",
            "New",
            "Identificador de crédito no existe en el sistema."
          );
          break;
        case false:
        case null:
          response = respApi.createSuccess(
            500,
            "Crédito Cliente",
            "New",
            "Hubo un error interno en el sistema. Favor de reportarlo a soporte."
          );
          break;
        default:
          response = respApi.getSuccess(
            100,
            "Crédito Cliente",
            "New",
            "Crédito encontrado exitosamente.",
            response
          );
          break;
      }
    } else {
      response = respApi.createSuccess(
        400,
        "Crédito Cliente",
        "New",
        "La información enviada no cumple con las reglas permitidas. Favor de validar"
      );
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(
      500,
      "Crédito Cliente",
      "New",
      "Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.",
      error.message
    );
    resp.send(errResponse);
  }
});

module.exports = routePerfil;
