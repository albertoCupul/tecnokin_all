const SchemaBranch = require('../../../public/javascript/modules/mongoDB/models/Bussiness/branchhOffice');

async function edit(object) {
  try {
    const Schema = new SchemaBranch();
    const filter = { _id: object.id };
    const branch = await Schema.findOne(filter);

    if (!branch) {
      return 2;
    }

    branch.name = object.name;
    branch.address = object.address;
    branch.city = object.city;
    branch.state = object.state;
    branch.phone = object.phone;
    branch.status = object.status;
    branch.idBusiness = object.idBusiness;   
    await branch.save();
    return 1;
  } catch (error) {
    return error;
  }
}

module.exports = edit;
