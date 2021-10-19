const SchemaClient = require("../../../public/javascript/modules/mongoDB/models/Clients/clMain");
const middleware = require("../middleware");

async function edit(object) {
  try {
    const perfil = await middleware.existReference(
      object.idPerfil,
      "ClientePerfil"
    );
    const client = await middleware.existReference(object.id, "Client");
    const detail = await middleware.existReference(object.id, "ClientDetail");
    if (perfil && client && detail) {
      const Schema = new SchemaClient();
      const filter = { _id: object.id };
      const data = await Schema.findOne(filter);

      data.name = object.name;
      data.first = object.first;
      data.second = object.second;

      const editDetail = await middleware.editDetail(object);
      if (editDetail) {
        return await data.save();
      }
      return true;
    }

    return null;
  } catch (error) {
    return false;
  }
}

module.exports = edit;
