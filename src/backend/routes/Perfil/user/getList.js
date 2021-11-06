const SchemaClient = require("../../../public/javascript/modules/mongoDB/models/Perfil/perfilUser");

async function getList() {
  try {
    const Schema = new SchemaClient();
    const perfil = await Schema.find();
    if (!perfil) {
      return true;
    }
    return perfil;
  } catch (error) {
    return false;
  }
}

module.exports = getList;
