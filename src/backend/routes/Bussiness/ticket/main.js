const express = require('express');

const Ticket = require("../../../public/javascript/modules/validateData/validateBusiness");

const cTicket = require('./create');
const  eTicket= require('./edit');
const dTicket = require('./delete');
const gTicket = require('./getData')
const lTicket = require('./getList')

const respApi = require('../../../public/javascript/modules/reponsesApi/create');

const routeTicket = express.Router();

routeTicket.post('/new', async (req, resp) => {
  try {
    const object = req.body;
    let isValid = false;
    let response;
    if (object) {
      isValid = Ticket.validateTicket(object, false);      
    }
    if (isValid) {
      response = await cTicket(object);
      if (response) {
        response = respApi.createSuccess(201, 'Ticket', 'New', 'Ticket creado exitosamente.');
      } else {
        response = respApi.createSuccess(400, 'Ticket', 'New', 'Ya existe un ticket registrado con ese usuario.');
      }
    } else {
      response = respApi.createSuccess(400, 'Ticket', 'New', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Ticket', 'New', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routeTicket.put('/edit', async (req, resp) => {
  try {
    const object = req.body;
    let isValid = false;
    let response;
    if (object) {
      isValid = Ticket.validateTicket(object);      
    }
    if (isValid) {
      response = await eTicket(object);
      switch (response) {
        case 1:
          response = respApi.createSuccess(100, 'Ticket', 'Edit', 'Ticket editado exitosamente.');  
          break;
        case 2:
          response = respApi.createSuccess(400, 'Ticket', 'Edit', 'No existe un ticket registrado con ese identificador.');  
          break;
        default:
          response = respApi.createError(500, 'Ticket', 'Edit', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', response.message);
          break;
      }} else {
      response = respApi.createSuccess(400, 'Ticket', 'Edit', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Ticket', 'Edit', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routeTicket.delete('/delete/:id', async (req, resp) => {
  try {
    const { id } = req.params;
    let isValid = false;
    let response;
    if (id) {
      isValid = Ticket.identificador(id);      
    }
    if (isValid) {
      response = await dTicket(id);
      switch (response) {
        case 1:
          response = respApi.createSuccess(100, 'Ticket', 'Delete', 'Ticket eliminado exitosamente.');  
          break;
        case 2:
          response = respApi.createSuccess(400, 'Ticket', 'Delete', 'No existe un ticket registrado con ese identificador.');  
          break;
        default:
          response = respApi.createError(500, 'Ticket', 'Delete', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', response.message);
          break;
      }} else {
      response = respApi.createSuccess(400, 'Ticket', 'Delete', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {    
    const errResponse = respApi.createError(500, 'Ticket', 'Delete', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);
  }
});

routeTicket.get('/get/:id', async (req, resp)=>{
  try {
    const {id} = req.params;
    let isValid = false;
    let response;
    if (id) {
      isValid = Ticket.identificador(id);      
    }
     if (isValid) {
      response = await gTicket(id);
      switch (response) {
        case true:
          response = respApi.createSuccess(100, 'Ticket', 'Get Ticket', 'No hay ticket registrado con ese identificador.');
          break;
        case false:
          response = respApi.createError(500, 'Ticket', 'Get Ticket', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', null);
          break;
        default:
          response = respApi.getSuccess(100, 'Ticket', 'Get Ticket', 'Ticket encontrado exitosamente.', response);  
          break;
      }} else {
      response = respApi.createSuccess(400, 'Ticket', 'Get Ticket', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Ticket', 'Get Ticket', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);    
  }
})

routeTicket.get('/getList', async (req, resp)=>{
  try {
    let response = await lTicket();
      switch (response) {
        case true:
          response = respApi.createSuccess(100, 'Ticket', 'Get List', 'No hay tickets registrados en el sistema.');
          break;
        case false:
          response = respApi.createError(500, 'Ticket', 'Get List', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', null);
          break;
        default:
          response = respApi.getSuccess(100, 'Ticket', 'Get List', 'Listado encontrado exitosamente.', response);  
          break;
      }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Ticket', 'Get List', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);    
  }
})

routeTicket.get('/getList/:idBranch', async (req, resp)=>{
  try {
     const {idBranch} = req.params;
     let isValid=false;
     let response;
    if (idBranch) {
      isValid = Ticket.identificador(idBranch);      
    }
    if (isValid){
      response = await lTicket(idBranch);
        switch (response) {
          case true:
            response = respApi.createSuccess(100, 'Ticket', 'Get List', 'No hay tickets registrados en el sistema.');
            break;
          case false:
            response = respApi.createError(500, 'Ticket', 'Get List', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', null);
            break;
          default:
            response = respApi.getSuccess(100, 'Ticket', 'Get List', 'Listado encontrado exitosamente.', response);  
            break;
        }      
    } else {
      response = respApi.createSuccess(400, 'Ticket', 'Delete', 'La información enviada no cumple con las reglas permitidas. Favor de validar');
    }
    resp.send(response);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Ticket', 'Get List', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    resp.send(errResponse);    
  }
})


module.exports = routeTicket;
