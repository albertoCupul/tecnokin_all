const SchemaPerfilClient = require("../../../public/javascript/modules/mongoDB/models/Perfil/perfilCliente");

async function remove(id) {
  try {
    const Schema = new SchemaPerfilClient();
    const filter = { _id: id };
    const perfil = await Schema.findOne(filter);

    if (!perfil) {
      return 2;
    }

    perfil.remove();
    return 1;
  } catch (error) {
    return 3;
  }
}

module.exports = remove;
