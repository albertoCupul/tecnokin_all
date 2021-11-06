const getClient = require("./client/getData");
const getDetail = require("./details/getData");
const getPerfil = require("../Perfil/client/getData");
const getCredit = require("./credit/getData");
const getAccess = require("./access/getAccessData");

const nDetail = require("./details/create");
const eDetail = require("./details/edit");
const nCredit = require("./credit/create");

const dDetail = require("./details/delete");
const dCredit = require("./credit/delete");

async function existReference(id, schemaName) {
  try {
    let data;
    switch (schemaName) {
      case "ClientePerfil":
        data = await getPerfil(id);
        break;
      case "ClientDetail":
        data = await getDetail(id);
        break;
      case "Client":
        data = await getClient(id);
        break;
      case "Credit":
        data = await getCredit(id);
        break;
      case "ClientAccess":
        data = await getAccess(id);
        break;
      default:
        return false;
    }

    if (data === true) return false;
    if (data === false) return false;

    return true;
  } catch (error) {
    return false;
  }
}

async function addExtraInfo(idClient) {
  let addDetail = null;
  let addCredit = null;
  const object = {
    idClient,
    amount: 0.0,
  };
  try {
    addDetail = await nDetail(object);
    addCredit = await nCredit(object);
    return { detail: addDetail, credit: addCredit };
  } catch (error) {
    addDetail = dDetail(object);
    addCredit = dCredit(object);
    return false;
  }
}

async function editDetail(object) {
  try {
    const detail = await eDetail(object);

    if (detail === null) return false;
    if (detail === false) return false;

    return true;
  } catch (error) {
    return false;
  }
}

async function deleteExtraInfo(data) {
  let Detail = null;
  let Credit = null;
  try {
    Detail = await dDetail(data.idDetail);
    Credit = await dCredit(data.idCredit);
    return { detail: Detail, credit: Credit };
  } catch (error) {
    return false;
  }
}

module.exports.existReference = existReference;
module.exports.addExtraInfo = addExtraInfo;
module.exports.editDetail = editDetail;
module.exports.deleteExtraInfo = deleteExtraInfo;
