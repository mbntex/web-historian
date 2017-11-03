var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var $ = require('jquery');
var ajax = require('ajax');
var request = require('request');
var http = require('http');


/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile('./archives/sites.txt', 'utf8', function (err, data) {
    if (err) { 
      console.log('ERROR', err); 
    } else {
      callback(data);
    }
  });
};



exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function (info) {
    var infoArr = info.split('\n');
    //console.log('inforARR ', infoArr);
    var answer = infoArr.includes(url);  
    callback(answer);
  });
};




exports.addUrlToList = function(url, callback) {
  exports.isUrlInList(url, function (data) {
    if (data === false) {
      var dataInput = '\\n'; 
      dataInput.concat(url); 
      //console.log('URL TEST = ', dataInput);
      fs.appendFile('./archives/sites.txt', url, 'utf8', callback);
    }
  });

};

exports.isUrlArchived = function(url, callback) {
  exports.isUrlInList(url, function (data) {
    if (data === true) {
      //search archive folder for file with same name
      fs.readFile('./archives/sites/' + url, 'utf8', function (err, data) {
        if (err) {
          //console.log('ISURLARCHIVED ERROR =', err)
          callback(false);
        } else {
          //console.log('isUrlArchived DATA = ', data);
          callback(true);
        }
      });
    } else {
      exports.addUrlToList(url);
      callback(false);
    }
  });  


};



exports.downloadUrls = function(url) {
  //assume url is single
  //isURLarchived, pass in the the callback
  // the callback if true, does nothing
  // if false it creates a file and downloads the info through a get request
  console.log('into downloads');
  exports.isUrlArchived(url, function (boolean) {
    console.log('entering the download URL =', url);
    if (boolean === false) {
      request('www.google.com', function(error, response, body) {
        console.log('ERROR =', error);
        console.log('response =', response);
        console.log('BODY =', body);
        // filePath = './archives/sites/' + url;
        // // console.log('DATA from UrlArchived', data);
        // fs.writeFile(data, filePath, (err) => { if (err) { throw err; } }); 
      });
      var options = {
        host: url 
      };
      http.request(options, function(response) {
        var str = '';
        response.on('data', function (chunk) {
          str += chunk;
        });
        response.on('end', function() {
          console.log(str);
          response.end(str);
        });
        
      });
    }
  });
};







// exports.downloadUrls = function(urls) {
//   exports.isUrlArchived(urls, function(boolean) {
//     if (boolean === true) {
//       console.log('SHOW IT!!!!');
//     }
//     if (boolean === false) {
//       console.log('NEED TO DOWNLOAD IT');
//       //
//       //cron
//     }
//   });
// };







