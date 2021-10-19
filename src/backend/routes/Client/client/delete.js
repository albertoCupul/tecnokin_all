const SchemaClient = require("../../../public/javascript/modules/mongoDB/models/Clients/clMain");
const middleware = require("../middleware");

async function remove(id) {
  try {
    const client = await middleware.existReference(id, "Client");
    if (client) {
      const Schema = new SchemaClient();
      const filter = { _id: id };
      const data = await Schema.findOne(filter);
      const detail = await middleware.existReference(data.id, "ClientDetail");
      const credit = await middleware.existReference(data.idCredit, "Credit");
      if (detail && credit) {
        const deleteExtras = middleware.deleteExtraInfo(data);
        if (deleteExtras !== false && deleteExtras !== null) {
          return await data.remove();
        }
        return false;
      }
      return true;
    }
    return null;
  } catch (error) {
    return false;
  }
}

module.exports = remove;
