const SchemaClientDetail = require("../../../public/javascript/modules/mongoDB/models/Clients/details");

async function remove(id) {
  try {
    const Schema = new SchemaClientDetail();
    const filter = { _id: id };
    const clDetail = await Schema.findOne(filter);

    if (!clDetail) {
      return null;
    }

    return clDetail.remove();
  } catch (error) {
    return false;
  }
}

module.exports = remove;
