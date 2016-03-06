var spawn = require('child_process').spawn;

var app = require('express')();
/*
http://localhost:8000/01-20160305052836.avi
/Volumes/service/cameras/01-20160305052836.avi
*/


var fs = require('fs');

function convert(avi, mp4, callback) {
  var ffmpeg = spawn('ffmpeg', [
    '-i', avi,
    '-f', 'mp4',
    mp4
  ])

  ffmpeg.stderr.on('data', function(buf) {
    console.log(buf.toString());
  });
  
  ffmpeg.on('exit', function() {
    callback();
  })
}


app.get('*', function(req, res) {
  var avi = __dirname+"/movie.avi";
  var mp4 = __dirname+"/movie.mp4";

  if (fs.existsSync(avi)) {
    if (fs.existsSync(mp4)) {
      console.log('exists, sending');
      res.sendFile(mp4);
    } else {
      console.log('converting');
      convert(avi, mp4, function() {
        console.log('done, sending');
        res.sendFile(mp4);
      })
    }
  } else {
    console.log('not found');
    res.send(404)
  }
});

app.listen(8000)

console.log('ready');
