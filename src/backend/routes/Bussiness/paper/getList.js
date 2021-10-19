const SchemaPaper = require('../../../public/javascript/modules/mongoDB/models/Bussiness/paper');

async function getList() {
  try {
    const Schema = new SchemaPaper();    
    const Paper = await Schema.find(); 
    if (!Paper) {
      return true;
    }
    return Paper;
  } catch (error) {
    return false;
  }
}

module.exports = getList;
