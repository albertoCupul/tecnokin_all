const express = require("express");

const validate = require("../../../public/javascript/modules/validateData/simpleValidate");

const nPerfil = require("./create");
const ePerfil = require("./edit");
const dPerfil = require("./delete");
const gPerfil = require("./getData");
const gList = require("./getList");

const respApi = require("../../../public/javascript/modules/reponsesApi/create");

const routePerfil = express.Router();

routePerfil.post("/new", async (req, resp) => {
  try {
    const { name } = req.body;
    const { idRule } = req.body;
    let isValidName = false;
    let isValidRule = false;
    let response;
    if (name && idRule) {
      isValidName = validate.name(name);
      isValidRule = validate.identificador(idRule);
    }
    if (isValidName && isValidRule) {
      response = await nPerfil(name, idRule);
      switch (response) {
        case true:
          response = respApi.createSuccess(
            400,
            "Perfil Cliente",
            "New",
            "Ya existe un perfil con ese nombre."
          );
          break;
        case false:
          response = respApi.createSuccess(
            500,
            "Perfil Cliente",
            "New",
            "Hubo un error interno en el sistema. Favor de reportarlo a soporte."
          );
          break;
          case null:
            response = respApi.createSuccess(
              400,
              "Perfil Cliente",
              "New",
              "Identificador de regla no existe en el sistema."
            );
            break;
        default:
          response = respApi.createSuccess(
            201,
            "Perfil Cliente",
            "New",
            "Perfil creado exitosamente."
          );
          break;
      }
    } else {
      response = respApi.createSuccess(
        400,
        "Perfil Cliente",
        "New",
        "La información enviada no cumple con las reglas permitidas. Favor de validar"
      );
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(
      500,
      "Perfil Cliente",
      "New",
      "Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.",
      error.message
    );
    resp.send(errResponse);
  }
});

routePerfil.put("/edit", async (req, resp) => {
  try {
    const { name } = req.body;
    const { idRule } = req.body;
    const { id } = req.body;
    let isValidName = false;
    let isValidRule = false;
    let isValidId = false;
    let response;
    if (name && idRule) {
      isValidName = validate.name(name);
      isValidRule = validate.identificador(idRule);
      isValidId = validate.identificador(id);
    }
    if (isValidName && isValidRule && isValidId) {
      response = await ePerfil({ name, idRule, id });
      switch (response) {
        case true:
          response = respApi.createSuccess(
            400,
            "Perfil Cliente",
            "Edit",
            "Identificador de regla no existe en el sistema."
          );
          break;
        case null:
          response = respApi.createSuccess(
            400,
            "Perfil Cliente",
            "Edit",
            "Id de Perfil no existe en el sistema."
          );
          break;
        case false:
          response = respApi.createSuccess(
            500,
            "Perfil Cliente",
            "Edit",
            "Hubo un error interno en el sistema. Favor de reportarlo a soporte."
          );
          break;
        default:
        response = respApi.createSuccess(
          100,
          "Perfil Cliente",
          "Edit",
          "Perfil editado exitosamente."
        );
          break;
      }
    } else {
      response = respApi.createSuccess(
        400,
        "Perfil Cliente",
        "Edit",
        "La información enviada no cumple con las reglas permitidas. Favor de validar"
      );
    }

    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(
      500,
      "Perfil Cliente",
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
    let isValid = false;
    let response;
    if (id) {
      isValid = validate.identificador(id);
    }
    if (isValid) {
      response = await dPerfil(id);
      switch (response) {
        case null:
          response = respApi.createSuccess(
            400,
            "Perfil Cliente",
            "Delete",
            "Id de Perfil no existe en el sistema."
          );
          break;
        case false:
          response = respApi.createSuccess(
            500,
            "Perfil Cliente",
            "Delete",
            "Hubo un error inesperado en el sistema. Favor de reportarlo a soporte."
          );
          break;
        default:
        response = respApi.createSuccess(
          100,
          "Perfil Cliente",
          "Delete",
          "Perfil eliminado exitosamente."
        );
          break;
      }
    } else {
      response = respApi.createSuccess(
        400,
        "Perfil Cliente",
        "Delete",
        "La información enviada no cumple con las reglas permitidas. Favor de validar"
      );
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(
      500,
      "Perfil Cliente",
      "Delete",
      "Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.",
      error.message
    );
    resp.send(errResponse);
  }
});

routePerfil.get("/get/:id", async (req, resp) => {
  try {
    const { id } = req.params;
    let isValid = false;
    let response;
    if (id) {
      isValid = validate.identificador(id);
    }
    if (isValid) {
      response = await gPerfil(id);
      switch (response) {
        case true:
          response = respApi.createSuccess(
            100,
            "Perfil Cliente",
            "Get Perfil",
            "No hay Perfil registrado con ese identificador."
          );
          break;
        case false:
          response = respApi.createError(
            500,
            "Perfil Cliente",
            "Get Perfil",
            "Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.",
            null
          );
          break;
        default:
          response = respApi.getSuccess(
            100,
            "Perfil Cliente",
            "Get Perfil",
            "Perfil encontrado exitosamente.",
            response
          );
          break;
      }
    } else {
      response = respApi.createSuccess(
        400,
        "Perfil Cliente",
        "Get Perfil",
        "La información enviada no cumple con las reglas permitidas. Favor de validar"
      );
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(
      500,
      "Perfil Cliente",
      "Get Perfil",
      "Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.",
      error.message
    );
    resp.send(errResponse);
  }
});

routePerfil.get("/getList", async (req, resp) => {
  try {
    let response = await gList();
    switch (response) {
      case true:
        response = respApi.createSuccess(
          100,
          "Perfil Cliente",
          "Get All",
          "No hay Perfil de usuario registrado en el sistema."
        );
        break;
      case false:
        response = respApi.createError(
          500,
          "Perfil Cliente",
          "Get All",
          "Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.",
          null
        );
        break;
      default:
        response = respApi.getSuccess(
          100,
          "Perfil Cliente",
          "Get All",
          "Perfil de usuario encontrados exitosamente.",
          response
        );
        break;
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(
      500,
      "Perfil Cliente",
      "Get All",
      "Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.",
      error.message
    );
    resp.send(errResponse);
  }
});

module.exports = routePerfil;
