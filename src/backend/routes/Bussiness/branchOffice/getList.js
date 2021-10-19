const SchemaBranch = require('../../../public/javascript/modules/mongoDB/models/Bussiness/branchhOffice');

async function getList(idBusiness) {
  try {
    let filter = null;
    if (idBusiness){
      filter={idBusiness}
    }
    const Schema = new SchemaBranch();    
    const branch = await Schema.find(filter);     
    if (branch.length===0) {
      return true;
    }
    return branch;
  } catch (error) {
    return false;
  }
}

module.exports = getList;
