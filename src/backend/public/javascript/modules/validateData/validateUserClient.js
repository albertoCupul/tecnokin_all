function name(nombre) {
  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,30}$/;
  let valid = false;
  if (nombre) {
    valid = regex.test(nombre);
  }
  return valid;
}

function user(nombre) {
  const regex = /^[a-zA-Z0-9]{3,15}$/;
  let valid = false;
  if (nombre) {
    valid = regex.test(nombre);
  }
  return valid;
}

function pwd(nombre) {
  const regex = /^[a-zA-Z0-9&$/%!¡_]{3,30}$/;
  let valid = false;
  if (nombre) {
    valid = regex.test(nombre);
  }
  return valid;
}

function identificador(id) {
  const regex = /^[a-fA-F0-9]{24}$/;
  const resp = regex.test(id);
  return resp;
}

function date(value) {
  try {
    const myDate = new Date(value).valueOf().toString();
    if (myDate === "NaN") {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

function phone(telNumber) {
  const regex = /^\d{10}?$/;
  const resp = regex.test(telNumber);
  return resp;
}

function address(value) {
  const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,#-]{3,200}$/;
  let valid = false;
  if (value) {
    valid = regex.test(value);
  }
  return valid;
}

function rfc(value) {
  const regex =
    /^([A-ZÑ]|&){3,4}[0-9]{2}(0[1-9]|1[0-2])([12][0-9]|0[1-9]|3[01])[A-Z0-9]{3}$/;
  let valid = false;
  if (value) {
    valid = regex.test(value);
  }
  return valid;
}

function isDecimal(value) {
  const regex = /^\d+(.\d+)$/;
  let valid = false;
  if (value) {
    valid = regex.test(value);
  }
  return valid;
}

function validateUser(object) {
  const isValidName = address(object.name);
  const isValidFirst = address(object.first);
  const isValidSecond = object.second ? name(object.second) : true;
  const isValidPhone = object.phone ? phone(object.phone) : true;
  if (isValidName && isValidFirst && isValidSecond && isValidPhone) {
    return true;
  }
  return false;
}

function validateDetailClient(object) {
  const isValidAddress = object.address ? address(object.address) : true;
  const isValidReferences = object.references
    ? address(object.references)
    : true;
  const isValidRFC = object.rfc ? rfc(object.rfc) : true;
  const isValidPhone = object.phone ? phone(object.phone) : true;
  const isValidIdClient = object.idClient
    ? identificador(object.idClient)
    : true;
  if (
    isValidAddress &&
    isValidReferences &&
    isValidRFC &&
    isValidPhone &&
    isValidIdClient
  ) {
    return true;
  }
  return false;
}

function validateAccessUser(object) {
  const isValidUser = user(object.user);
  const isValidPwd = pwd(object.pwd);
  const isValidId = identificador(object.idUser);
  if (isValidUser && isValidPwd && isValidId) {
    return true;
  }
  return false;
}

function validateResetPwd(object) {
  const isValidPwd = pwd(object.pwd);
  const isValidId = identificador(object.id);
  if (isValidPwd && isValidId) {
    return true;
  }
  return false;
}

function login(object) {
  const isValidId = user(object.user);
  const isValidPwd = pwd(object.pwd);
  if (isValidId && isValidPwd) {
    return true;
  }
  return false;
}

function validateCredit(object) {
  const isValidClient = identificador(object.idClient);
  const isValidAmount = isDecimal(object.amount);
  const isValidId = object.id ? identificador(object.id) : true;
  if (isValidClient && isValidAmount && isValidId) {
    return true;
  }
  return false;
}

module.exports.name = name;
module.exports.date = date;
module.exports.identificador = identificador;
module.exports.phone = phone;
module.exports.user = user;
module.exports.validateUser = validateUser;
module.exports.validateAccessUser = validateAccessUser;
module.exports.validateResetPwd = validateResetPwd;
module.exports.login = login;
module.exports.validateDetailClient = validateDetailClient;
module.exports.validateCredit = validateCredit;
