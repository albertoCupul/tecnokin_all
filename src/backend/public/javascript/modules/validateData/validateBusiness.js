function name(nombre) {
  const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ_\s]{3,30}$/;
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

function rfc(valor) {
  let resp = false;
  if (valor!==null){
    const regex = /^[a-zA-Z0-9]{12,13}$/;
    resp = regex.test(valor);
  }else {
    resp = true;
  }
  return resp;
}

function status(value){
  if (value===true || value === false){
    return true;
  }
  return false;
}

function phone(telNumber) {
  let isValid = true;
  if (telNumber){
    const regex = /^\d{10}?$/;
    isValid = regex.test(telNumber);
  }
  return isValid;
}

function email(value) {
  const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  const resp = regex.test(value);
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

function message(value, size) {
  /** 58mm soporta 32 caracteres
   * 80mm soporta 48mm */
  let regex;
  let valid = false;
  if (size===58){
    regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ_\s.,:/-_@!¡¿?]{3,32}$/;
  }else {
    regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ_\s.,:/-_@!¡¿?]{3,48}$/;
  }
  if (value!==null) {
    valid = regex.test(value);
  }else {
    valid = true;
  }
  return valid;
}

const validate = (obj, withId = true)=>{
  let isValidId = true;
  const isValidName = name(obj.name);
  const isValidAgent = name(obj.agent);
  const isValidPhone = phone(obj.phone);
  const isValidEmail = email(obj.email);
  const isValidStatus = status (obj.status);
  const isValidRFC = rfc(obj.rfc);
  if (withId){
    isValidId = identificador(obj.id);
  }
  if (isValidId && isValidName && isValidAgent && isValidPhone && isValidEmail && isValidStatus && isValidRFC){
    return true;
  }
  return false;
};

const validateBranch = (obj, withId = true)=>{
  let isValidId = true;
  const isValidName = name (obj.name);
  const isValidAddress = address (obj.address);
  const isValidCity = name (obj.city);
  const isValidState = name(obj.state);
  const isValidPhone = phone (obj.phone);
  const isValidStatus = status (obj.status);
  const isValidIdBusiness = identificador(obj.idBusiness);
  if (withId){
    isValidId = identificador(obj.id);
  }
  if (isValidAddress && isValidName && isValidCity && isValidPhone && isValidState && isValidStatus && isValidIdBusiness && isValidId){
    return true;
  }
  return false;
};

const validateTicket = (obj, withId = true)=>{
  let isValidId = true;
  const isValidGreeting = message (obj.greetings, obj.size);
  const isValidGoodbye = message (obj.goodbye, obj.size);
  const isValidPrint = status (obj.print);
  const isValidIdBranch = identificador(obj.idBranch);
  const isValidPaper = identificador (obj.idPaper);
  if (withId){
    isValidId = identificador(obj.id);
  }
  if (isValidGreeting && isValidGoodbye && isValidPrint && isValidIdBranch && isValidPaper && isValidId){
    return true;
  }
  return false;
};

const validatePaper = (obj, withId = true)=>{
  let isValidId = true;
  const isValidName = message (obj.greetings);
  const isValidValue = message (obj.goodbye);
  if (withId){
    isValidId = identificador(obj.id);
  }
  if (isValidName && isValidValue && isValidId){
    return true;
  }
  return false;
};

module.exports.validate = validate;
module.exports.validateBranch = validateBranch;
module.exports.validateTicket = validateTicket;
module.exports.validatePaper = validatePaper;
module.exports.identificador = identificador;
