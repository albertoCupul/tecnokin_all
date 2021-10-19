const SchemaTicket = require('../../../public/javascript/modules/mongoDB/models/Bussiness/ticket');

async function edit(object) {
  try {
    const Schema = new SchemaTicket();
    const filter = { _id: object.id };
    const Ticket = await Schema.findOne(filter);

    if (!Ticket) {
      return 2;
    }

    Ticket.greeting = object.greeting;
    Ticket.goodbye = object.goodbye;
    Ticket.print = object.print;
    Ticket.idBranch = object.idBranch;
    Ticket.idPaper = object.idPaper; 
    await Ticket.save();
    return 1;
  } catch (error) {
    return error;
  }
}

module.exports = edit;
