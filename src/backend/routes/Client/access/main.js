const express = require('express');

const validate = require('../../../public/javascript/modules/validateData/validateUserClient');

const nAccess = require('./create');
const eAccess = require('./edit');
const dAccess = require('./delete');

const respApi = require('../../../public/javascript/modules/reponsesApi/create');

const routeAccess = express.Router();

routeAccess.post('/new', async (req, resp) => {
  try {
    const object = req.body;
    let isValid = false;
    let response;
    if (object) {
      isValid = validate.validateAccessUser(object);
    }
    if (isValid) {
      response = await nAccess(object);
      switch (response) {
        case true:
          response = respApi.createSuccess(
            400,
            "Access Client",
            "New",
            "Ya existe un acceso registrado con ese usuario."
          );
          break;
        case false:
          response = respApi.createSuccess(
            500,
            "Access Client",
            "New",
            "Hubo un error interno en el sistema. Favor de reportarlo a soporte."
          );
          break;
        default:
          response = respApi.createSuccess(
            201,
            "Access Client",
            "New",
            "Acceso creado exitosamente."
          );
          break;
      }
    } else {
      response = respApi.createSuccess(400, "Access Client", 'New', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, "Access Client", 'New', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routeAccess.put('/edit', async (req, resp) => {
  try {
    const object = req.body;
    let isValid = false;
    let response;
    if (object) {
      isValid = validate.validateResetPwd(object);
    }
    if (isValid) {
      response = await eAccess(object);
      switch (response) {
        case 1:
          response = respApi.createSuccess(100, "Access Client", 'Edit', 'Pasword actualizado exitosamente.');
          break;
        case 2:
          response = respApi.createSuccess(400, "Access Client", 'Edit', 'El id de acceso no existe en el sistema.');
          break;
        case 3:
          response = respApi.createSuccess(500, "Access Client", 'Edit', 'Hubo un error al intentar guardar el nuevo password. Favor de reintentar nuevamnete.');
          break;
        default:
          break;
      }
    } else {
      response = respApi.createSuccess(400, "Access Client", 'Edit', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, "Access Client", 'Edit', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routeAccess.delete('/delete/:id', async (req, resp) => {
  try {
    const { id } = req.params;
    let isValid = false;
    let response;
    if (id) {
      isValid = validate.identificador(id);
    }
    if (isValid) {
      response = await dAccess(id);
      switch (response) {
        case 1:
          response = respApi.createSuccess(100, "Access Client", 'Delete', 'Acceso eliminado exitosamente.');
          break;
        case 2:
          response = respApi.createSuccess(400, "Access Client", 'Delete', 'El id de acceso no existe en el sistema.');
          break;
        case 3:
          response = respApi.createSuccess(500, "Access Client", 'Deletes', 'Hubo un error al intentar eliminar la información de acceso. Favor de reintentar nuevamnete.');
          break;
        default:
          break;
      }
    } else {
      response = respApi.createSuccess(400, "Access Client", 'Delete', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, "Access Client", 'Edit', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

module.exports = routeAccess;
