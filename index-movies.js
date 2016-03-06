var _ = require('lodash');
var fs = require('fs');
var path = require('path');

/**
 * Returns a list movies with the newest at the top. */
function indexMovies(dir, callback) {
  fs.readdir(dir, function(err, files) {
    if (err) return callback(err);
    var movieFiles = _.filter(files, function(filename) {
      return filename[0] !== "." && path.extname(filename) === ".avi";
    })
    var movies = _.map(movieFiles, function(filename) {
      var date = new Date();
      var match = filename.match(/\d+-(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/);
      date.setYear(parseInt(match[1]))
      date.setMonth(parseInt(match[2])-1)
      date.setDate(parseInt(match[3]))
      date.setHours(parseInt(match[4]))
      date.setMinutes(parseInt(match[5]))
      date.setSeconds(parseInt(match[6]))
      return { time: date, path: "/movies/"+filename }
    })
    return callback(null, _.sortBy(movies, function(m) { return -m.time }));
  })
}

if (!module.parent) {
  console.log('main');
  indexMovies(process.argv[2], function(err, movies) {
    if (err) throw err;
    movies.forEach(function(m) {
      console.log(m.time.toGMTString());
    })
  });
} else {
  module.exports = indexMovies
}
