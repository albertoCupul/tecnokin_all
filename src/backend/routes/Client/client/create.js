const SchemaClient = require("../../../public/javascript/modules/mongoDB/models/Clients/clMain");
const middleware = require("../middleware");

async function create(object) {
  try {
    const perfil = await middleware.existReference(
      object.idPerfil,
      "ClientePerfil"
    );
    if (perfil) {
      const Schema = new SchemaClient();
      Schema.name = object.name;
      Schema.first = object.first;
      Schema.second = object.second;
      Schema.idPerfil = object.idPerfil;
      const extraInfo = await middleware.addExtraInfo(Schema._id);
      if (extraInfo !== false && extraInfo !== true) {
        Schema.idCredit = extraInfo.credit;
        Schema.idDetail = extraInfo.detail;
        return await Schema.save();
      }
      return true;
    }
    return null;
  } catch (error) {
    return false;
  }
}

module.exports = create;
