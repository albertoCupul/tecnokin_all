const SchemaPerfilClient = require("../../../public/javascript/modules/mongoDB/models/Perfil/perfilCliente");

async function getClientData(idPerfilClient) {
  try {
    const Schema = new SchemaPerfilClient();
    const filter = { _id: idPerfilClient };
    const perfil = await Schema.findOne(filter);
    if (!perfil) {
      return true;
    }
    return perfil;
  } catch (error) {
    return false;
  }
}

module.exports = getClientData;
