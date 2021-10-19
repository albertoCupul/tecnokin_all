const SchemaTicket = require('../../../public/javascript/modules/mongoDB/models/Bussiness/ticket');

async function getList(idBranch) {
  try {
    const Schema = new SchemaTicket();    
    let Ticket;
    if (idBranch){
      const filter = { idBranch };
      Ticket = await Schema.findOne(filter); 
    }else {
      Ticket = await Schema.find(); 
    } 
    if (!Ticket) {
      return true;
    }
    if(Ticket.length===0){
      return true
    }
    return Ticket;
  } catch (error) {
    return false;
  }
}

module.exports = getList;
