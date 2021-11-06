const getAccess = require("./access/getAccessData");
// const getDetail = require("./details/getData");
// const getPerfil = require("./perfil/getData");
// const getCredit = require("./credit/getData");

const nAccess = require("./access/create");
// const eDetail = require("./details/edit");
// const nCredit = require("./credit/create");

// const dDetail = require("./details/delete");
// const dCredit = require("./credit/delete");

async function existReference(value, schemaName) {
  try {
    let data;
    switch (schemaName) {
      case "Access":
        data = await getAccess(value, false);
        break;
      // case "ClientDetail":
      //   data = await getDetail(id);
      //   break;
      // case "Client":
      //   data = await getClient(id);
      //   break;
      // case "Credit":
      //   data = await getCredit(id);
      //   break;
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

async function addExtraInfo(object, idRoot) {
  try {
    const accessData=JSON.parse(JSON.stringify(object));
    accessData.idUser=idRoot;
    return await nAccess(accessData);    
  } catch (error) {
    return false;
  }
}

// async function editDetail(object) {
//   try {
//     const detail = await eDetail(object);

//     if (detail === null) return false;
//     if (detail === false) return false;

//     return true;
//   } catch (error) {
//     return false;
//   }
// }

// async function deleteExtraInfo(data) {
//   let Detail = null;
//   let Credit = null;
//   try {
//     Detail = await dDetail(data.idDetail);
//     Credit = await dCredit(data.idCredit);
//     return { detail: Detail, credit: Credit };
//   } catch (error) {
//     return false;
//   }
// }

module.exports.existReference = existReference;
module.exports.addExtraInfo = addExtraInfo;
// module.exports.editDetail = editDetail;
// module.exports.deleteExtraInfo = deleteExtraInfo;
