
var express = require('express');


const fileUpload = require('express-fileupload');
var router = express.Router();

router.post('/', function (req, res) {

	if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }
   console.log(req.files.filename.name);


    res.send('File uploaded!');
});

module.exports = router;