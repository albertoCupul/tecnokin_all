const SchemaPerfil = require('../../../public/javascript/modules/mongoDB/models/Perfil/perfil');

async function create(name, idRule) {
  try {
    const Schema = new SchemaPerfil();
    Schema.name = name;
    Schema.idRule = idRule;
    await Schema.save();
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = create;
