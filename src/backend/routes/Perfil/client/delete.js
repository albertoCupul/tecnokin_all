const SchemaPerfilClient = require("../../../public/javascript/modules/mongoDB/models/Perfil/perfilCliente");

async function remove(id) {
  try {
    const Schema = new SchemaPerfilClient();
    const filter = { _id: id };
    const perfil = await Schema.findOne(filter);

    if (!perfil) {
      return null;
    }

    return perfil.remove();
  } catch (error) {
    return false;
  }
}

module.exports = remove;
