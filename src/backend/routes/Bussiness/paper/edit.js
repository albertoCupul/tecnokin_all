const SchemaBusiness = require('../../../public/javascript/modules/mongoDB/models/Bussiness/paper');

async function edit(object) {
  try {
    const Schema = new SchemaBusiness();
    const filter = { _id: object.id };
    const business = await Schema.findOne(filter);

    if (!business) {
      return 2;
    }

    business.name = object.name;
    business.size = object.size;      
    await business.save();
    return 1;
  } catch (error) {
    return error;
  }
}

module.exports = edit;
