const SchemaClientDetail = require('../../../public/javascript/modules/mongoDB/models/Clients/details');

async function getClientData(idClient) {
  try {
    const Schema = new SchemaClientDetail();
    const filter = { idClient };
    const data = await Schema.findOnePopulate(filter);
    if (!data) {
      return true;
    }
    return data;
  } catch (error) {
    return false;
  }
}

module.exports = getClientData;
