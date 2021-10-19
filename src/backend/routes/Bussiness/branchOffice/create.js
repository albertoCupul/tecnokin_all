const SchemaBusiness = require('../../../public/javascript/modules/mongoDB/models/Bussiness/branchhOffice');

async function create(object) {
  try {
    const Schema = new SchemaBusiness();
    Schema.name = object.name;
    Schema.address = object.address;
    Schema.city = object.city;
    Schema.state = object.state;
    Schema.phone = object.phone;
    Schema.status = object.status;
    Schema.idBusiness = object.idBusiness;
    await Schema.save();
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = create;
