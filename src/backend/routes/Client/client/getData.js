const SchemaClient = require("../../../public/javascript/modules/mongoDB/models/Clients/clMain");

async function getDataCl(id) {
  try {
    const Schema = new SchemaClient();
    const filter = { _id: id };
    const client = await Schema.findOnePopulate(filter);
    if (!client) {
      return true;
    }
    return client;
  } catch (error) {
    return false;
  }
}

module.exports = getDataCl;
