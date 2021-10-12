const express = require('express');

const validate = require('../../../public/javascript/modules/validateData/simpleValidate');

const nPerfil = require('./create');
const ePerfil = require('./edit');
const dPerfil = require('./delete');
const gPerfil = require('./getData');
const gList = require('./getList')

const respApi = require('../../../public/javascript/modules/reponsesApi/create');

const routePerfil = express.Router();

routePerfil.post('/new', async (req, resp) => {
  try {
    const {name} = req.body;
    const {idRule} = req.body;
    let isValidName = false;
    let isValidRule = false;
    let response;
    if (name && idRule) {
      isValidName = validate.name(name);
      isValidRule = validate.identificador(idRule);
    }
    if (isValidName && isValidRule) {
      response = await nPerfil(name, idRule);
      if (response) {
        response = respApi.createSuccess(201, 'Perfil', 'New', 'Perfil creado exitosamente.');
      } else {
        response = respApi.createSuccess(400, 'Perfil', 'New', 'No esta enviando todos los datos requeridos para la creación del perfil.');
      }
    } else {
      response = respApi.createSuccess(400, 'Perfil', 'New', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Perfil', 'New', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routePerfil.put('/edit', async (req, resp) => {
  try {
    const {name} = req.body;
    const {idRule} = req.body;
    const {id} = req.body;
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
      response = await ePerfil({name, idRule, id});
      switch (response) {
        case 1:
          response = respApi.createSuccess(100, 'Perfil', 'Edit', 'Perfil editado exitosamente.');
          break;
        case 2:
          response = respApi.createSuccess(400, 'Perfil', 'Edit', 'Id de Perfil no existe en el sistema.');
          break;
        case 3:
          response = respApi.createSuccess(400, 'Perfil', 'Edit', 'No esta enviando todos los datos requeridos para la creación del perfil.');
          break;
        default:
          break;
      }
    } else {
      response = respApi.createSuccess(400, 'Perfil', 'Edit', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }

    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Perfil', 'New', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routePerfil.delete('/delete/:id', async (req, resp) => {
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
          response = respApi.createSuccess(100, 'Perfil', 'Delete', 'Perfil eliminado exitosamente.');
          break;
        case 2:
          response = respApi.createSuccess(400, 'Perfil', 'Delete', 'Id de Perfil no existe en el sistema.');
          break;
        case 3:
          response = respApi.createSuccess(400, 'Perfil', 'Delete', 'No esta enviando todos los datos requeridos para la alta del usuario.');
          break;
        default:
          break;
      }
    } else {
      response = respApi.createSuccess(400, 'Perfil', 'Delete', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Perfil', 'Delete', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routePerfil.get('/get/:id', async (req, resp) => {
  try {
    const {id} = req.params;
    let isValid = false;
    let response;
    if (id) {
      isValid = validate.identificador(id);      
    }
     if (isValid) {
      response = await gPerfil(id);
      switch (response) {
        case true:
          response = respApi.createSuccess(100, 'Perfil', 'Get Perfil', 'No hay Perfil registrado con ese identificador.');
          break;
        case false:
          response = respApi.createError(500, 'Perfil', 'Get Perfil', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', null);
          break;
        default:
          response = respApi.getSuccess(100, 'Perfil', 'Get Perfil', 'Perfil encontrado exitosamente.', response);  
          break;
      }} else {
      response = respApi.createSuccess(400, 'Perfil', 'Get Perfil', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }    
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Perfil', 'Get Perfil', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routePerfil.get('/getList', async (req, resp) => {
  try {
    let response = await gList();
     switch (response) {
        case true:
          response = respApi.createSuccess(100, 'Perfil', 'Get All', 'No hay Perfils registrado en el sistema.');
          break;
        case false:
          response = respApi.createError(500, 'Perfil', 'Get All', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', null);
          break;
        default:
          response = respApi.getSuccess(100, 'Perfil', 'Get All', 'Perfils encontrados exitosamente.', response);  
          break;
      } 
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Perfil', 'Get All', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

module.exports = routePerfil;