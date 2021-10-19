const SchemaCredit = require("../../../public/javascript/modules/mongoDB/models/Clients/credit");
const middleware = require("../middleware");

async function remove(id) {
  try {
    const Credit = await middleware.existReference(id, "Credit");
    if (Credit) {
      const Schema = new SchemaCredit();
      const filter = { _id: id };
      const perfil = await Schema.findOne(filter);
      return await perfil.remove();
    }
    return null;
  } catch (error) {
    return false;
  }
}

module.exports = remove;
