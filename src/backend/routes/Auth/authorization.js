const webToken = require('../../public/javascript/modules/webtoken/token');

const respApi = require('../../public/javascript/modules/reponsesApi/create');

const login = require('../Users/login/login');

async function isAuth(req, resp, next) {
  try {
    let response;
    if (!req.headers.authorization) {
      response = respApi.createSuccess(403, 'Auth', 'Authentication', 'Token vacío.');
      return resp.send(response);
    }

    const token = req.headers.authorization.split(' ')[1];
    response = await webToken.compareToken(token);
    if (response === 2) {
      response = respApi.createSuccess(403, 'Auth', 'Authentication', 'Token incorrecto.');
      return resp.send(response);
    }

    if (response === 3) {
      response = respApi.createSuccess(401, 'Auth', 'Authentication', 'Token expirado.');
      return resp.send(response);
    }
    response = await login(response, false);
    if (response === 1) {
      req.token = token;
      return next();
    }
    const errResponse = respApi.createError(500, 'Auth', 'Authentication', 'Error en Token', 'Hubo un error en los datos almacenados en el token.');
    return resp.send(errResponse);
  } catch (error) {
    const errResponse = respApi.createError(500, 'Auth', 'Authentication', 'Hubo un error inesperado en el sistema. Favor de reportarlo a soporte.', error.message);
    return resp.send(errResponse);
  }
}

module.exports = isAuth;
