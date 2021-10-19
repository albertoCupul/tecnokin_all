const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");
const db = require("./public/javascript/modules/mongoDB/connection/dbConection");
const auth = require("./routes/Auth/authorization");

mongoose.set("useFindAndModify", false);

const dataDB = { ...db.ObjDbConection };

/* configurando modulo express */

const port = 3000;

/* importando modulos propios */

// /* const sessions = require('./modules/sessions'); */

const routeRules = require("./routes/Products/rules/main");
const routeLiterals = require("./routes/Products/literals/main");
const routeCategory = require("./routes/Products/category/main");
const routeProduct = require("./routes/Products/products/main");
const routeInventory = require("./routes/Products/inventory/main");
const routeOffer = require("./routes/Products/offer/main");

const routeUser = require("./routes/Users/user/main");
const routeClient = require("./routes/Client/client/main");
const routeClientDetail = require("./routes/Client/details/main");
const routePerfilCl = require("./routes/Client/perfil/main");
const routeCredit = require("./routes/Client/credit/main");
const routeAccess = require("./routes/Users/access/main");
const routeLogin = require("./routes/Users/login/main");

const routeBusiness = require("./routes/Bussiness/bussiness/main");
const routeBranch = require("./routes/Bussiness/branchOffice/main");
const routeTicket = require("./routes/Bussiness/ticket/main");
const routePaper = require("./routes/Bussiness/paper/main");

/* ejecutando modulo express */

const app = express();

/*  validando si esta logueado */

/* añadiendo a express el entender Json */

app.use(express.json());
app.use(cors());

app.use("/rules", auth, routeRules);
app.use("/literals", auth, routeLiterals);
app.use("/category", auth, routeCategory);
app.use("/product", auth, routeProduct);
app.use("/inventory", auth, routeInventory);
app.use("/offer", auth, routeOffer);
app.use("/user", auth, routeUser);
app.use("/client", auth, routeClient);
app.use("/clientDetail", auth, routeClientDetail);
app.use("/perfilCl", auth, routePerfilCl);
app.use("/credit", auth, routeCredit);
app.use("/usrAccess", auth, routeAccess);
app.use("/login", routeLogin);
app.use("/business", auth, routeBusiness);
app.use("/branch", auth, routeBranch);
app.use("/ticket", auth, routeTicket);
app.use("/paper", auth, routePaper);

/* rutas para manejo de usuarios administradores */
try {
  mongoose.connect(dataDB.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: false,
    dbName: dataDB.databaseName,
    user: dataDB.userName,
    pass: dataDB.userPwd,
  });
  /* iniciando localhost */
  app.listen(port, () => {
    console.log(`Ejecutando servidor en puert ${port}`);
  });
} catch (e) {
  console.error(e.message);
  console.log("error to connect DB motor");
}
