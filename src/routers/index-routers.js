var express = require('express');
var router = express.Router();

// Home page route.
router.get('/', function (req, res) {
  res.send('Index home page');
})



router.post('/',function(req,res){
  res.json({"error" : false, "message" : "success", "data" : req.body.num1 + req.body.num2});
});


module.exports = router;

