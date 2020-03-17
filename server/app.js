'use strict';

var express = require('express');
var http = require('http');
var crearGrupo = require('../client/app/scripts/main/specs/ajax.js').crearGrupo;

var app = express();

try {
  app.set('port', process.env.PORT || 3000);
  app.use(express.bodyParser({ uploadDir: '/tmp' }));
  app.use(express.methodOverride());

  app.use(require('less-middleware')(__dirname + '/../client/app'));
  app.use('/', express['static'](__dirname + '/../client/app'));
  app.use(express.errorHandler());
  app.post('/enviarGrupos',function(req,res){
    var empleados =  crearGrupo(req.body.data);
    res.send(empleados)
  })

  app.use(app.router);
}
catch(error){
  console.error(error);
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
