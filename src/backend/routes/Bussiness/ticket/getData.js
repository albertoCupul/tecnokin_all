const SchemaTicket = require('../../../public/javascript/modules/mongoDB/models/Bussiness/ticket');

async function getData(id) {
  try {
    const Schema = new SchemaTicket();
    const filter = { _id: id };
    const Ticket = await Schema.findOne(filter); 
    if (!Ticket) {
      return true;
    }
    return Ticket;
  } catch (error) {
    return false;
  }
}

module.exports = getData;
