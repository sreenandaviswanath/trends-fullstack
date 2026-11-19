const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);


require("dotenv").config();
const app = require("./app");

const databaseConnection = require("./config/databaseConnection");
databaseConnection();


app.listen(process.env.PORT, ()=>{

console.log(`Server is running ${process.env.PORT}`);


});
