const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

//conexao sql
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "152369Jr",
  database: "dbrafael",
});

app.use(cors());
app.use(express.json());

          //TABELA USUÁRIOS
app.post('/register', (req, res) => {
    const { name } = req.body
    const { username } = req.body
    const { password } = req.body
    
    let SQL = "INSERT INTO users ( name, username, password ) VALUES ( ?,?,? )";
    db.query(SQL, [ name, username, password ], (err,res) => {
        if (err) console.log(err)
        else console.log("funfou")
    })
})

app.get('/users', (req, res) => {
  let SQL = "SELECT * from users";
  db.query(SQL, (err, result) => {
    if (err) console.log(err)
    else res.send(result)
  });
})

          //TABELA EVENTO
//adicionando evento
app.post('/add-event', (req, res) => {
  const { author } = req.body;
  const { description } = req.body;
  const { start } = req.body;
  const { finish } = req.body;

  let SQL = "INSERT INTO events ( author, description, start, finish ) VALUES ( ?,?,?,? )";

  db.query(SQL, [ author, description, start, finish ], (err,res) => {
      if (err) console.log(err);
      else return
  });
});

//editando evento
app.put('/edit-event/:id', (req, res) =>{
  const { id } = req.params
  const { description } = req.body
  const { start } = req.body
  const { finish } = req.body

  let SQL = `UPDATE events SET description= ?, start= ?, finish = ? WHERE idevent= ?`;
  db.query(SQL, [ description, start, finish, id ], (err,result) =>{
    if (err) console.log(err);
    else res.send(result);
  })
})

//listando eventos
app.get('/events', (req, res) => {
  let SQL = "SELECT * from events";

  db.query(SQL, (err, result) => {
    if (err) console.log(err)
    else res.send(result)
  })
})

//eventos do usuário
app.get('/events/:username', (req, res) => {
  const { username } = req.params;

  let SQL = "SELECT * from events WHERE author = ?";
  db.query(SQL, [ username ], (err, result) => {
    if (err) console.log(err)
    else res.send(result)
  })
})

//deletando evento
app.delete('/delete-event/:id', (req, res) =>{
  const { id } = req.params;

  let SQL = "DELETE FROM events WHERE idevent = ?";
  db.query(SQL, [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

const port = 8080;
app.listen(port, () => {
    console.log(`rodando na porta ${port}`);
})