const SchemaBusiness = require('../../../public/javascript/modules/mongoDB/models/Bussiness/business');

async function edit(object) {
  try {
    const Schema = new SchemaBusiness();
    const filter = { _id: object.id };
    const business = await Schema.findOne(filter);

    if (!business) {
      return 2;
    }

    business.name = object.name;
    business.agent = object.agent;
    business.phone = object.phone;
    business.email = object.email;
    Schema.rfc = object.rfc;
    if (business.status){
      business.status = object.status;
    }    
    await business.save();
    return 1;
  } catch (error) {
    return error;
  }
}

module.exports = edit;
