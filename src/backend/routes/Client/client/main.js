const express = require("express");

const validate = require("../../../public/javascript/modules/validateData/validateUserClient");

const nClient = require("./create");
const eClient = require("./edit");
const dClient = require("./delete");
const gClient = require("./getData");
const gList = require("./getList");

const respApi = require("../../../public/javascript/modules/reponsesApi/create");

const routeUser = express.Router();

routeUser.post("/new", async (req, resp) => {
  try {
    const object = req.body;
    let isValid = false;
    let response;
    if (object) {
      isValid = validate.validateUser(object);
    }
    if (isValid) {
      response = await nClient(object);
      switch (response) {
        case null:
          response = respApi.createSuccess(
            400,
            "Client",
            "New",
            "El id de perfil asignado al cliente no existe en el sistema."
          );
          break;
        case true:
        case false:
          response = respApi.createSuccess(
            500,
            "Client",
            "New",
            "Hubo un error interno en el programa. Favor de reintentarlo nuevamente."
          );
          break;
        default:
          response = respApi.createSuccess(
            201,
            "Client",
            "New",
            "Cliente creado exitosamente."
          );
          break;
      }
    } else {
      response = respApi.createSuccess(
        400,
        "Client",
        "New",
        "La información enviada no cumple con las reglas permitidas. Favor de validar"
      );
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(
      500,
      "Client",
      "New",
      "Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.",
      error.message
    );
    resp.send(errResponse);
  }
});

routeUser.put("/edit", async (req, resp) => {
  try {
    const object = req.body;
    const idUser = object.id;
    let isValidInfo = false;
    let isValidId = false;
    let response;
    if (object) {
      isValidInfo = validate.validateUser(object);
      isValidId = validate.identificador(idUser);
    }
    if (isValidInfo && isValidId) {
      response = await eClient(object);
      switch (response) {
        case null:
          response = respApi.createSuccess(
            400,
            "Client",
            "Edit",
            "Identificador de cliente, de perfil o de detallado no existe en el sistema."
          );
          break;
        case true:
          response = respApi.createSuccess(
            500,
            "Client",
            "Edit",
            "Hubo un error al intentar guardar la información. Favor de validar nuevamente."
          );
          break;
        case false:
          response = respApi.createSuccess(
            500,
            "Client",
            "Edit",
            "Hubo un error inesperado en el sistema. Favor de reintentar más tarde."
          );
          break;
        default:
          response = respApi.createSuccess(
            100,
            "Client",
            "Edit",
            "Cliente editado exitosamente."
          );
          break;
      }
    } else {
      response = respApi.createSuccess(
        400,
        "Client",
        "Edit",
        "La información enviada no cumple con las reglas permitidas. Favor de validar"
      );
    }

    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(
      500,
      "Client",
      "New",
      "Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.",
      error.message
    );
    resp.send(errResponse);
  }
});

routeUser.delete("/delete/:id", async (req, resp) => {
  try {
    const { id } = req.params;
    let isValid = false;
    let response;
    if (id) {
      isValid = validate.identificador(id);
    }
    if (isValid) {
      response = await dClient(id);
      switch (response) {
        case null:
          response = respApi.createSuccess(
            400,
            "Client",
            "Delete",
            "Id de cliente no existe en el sistema."
          );
          break;
        case false:
          response = respApi.createSuccess(
            500,
            "Client",
            "Delete",
            "Hubo un error interno. Favor de reportar a soporte."
          );
          break;
        case true:
          response = respApi.createSuccess(
            400,
            "Client",
            "Delete",
            "Identificados de crédito y/o detallado de cliente no existen en el sistema."
          );
          break;
        default:
          response = respApi.createSuccess(
            100,
            "Client",
            "Delete",
            "Cliente eliminado exitosamente."
          );
          break;
      }
    } else {
      response = respApi.createSuccess(
        400,
        "Client",
        "Delete",
        "La información enviada no cumple con las reglas permitidas. Favor de validar"
      );
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(
      500,
      "Client",
      "Delete",
      "Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.",
      error.message
    );
    resp.send(errResponse);
  }
});

routeUser.get("/get/:id", async (req, resp) => {
  try {
    const { id } = req.params;
    let isValid = false;
    let response;
    if (id) {
      isValid = validate.identificador(id);
    }
    if (isValid) {
      response = await gClient(id);
      switch (response) {
        case true:
          response = respApi.createSuccess(
            100,
            "Client",
            "Get Client",
            "No hay cliente registrado con ese identificador."
          );
          break;
        case false:
          response = respApi.createError(
            500,
            "Client",
            "Get Client",
            "Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.",
            null
          );
          break;
        default:
          response = respApi.getSuccess(
            100,
            "Client",
            "Get Client",
            "Cliente encontrado exitosamente.",
            response
          );
          break;
      }
    } else {
      response = respApi.createSuccess(
        400,
        "Client",
        "Get Client",
        "La información enviada no cumple con las reglas permitidas. Favor de validar"
      );
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(
      500,
      "Client",
      "Get Client",
      "Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.",
      error.message
    );
    resp.send(errResponse);
  }
});

routeUser.get("/getList", async (req, resp) => {
  try {
    let response = await gList();
    switch (response) {
      case true:
        response = respApi.createSuccess(
          100,
          "Client",
          "Get All",
          "No hay clientes registrado en el sistema."
        );
        break;
      case false:
        response = respApi.createError(
          500,
          "Client",
          "Get All",
          "Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.",
          null
        );
        break;
      default:
        response = respApi.getSuccess(
          100,
          "Client",
          "Get All",
          "Clientes encontrados exitosamente.",
          response
        );
        break;
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(
      500,
      "Client",
      "Get All",
      "Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.",
      error.message
    );
    resp.send(errResponse);
  }
});

module.exports = routeUser;

/** Hacer el getPopulate de cliente y mejorar le populate que una consulta  a la tabla principal extraiga toda la información. */
