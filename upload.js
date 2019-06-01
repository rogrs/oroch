const IncomingForm = require('formidable').IncomingForm

module.exports = function upload(req, res) {
  var form = new IncomingForm()


  form.parse(req, function (err, fields, files) {

    var dir = __dirname + '/upload';
    if (!path.existsSync(dir)) {
       fs.mkdirSync(dir, 0744);
    }

      var oldpath = files.filetoupload.path;
      var newpath = dir + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
    });

  //form.on('file', (field, file) => {

  //})
  //form.on('end', () => {
//    res.json()
//  })
//  form.parse(req)
}
