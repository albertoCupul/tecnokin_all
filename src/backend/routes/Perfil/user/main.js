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
    let isValidName = false;
    let response;
    if (name) {
      isValidName = validate.name(name);
    }
    if (isValidName) {
      response = await nPerfil(name);
      switch (response) {
        case true:
          response = respApi.createSuccess(
            400,
            "Perfil Usuario",
            "New",
            "Ya existe un perfil con ese nombre."
          );
          break;
        case false:
          response = respApi.createSuccess(
            400,
            "Perfil Usuario",
            "New",
            "Hubo un error interno en el sistema. Favor de reportarlo a soporte."
          );
          break;
        default:
          response = respApi.createSuccess(
            201,
            "Perfil Usuario",
            "New",
            "Perfil creado exitosamente."
          );
          break;
      }
    } else {
      response = respApi.createSuccess(
        400,
        "Perfil Usuario",
        "New",
        "La información enviada no cumple con las reglas permitidas. Favor de validar"
      );
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(
      500,
      "Perfil Usuario",
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
    const { id } = req.body;
    let isValidName = false;
    let isValidId = false;
    let response;
    if (name) {
      isValidName = validate.name(name);
      isValidId = validate.identificador(id);
    }
    if (isValidName  && isValidId) {
      response = await ePerfil({ name, id });
      switch (response) {
        case 1:
          response = respApi.createSuccess(
            100,
            "Perfil Usuario",
            "Edit",
            "Perfil editado exitosamente."
          );
          break;
        case 2:
          response = respApi.createSuccess(
            400,
            "Perfil Usuario",
            "Edit",
            "Id de Perfil no existe en el sistema."
          );
          break;
        case 3:
          response = respApi.createSuccess(
            400,
            "Perfil Usuario",
            "Edit",
            "No esta enviando todos los datos requeridos para la creación del perfil."
          );
          break;
        default:
          break;
      }
    } else {
      response = respApi.createSuccess(
        400,
        "Perfil Usuario",
        "Edit",
        "La información enviada no cumple con las reglas permitidas. Favor de validar"
      );
    }

    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(
      500,
      "Perfil Usuario",
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
        case 1:
          response = respApi.createSuccess(
            100,
            "Perfil Usuario",
            "Delete",
            "Perfil eliminado exitosamente."
          );
          break;
        case 2:
          response = respApi.createSuccess(
            400,
            "Perfil Usuario",
            "Delete",
            "Id de Perfil no existe en el sistema."
          );
          break;
        case 3:
          response = respApi.createSuccess(
            400,
            "Perfil Usuario",
            "Delete",
            "No esta enviando todos los datos requeridos para la alta del usuario."
          );
          break;
        default:
          break;
      }
    } else {
      response = respApi.createSuccess(
        400,
        "Perfil Usuario",
        "Delete",
        "La información enviada no cumple con las reglas permitidas. Favor de validar"
      );
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(
      500,
      "Perfil Usuario",
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
            "Perfil Usuario",
            "Get Perfil",
            "No hay Perfil registrado con ese identificador."
          );
          break;
        case false:
          response = respApi.createError(
            500,
            "Perfil Usuario",
            "Get Perfil",
            "Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.",
            null
          );
          break;
        default:
          response = respApi.getSuccess(
            100,
            "Perfil Usuario",
            "Get Perfil",
            "Perfil encontrado exitosamente.",
            response
          );
          break;
      }
    } else {
      response = respApi.createSuccess(
        400,
        "Perfil Usuario",
        "Get Perfil",
        "La información enviada no cumple con las reglas permitidas. Favor de validar"
      );
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(
      500,
      "Perfil Usuario",
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
          "Perfil Usuario",
          "Get All",
          "No hay Perfil de usuario registrado en el sistema."
        );
        break;
      case false:
        response = respApi.createError(
          500,
          "Perfil Usuario",
          "Get All",
          "Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.",
          null
        );
        break;
      default:
        response = respApi.getSuccess(
          100,
          "Perfil Usuario",
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
      "Perfil Usuario",
      "Get All",
      "Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.",
      error.message
    );
    resp.send(errResponse);
  }
});

module.exports = routePerfil;
