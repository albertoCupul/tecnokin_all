const SchemaPerfil = require("../../../public/javascript/modules/mongoDB/models/Perfil/perfilCliente");
const middleware = require("./middleware");

async function create(name, idRule) {
  try {

    const existRule = await middleware.existReference(idRule,"Rules");

    if (existRule){
      const Schema = new SchemaPerfil();
      Schema.name = name;
      Schema.idRule = idRule;
      return await Schema.save();
    }
    return null;
  } catch (error) {
    if (error.code === 11000) {
      return true;
    }
    return false;
  }
}

module.exports = create;
