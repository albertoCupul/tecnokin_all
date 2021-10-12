const SchemaClientDetail = require('../../../public/javascript/modules/mongoDB/models/Clients/details');

async function create(object) {
  try {
    const Schema = new SchemaClientDetail();
    Schema.address = object.address ? object.address : null;
    Schema.references = object.references ? object.references : null;
    Schema.phone = object.phone ? object.phone : null;
    Schema.rfc = object.rfc ? object.rfc : null;
    Schema.idClient = object.idClient;
    await Schema.save();
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = create;
