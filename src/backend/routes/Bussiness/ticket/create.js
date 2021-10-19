const SchemaTicket = require('../../../public/javascript/modules/mongoDB/models/Bussiness/ticket');

async function create(object) {
  try {
    const Schema = new SchemaTicket();
    Schema.greeting = object.greeting;
    Schema.goodbye = object.goodbye;
    Schema.print = object.print;
    Schema.idBranch = object.idBranch;
    Schema.idPaper = object.idPaper;
    await Schema.save();
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = create;
