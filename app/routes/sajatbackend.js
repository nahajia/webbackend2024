const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  
  var connection
  function kapcsolat(){
    var mysql = require('mysql')

    connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'web_zarodoga'
    })
    
    connection.connect()
    
  }
  
  
  app.get('/film', (req, res) => {
    kapcsolat()
    connection.query('SELECT * from film', function (err, rows, fields) {
      if (err) throw err
      console.log(rows)
      res.send(rows)
    })
    
    connection.end()
  })


  app.post('/szavazatfelvitel', (req, res) => {
    kapcsolat()
    connection.query('insert into szavazat values (null,'+req.body.bevitel1+')', function (err, rows, fields) {
      if (err) {
        console.log("Szavazatát rögzítettük!")
        res.send("Szavazatát rögzítettük!")
      }
      else {
      console.log("Szavazatát rögzítettük!")
      res.send("Szavazatát rögzítettük!")
    }
    })
    connection.end()
  })
app.post('/keres', (req, res) => {
  kapcsolat()    
    let parancs='SELECT * from film where film_cim like "%'+req.body.bevitel1+'%"'
    connection.query(parancs, function (err, rows, fields) {
      if (err) {
        console.log("Hiba")
      }
    else{
      console.log(rows)
      res.send(rows)
    }
     
    })
    
    connection.end()
 })
 
  
  


};
