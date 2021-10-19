const SchemaClientDetail = require("../../../public/javascript/modules/mongoDB/models/Clients/details");

async function edit(object) {
  try {
    const Schema = new SchemaClientDetail();
    const filter = { _id: object.idDetail };
    const clDetail = await Schema.findOne(filter);

    if (!clDetail) {
      return null;
    }

    clDetail.address = object.address ? object.address : null;
    clDetail.references = object.references ? object.references : null;
    clDetail.phone = object.phone ? object.phone : null;
    clDetail.rfc = object.rfc ? object.rfc : null;
    return await clDetail.save();
  } catch (error) {
    return false;
  }
}

module.exports = edit;
