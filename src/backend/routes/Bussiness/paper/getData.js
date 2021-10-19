const SchemaPaper = require('../../../public/javascript/modules/mongoDB/models/Bussiness/paper');

async function getData(id) {
  try {
    const Schema = new SchemaPaper();
    const filter = { _id: id };
    const Paper = await Schema.findOne(filter); 
    if (!Paper) {
      return true;
    }
    return Paper;
  } catch (error) {
    return false;
  }
}

module.exports = getData;
