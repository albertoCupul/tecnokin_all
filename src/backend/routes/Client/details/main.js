const express = require('express');

const validate = require('../../../public/javascript/modules/validateData/validateUserClient');

const nDetail = require('./create');
const eDetail = require('./edit');
const dDetail = require('./delete');
const gDetail = require('./getData');

const respApi = require('../../../public/javascript/modules/reponsesApi/create');

const routeDetailClient = express.Router();

routeDetailClient.post('/new', async (req, resp) => {
  try {
    const object = req.body;
    let isValid = false;
    let response;
    if (object) {
      isValid = validate.validateDetailClient(object);
    }
    if (isValid) {
      response = await nDetail(object);
      if (response) {
        response = respApi.createSuccess(201, 'Client Detail', 'New', 'Detallado de cliente creado exitosamente.');
      } else {
        response = respApi.createSuccess(400, 'Client Detail', 'New', 'No esta enviando todos los datos requeridos para la alta del usuario.');
      }
    } else {
      response = respApi.createSuccess(400, 'Client Detail', 'New', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Client Detail', 'New', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routeDetailClient.put('/edit', async (req, resp) => {
  try {
    const object = req.body;
    let isValid = false;
    let response;
    if (object) {
      isValid = validate.validateDetailClient(object);
    }
    if (isValid) {
      response = await eDetail(object);
      switch (response) {
        case 1:
          response = respApi.createSuccess(100, 'Client Detail', 'Edit', 'Detallado de cliente editado exitosamente.');
          break;
        case 2:
          response = respApi.createSuccess(400, 'Client Detail', 'Edit', 'Id de detallado de cliente no existe en el sistema.');
          break;
        case 3:
          response = respApi.createSuccess(400, 'Client Detail', 'Edit', 'No esta enviando todos los datos requeridos para la alta del usuario.');
          break;
        default:
          break;
      }
    } else {
      response = respApi.createSuccess(400, 'Client Detail', 'Edit', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }

    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Client Detail', 'Edit', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routeDetailClient.delete('/delete/:id', async (req, resp) => {
  try {
    const { id } = req.params;
    let isValid = false;
    let response;
    if (id) {
      isValid = validate.identificador(id);
    }
    if (isValid) {
      response = await dDetail(id);
      switch (response) {
        case 1:
          response = respApi.createSuccess(100, 'Client Detail', 'Delete', 'Detallado de cliente eliminado exitosamente.');
          break;
        case 2:
          response = respApi.createSuccess(400, 'Client Detail', 'Delete', 'Id de detallado de cliente no existe en el sistema.');
          break;
        case 3:
          response = respApi.createSuccess(400, 'Client Detail', 'Delete', 'No esta enviando todos los datos requeridos para la alta del usuario.');
          break;
        default:
          break;
      }
    } else {
      response = respApi.createSuccess(400, 'Client Detail', 'Delete', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Client Detail', 'Delete', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routeDetailClient.get('/get/:id', async (req, resp) => {
  try {
    const {id} = req.params;
    let isValid = false;
    let response;
    if (id) {
      isValid = validate.identificador(id);      
    }
     if (isValid) {
      response = await gDetail(id);
      switch (response) {
        case true:
          response = respApi.createSuccess(100, 'Client Detail', 'Get Client', 'No hay Detallado de cliente registrado con ese identificador.');
          break;
        case false:
          response = respApi.createError(500, 'Client Detail', 'Get Client', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', null);
          break;
        default:
          response = respApi.getSuccess(100, 'Client Detail', 'Get Client', 'Detallado de cliente encontrado exitosamente.', response);  
          break;
      }} else {
      response = respApi.createSuccess(400, 'Client Detail', 'Get Client', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }    
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Client Detail', 'Get Client', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

module.exports = routeDetailClient;
