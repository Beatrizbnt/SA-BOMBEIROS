// Importando os módulos e bibliotecas necessárias
const express = require("express"); // Framework para criação de aplicações web em Node.js
// const mysql = require("mysql2"); // Módulo para conexão com o banco de dados MySQL
const app = express();

app.get("/", async (req, rest) =>{
    res.send("Página inicial");
});

app.listen(8002, () =>{
    console.log("Servidor iniciado na porta 8080: http://localhost:8080")
})

// Configuração da conexão com o banco de dados MySQL
// const connection = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "root",
//   password: "root",
//   database: "bombeiros",
// });

// Conexão com o banco de dados
// n