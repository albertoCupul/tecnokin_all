const SchemaClient = require("../../../public/javascript/modules/mongoDB/models/Perfil/perfilCliente");
const middleware = require("./middleware");

async function edit(object) {
  try {

    const existRule = await middleware.existReference(object.idRule,"Rules");

    if (existRule){

      const Schema = new SchemaClient();
      const filter = { _id: object.id };
      const perfil = await Schema.findOne(filter);

      if (!perfil) {
        return null;
      }

      perfil.name = object.name;
      perfil.idRule = object.idRule;
      return await perfil.save();
    }

    return true;
  } catch (error) {
    return false;
  }
}

module.exports = edit;
