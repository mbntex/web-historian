var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers.js');
var fs = require('fs');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  console.log('request handler ran');
  console.log('REQ URL', req.url);

  if (req.method === 'GET' && req.url === '/') {
    //console.log('URL = ', req.url);
    console.log('TEST456');
    fs.readFile('./web/public/index.html', 'utf8', function (err, data) {
      if (err) {
        console.log('ERROR = ', err);
      }
      // console.log('DATA RECIEVED = ', data);
      // console.log('TYPE OF DATA RECIEVED = ', typeof data);
      status = 200;
      res.writeHead(status, helpers.headers);
      res.end(data);
      
    
    });
  } 

  if (req.method === 'GET' && req.url === '/loading.html') {
    //console.log('URL = ', req.url);
    console.log('TEST456');
    fs.readFile('./web/public/loading.html', 'utf8', function (err, data) {
      if (err) {
        console.log('ERROR = ', err);
      }
      // console.log('DATA RECIEVED = ', data);
      // console.log('TYPE OF DATA RECIEVED = ', typeof data);
      status = 200;
      res.writeHead(status, helpers.headers);
      res.end(data);
    });
  } 

  if (req.method === 'POST') {
    console.log('post attempted');
    var body;
    req.on('data', function (chunk) { body += chunk; });
    req.on('end', function () {
      status = 201;
      res.writeHead(status, helpers.headers);
      var urlWanted = body.substring((body.indexOf('url=') + 4), body.length);
      
      

      // archive.readListOfUrls(function(thing) { console.log('DATA == ', thing); console.log('DATA TYPE == ', typeof thing); } );
      
      //archive.readListOfUrls(function(thing) {   });

      archive.isUrlInList();








      res.end(urlWanted);
    });   
  }




  if (req.method === 'GET' && (req.url !== '/' && req.url !== '/loading.html')) {
    status = 200;
    res.writeHead(status, helpers.headers);
    res.end('Other Page');
    console.log('GET REQ OTHER PAGE');
  }

  // res.end(archive.paths.list);
};

//public/index.html'