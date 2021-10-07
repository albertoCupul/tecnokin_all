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
    return true
  }
  return false
}

function phone(telNumber) {
  const regex = /^\d{10}?$/;
  const resp = regex.test(telNumber);
  return resp;
}

function email(value) {
  const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  const resp = regex.test(value);
  return resp;
}

const validate = (obj, withId = true)=>{
  let isValidId = true;
  const isValidName = name(obj.name)
  const isValidAgent = name(obj.agent)
  const isValidPhone = phone(obj.phone)
  const isValidEmail = email(obj.email)
  const isValidStatus = status (obj.status)
  const isValidRFC = rfc(obj.rfc)
  console.log(isValidRFC)
  if (withId){
    isValidId = identificador(obj.id)
  }
  if (isValidId && isValidName && isValidAgent && isValidPhone && isValidEmail && isValidStatus && isValidRFC){
    return true
  }
  return false
}

module.exports.validate = validate
module.exports.identificador = identificador