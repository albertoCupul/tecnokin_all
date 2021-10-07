const SchemaBusiness = require('../../../public/javascript/modules/mongoDB/models/Bussiness/business');

async function create(object) {
  try {
    const Schema = new SchemaBusiness();
    Schema.name = object.name;
    Schema.agent = object.agent;
    Schema.phone = object.phone;
    Schema.email = object.email;
    Schema.status = object.status;
    await Schema.save();
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = create;
