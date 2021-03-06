const SchemaClient = require("../../../public/javascript/modules/mongoDB/models/Perfil/perfilUser");

async function edit(object) {
  try {
    const Schema = new SchemaClient();
    const filter = { _id: object.id };
    const perfil = await Schema.findOne(filter);

    if (!perfil) {
      return 2;
    }

    perfil.name = object.name;
    await perfil.save();
    return 1;
  } catch (error) {
    return 2;
  }
}

module.exports = edit;
