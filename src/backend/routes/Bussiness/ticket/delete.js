
const SchemaTicket = require('../../../public/javascript/modules/mongoDB/models/Bussiness/ticket');

async function remove(id) {
  try {
    const Schema = new SchemaTicket();
    const filter = { _id: id };
    const Ticket = await Schema.findOne(filter);
    
    if (!Ticket) {
      return 2;
    }

    Ticket.remove();        
    return 1;
  } catch (error) {
    return error;
  }
}

module.exports = remove;
