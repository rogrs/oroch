var express = require('express');
var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var fs = require('fs');


router.post('/', function (req, res) {
	console.log(req.body);
	console.log(req.body.file);
	//console.log(req.body, req.files);
	//console.log(req.body.file);
	//console.log(req.files.file);
  /*res.setHeader("Access-Control-Allow-Origin", "*");
	var arquivo = req.files.file;
	console.log(arquivo);
	var temporario = req.files.file.path;
	var novo = './uploads/' + req.files.file.name;
 	fs.rename(temporario, novo, function(err){
 		if(err){
 			res.status(500).json({error: err})
 		}
 		res.json({message: "enviado com sucesso.", file: novo});
 	});*/
  })



module.exports = router;