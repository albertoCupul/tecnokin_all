const getRule = require ("../../Products/rules/getAllInfo");

async function existReference(id, schemaName) {
  try {
    let data;
    switch (schemaName) {
      case "Rules":
        data = await getRule(id);
        break;
      default:
        return false;
    }


    if (data === null) return false;

    return true;
  } catch (error) {
    return false;
  }
}

module.exports.existReference = existReference;
