const SchemaClientDetail = require('../../../public/javascript/modules/mongoDB/models/Clients/details');

async function remove(id) {
  try {
    const Schema = new SchemaClientDetail();
    const filter = { _id: id };
    const clDetail = await Schema.findOne(filter);

    if (!clDetail) {
      return 2;
    }

    clDetail.remove();
    return 1;
  } catch (error) {
    return 3;
  }
}

module.exports = remove;
