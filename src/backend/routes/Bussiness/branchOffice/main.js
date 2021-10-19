const express = require('express');

const branch = require("../../../public/javascript/modules/validateData/validateBusiness");

const cBusiness = require('./create');
const  eBusiness= require('./edit');
const dBusiness = require('./delete');
const gBusiness = require('./getData')
const lBusiness = require('./getList')

const respApi = require('../../../public/javascript/modules/reponsesApi/create');

const routeBranch = express.Router();

routeBranch.post('/new', async (req, resp) => {
  try {
    const object = req.body;
    let isValid = false;
    let response;
    if (object) {
      isValid = branch.validateBranch(object, false);      
    }
    if (isValid) {
      response = await cBusiness(object);
      if (response) {
        response = respApi.createSuccess(201, 'Branch', 'New', 'Sucursal creado exitosamente.');
      } else {
        response = respApi.createSuccess(400, 'Branch', 'New', 'Ya existe un sucursal registrado con ese usuario.');
      }
    } else {
      response = respApi.createSuccess(400, 'Branch', 'New', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Branch', 'New', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routeBranch.put('/edit', async (req, resp) => {
  try {
    const object = req.body;
    let isValid = false;
    let response;
    if (object) {
      isValid = branch.validateBranch(object);      
    }
    if (isValid) {
      response = await eBusiness(object);
      switch (response) {
        case 1:
          response = respApi.createSuccess(100, 'Branch', 'Edit', 'Sucursal editado exitosamente.');  
          break;
        case 2:
          response = respApi.createSuccess(400, 'Branch', 'Edit', 'No existe un Sucursal registrado con ese identificador.');  
          break;
        default:
          response = respApi.createError(500, 'Branch', 'Edit', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', response.message);
          break;
      }} else {
      response = respApi.createSuccess(400, 'Branch', 'Edit', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Branch', 'Edit', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routeBranch.delete('/delete/:id', async (req, resp) => {
  try {
    const { id } = req.params;
    let isValid = false;
    let response;
    if (id) {
      isValid = branch.identificador(id);      
    }
    if (isValid) {
      response = await dBusiness(id);
      switch (response) {
        case 1:
          response = respApi.createSuccess(100, 'Branch', 'Delete', 'Sucursal eliminado exitosamente.');  
          break;
        case 2:
          response = respApi.createSuccess(400, 'Branch', 'Delete', 'No existe un Sucursal registrado con ese identificador.');  
          break;
        default:
          response = respApi.createError(500, 'Branch', 'Delete', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', response.message);
          break;
      }} else {
      response = respApi.createSuccess(400, 'Branch', 'Delete', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {    
    const errResponse = respApi.createError(500, 'Branch', 'Delete', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routeBranch.get('/get/:id', async (req, resp)=>{
  try {
    const {id} = req.params;
    let isValid = false;
    let response;
    if (id) {
      isValid = branch.identificador(id);      
    }
     if (isValid) {
      response = await gBusiness(id);
      switch (response) {
        case true:
          response = respApi.createSuccess(100, 'Branch', 'Get Branch', 'No hay Sucursal registrado con ese identificador.');
          break;
        case false:
          response = respApi.createError(500, 'Branch', 'Get Branch', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', null);
          break;
        default:
          response = respApi.getSuccess(100, 'Branch', 'Get Branch', 'Sucursal encontrado exitosamente.', response);  
          break;
      }} else {
      response = respApi.createSuccess(400, 'Branch', 'Get Branch', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Branch', 'Get Branch', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);    
  }
})

routeBranch.get('/getList/', async (req, resp)=>{
  try {      
      let response = await lBusiness();    
      switch (response) {
        case true:
          response = respApi.createSuccess(100, 'Branch', 'Get List', 'No hay Sucursals registrados en el sistema.');
          break;
        case false:
          response = respApi.createError(500, 'Branch', 'Get List', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', null);
          break;
        default:
          response = respApi.getSuccess(100, 'Branch', 'Get List', 'Listado encontrado exitosamente.', response);  
          break;
      }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Branch', 'Get List', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);    
  }
})

routeBranch.get('/getList/:idBusiness', async (req, resp)=>{
  try {      
    const {idBusiness} = req.params
    const isValid = branch.identificador(idBusiness);    
    let response;
    if (isValid){
      response = await lBusiness(idBusiness);    
    }
    switch (response) {
      case true:
        response = respApi.createSuccess(400, 'Branch', 'Get List', 'No hay Sucursals registrados en el sistema para ese negocio.');
        break;
      case false:
        response = respApi.createError(500, 'Branch', 'Get List', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', null);
        break;
      default:
        response = respApi.getSuccess(100, 'Branch', 'Get List', 'Listado de suscursales encontrado exitosamente.', response);  
        break;
      }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Branch', 'Get List', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);    
  }
})


module.exports = routeBranch;
