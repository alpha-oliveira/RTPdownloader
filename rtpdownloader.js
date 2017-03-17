const request = require('request');
const url = process.argv[2];
const https = require('https');
const fs = require('fs');

request(url, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  
  let pattern = /(https:\/\/streaming-ondemand\.rtp\.pt\/)(.*)(index\.m3u8\?tlm=hls&streams=)(.*)\.mp4/;
  let matches = body.match(pattern);
  let link = matches[1] + matches[2] + matches[4] + ".mp4";
  
  
  download(link,dest,cb);


});





var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var requestv = https.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);  // close() is async, call cb after close completes.
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (cb) cb(err.message);
  });
};

var dest = 'video.mp4';
var cb = function(show){ console.log('done:',show);
};


