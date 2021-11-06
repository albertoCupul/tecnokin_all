const SchemaPerfil = require("../../../public/javascript/modules/mongoDB/models/Perfil/perfilUser");

async function create(name, idRule) {
  try {
    const Schema = new SchemaPerfil();
    Schema.name = name;
    Schema.idRule = idRule;
    return await Schema.save();
  } catch (error) {
    if (error.code === 11000) {
      return true;
    }
    return false;
  }
}

module.exports = create;
