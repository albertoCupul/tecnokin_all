const SchemaClient = require('../../../public/javascript/modules/mongoDB/models/Clients/clMain');

async function remove(id) {
  try {
    const Schema = new SchemaClient();
    const filter = { _id: id };
    const client = await Schema.findOne(filter);

    if (!client) {
      return 2;
    }

    client.remove();
    return 1;
  } catch (error) {
    return 3;
  }
}

module.exports = remove;
