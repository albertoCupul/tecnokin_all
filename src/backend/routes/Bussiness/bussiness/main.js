const express = require('express');

const business = require("../../../public/javascript/modules/validateData/validateBusiness");

const cBusiness = require('./create');
const  eBusiness= require('./edit');
const dBusiness = require('./delete');
const gBusiness = require('./getData')
const lBusiness = require('./getList')

const respApi = require('../../../public/javascript/modules/reponsesApi/create');

const routeBusiness = express.Router();

routeBusiness.post('/new', async (req, resp) => {
  try {
    const object = req.body;
    let isValid = false;
    let response;
    if (object) {
      isValid = business.validate(object, false);      
    }
    if (isValid) {
      response = await cBusiness(object);
      if (response) {
        response = respApi.createSuccess(201, 'Business', 'New', 'Negocio creado exitosamente.');
      } else {
        response = respApi.createSuccess(400, 'Business', 'New', 'Ya existe un negocio registrado con ese usuario.');
      }
    } else {
      response = respApi.createSuccess(400, 'Business', 'New', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Business', 'New', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routeBusiness.put('/edit', async (req, resp) => {
  try {
    const object = req.body;
    let isValid = false;
    let response;
    if (object) {
      isValid = business.validate(object);      
    }
    if (isValid) {
      response = await eBusiness(object);
      switch (response) {
        case 1:
          response = respApi.createSuccess(100, 'Business', 'Edit', 'Negocio editado exitosamente.');  
          break;
        case 2:
          response = respApi.createSuccess(400, 'Business', 'Edit', 'No existe un negocio registrado con ese identificador.');  
          break;
        default:
          response = respApi.createError(500, 'Business', 'Edit', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', response.message);
          break;
      }} else {
      response = respApi.createSuccess(400, 'Business', 'Edit', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Business', 'Edit', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routeBusiness.delete('/delete/:id', async (req, resp) => {
  try {
    const { id } = req.params;
    let isValid = false;
    let response;
    if (id) {
      isValid = business.identificador(id);      
    }
    if (isValid) {
      response = await dBusiness(id);
      switch (response) {
        case 1:
          response = respApi.createSuccess(100, 'Business', 'Delete', 'Negocio eliminado exitosamente.');  
          break;
        case 2:
          response = respApi.createSuccess(400, 'Business', 'Delete', 'No existe un negocio registrado con ese identificador.');  
          break;
        default:
          response = respApi.createError(500, 'Business', 'Delete', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', response.message);
          break;
      }} else {
      response = respApi.createSuccess(400, 'Business', 'Delete', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {    
    const errResponse = respApi.createError(500, 'Business', 'Delete', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routeBusiness.get('/get/:id', async (req, resp)=>{
  try {
    const {id} = req.params;
    let isValid = false;
    let response;
    if (id) {
      isValid = business.identificador(id);      
    }
     if (isValid) {
      response = await gBusiness(id);
      switch (response) {
        case true:
          response = respApi.createSuccess(100, 'Business', 'Get Business', 'No hay negocio registrado con ese identificador.');
          break;
        case false:
          response = respApi.createError(500, 'Business', 'Get Business', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', null);
          break;
        default:
          response = respApi.getSuccess(100, 'Business', 'Get Business', 'Negocio encontrado exitosamente.', response);  
          break;
      }} else {
      response = respApi.createSuccess(400, 'Business', 'Get Business', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Business', 'Get Business', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);    
  }
})

routeBusiness.get('/getList', async (req, resp)=>{
  try {
    let response = await lBusiness();
      switch (response) {
        case true:
          response = respApi.createSuccess(100, 'Business', 'Get List', 'No hay negocios registrados en el sistema.');
          break;
        case false:
          response = respApi.createError(500, 'Business', 'Get List', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', null);
          break;
        default:
          response = respApi.getSuccess(100, 'Business', 'Get List', 'Listado encontrado exitosamente.', response);  
          break;
      }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Business', 'Get List', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);    
  }
})


module.exports = routeBusiness;
