const SchemaClient = require('../../../public/javascript/modules/mongoDB/models/Clients/clMain');

async function getClientData(idClient) {
  try {
    const Schema = new SchemaClient();
    const filter = { _id: idClient };
    const data = await Schema.findOne(filter);
    if (!data) {
      return true;
    }
    return data;
  } catch (error) {
    return false;
  }
}

module.exports = getClientData;
