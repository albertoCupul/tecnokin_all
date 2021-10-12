const SchemaClient = require('../../../public/javascript/modules/mongoDB/models/Clients/clMain');

async function create(object) {
  try {
    const Schema = new SchemaClient();
    Schema.name = object.name;
    Schema.first = object.first;
    Schema.second = object.second;
    await Schema.save();
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = create;
