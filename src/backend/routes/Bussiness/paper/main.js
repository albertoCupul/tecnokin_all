const express = require('express');

const Paper = require("../../../public/javascript/modules/validateData/validateBusiness");

const cPaper = require('./create');
const  ePaper= require('./edit');
const dPaper = require('./delete');
const gPaper = require('./getData')
const lPaper = require('./getList')

const respApi = require('../../../public/javascript/modules/reponsesApi/create');

const routePaper = express.Router();

routePaper.post('/new', async (req, resp) => {
  try {
    const object = req.body;
    let isValid = false;
    let response;
    if (object) {
      isValid = Paper.validatePaper(object, false);      
    }
    if (isValid) {
      response = await cPaper(object);
      if (response) {
        response = respApi.createSuccess(201, 'Paper', 'New', 'Medida creado exitosamente.');
      } else {
        response = respApi.createSuccess(400, 'Paper', 'New', 'Ya existe una medida registrado con ese nombre.');
      }
    } else {
      response = respApi.createSuccess(400, 'Paper', 'New', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Paper', 'New', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routePaper.put('/edit', async (req, resp) => {
  try {
    const object = req.body;
    let isValid = false;
    let response;
    if (object) {
      isValid = Paper.validatePaper(object);      
    }
    if (isValid) {
      response = await ePaper(object);
      switch (response) {
        case 1:
          response = respApi.createSuccess(100, 'Paper', 'Edit', 'Medida editado exitosamente.');  
          break;
        case 2:
          response = respApi.createSuccess(400, 'Paper', 'Edit', 'No existe una medida registrado con ese identificador.');  
          break;
        default:
          response = respApi.createError(500, 'Paper', 'Edit', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', response.message);
          break;
      }} else {
      response = respApi.createSuccess(400, 'Paper', 'Edit', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Paper', 'Edit', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routePaper.delete('/delete/:id', async (req, resp) => {
  try {
    const { id } = req.params;
    let isValid = false;
    let response;
    if (id) {
      isValid = Paper.identificador(id);      
    }
    if (isValid) {
      response = await dPaper(id);
      switch (response) {
        case 1:
          response = respApi.createSuccess(100, 'Paper', 'Delete', 'Medida eliminada exitosamente.');  
          break;
        case 2:
          response = respApi.createSuccess(400, 'Paper', 'Delete', 'No existe una medida registrado con ese identificador.');  
          break;
        default:
          response = respApi.createError(500, 'Paper', 'Delete', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', response.message);
          break;
      }} else {
      response = respApi.createSuccess(400, 'Paper', 'Delete', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {    
    const errResponse = respApi.createError(500, 'Paper', 'Delete', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routePaper.get('/get/:id', async (req, resp)=>{
  try {
    const {id} = req.params;
    let isValid = false;
    let response;
    if (id) {
      isValid = Paper.identificador(id);      
    }
     if (isValid) {
      response = await gPaper(id);
      switch (response) {
        case true:
          response = respApi.createSuccess(100, 'Paper', 'Get Paper', 'No hay medida registrada con ese identificador.');
          break;
        case false:
          response = respApi.createError(500, 'Paper', 'Get Paper', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', null);
          break;
        default:
          response = respApi.getSuccess(100, 'Paper', 'Get Paper', 'Medida encontrado exitosamente.', response);  
          break;
      }} else {
      response = respApi.createSuccess(400, 'Paper', 'Get Paper', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Paper', 'Get Paper', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);    
  }
})

routePaper.get('/getList', async (req, resp)=>{
  try {
    let response = await lPaper();
      switch (response) {
        case true:
          response = respApi.createSuccess(100, 'Paper', 'Get List', 'No hay medida registradas en el sistema.');
          break;
        case false:
          response = respApi.createError(500, 'Paper', 'Get List', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', null);
          break;
        default:
          response = respApi.getSuccess(100, 'Paper', 'Get List', 'Listado encontrado exitosamente.', response);  
          break;
      }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Paper', 'Get List', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);    
  }
})


module.exports = routePaper;
