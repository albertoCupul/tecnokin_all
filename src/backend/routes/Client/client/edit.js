const SchemaClient = require('../../../public/javascript/modules/mongoDB/models/Clients/clMain');

async function edit(object) {
  try {
    const Schema = new SchemaClient();
    const filter = { _id: object.id };
    const client = await Schema.findOne(filter);

    if (!client) {
      return 2;
    }

    client.name = object.name;
    client.first = object.first;
    client.second = object.second;
    await client.save();
    return 1;
  } catch (error) {
    return 2;
  }
}

module.exports = edit;
