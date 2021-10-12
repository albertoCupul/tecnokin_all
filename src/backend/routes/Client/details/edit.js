const SchemaClientDetail = require('../../../public/javascript/modules/mongoDB/models/Clients/details');

async function edit(object) {
  try {
    const Schema = new SchemaClientDetail();
    const filter = { _id: object.id };
    const clDetail = await Schema.findOne(filter);

    if (!clDetail) {
      return 2;
    }

    clDetail.address = object.address ? object.address : null;
    clDetail.references = object.references ? object.references : null;
    clDetail.phone = object.phone ? object.phone : null;
    clDetail.rfc = object.rfc ? object.rfc : null;
    await clDetail.save();
    return 1;
  } catch (error) {
    return 2;
  }
}

module.exports = edit;
