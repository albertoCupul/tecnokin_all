const SchemaClientDetail = require("../../../public/javascript/modules/mongoDB/models/Clients/details");

async function create(object) {
  try {
    const Schema = new SchemaClientDetail();
    Schema.address = object.address ? object.address : null;
    Schema.references = object.references ? object.references : null;
    Schema.phone = object.phone ? object.phone : null;
    Schema.rfc = object.rfc ? object.rfc : null;
    Schema.idClient = object.idClient;
    return await Schema.save();
  } catch (error) {
    if (error.code === 11000) {
      return true;
    }
    return false;
  }
}

module.exports = create;
