const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
    res.send("Página inicial");
});

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});
// Configuração da conexão com o banco de dados MySQL
// const connection = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "root",
//   password: "root",
//   database: "bombeiros",
// });

// Conexão com o banco de dados
// n