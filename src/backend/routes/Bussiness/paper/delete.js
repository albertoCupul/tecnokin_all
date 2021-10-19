
const SchemaPaper = require('../../../public/javascript/modules/mongoDB/models/Bussiness/paper');

async function remove(id) {
  try {
    const Schema = new SchemaPaper();
    const filter = { _id: id };
    const Paper = await Schema.findOne(filter);
    
    if (!Paper) {
      return 2;
    }

    Paper.remove();        
    return 1;
  } catch (error) {
    return error;
  }
}

module.exports = remove;
