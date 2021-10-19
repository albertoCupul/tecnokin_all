const SchemaPaper = require('../../../public/javascript/modules/mongoDB/models/Bussiness/paper');

async function create(object) {
  try {
    const Schema = new SchemaPaper();
    Schema.name = object.name;
    Schema.size = object.size;    
    await Schema.save();
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = create;
