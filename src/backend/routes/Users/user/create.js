const SchemaUser = require("../../../public/javascript/modules/mongoDB/models/Users/usrMain");
const middleware = require("../middleware");

async function create(object) {
  try {
    const existAccessName = await middleware.existReference(object.user);
    if (existAccessName===false) {
      const Schema = new SchemaUser();
      Schema.name = object.name;
      Schema.first = object.first;
      Schema.second = object.second;
      Schema.phone = object.phone;
      const savedExtraData = await middleware.addExtraInfo(object,Schema._id);
      if (savedExtraData!==false){
          return await Schema.save();
      }
      return true;
    }
    return null;
  } catch (error) {
    return false;
  }
}

module.exports = create;
