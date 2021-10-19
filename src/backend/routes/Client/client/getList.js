const SchemaClient = require("../../../public/javascript/modules/mongoDB/models/Clients/clMain");

async function getList() {
  try {
    const Schema = new SchemaClient();
    const client = await Schema.find();
    if (!client) {
      return true;
    }
    return client;
  } catch (error) {
    return false;
  }
}

module.exports = getList;
