var fs = require('fs');
var path = require('path');
var _ = require('underscore');


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
  // fs.readFile('./archives/sites.txt', 'utf8', function (err, data) {
  //   if (err) { console.log('FILE READ ERROR =', err); }
  //   return callback(data);
  // });
  fs.read('./archives/sites.txt', 'utf8', function (err, data) {
    if (err) { console.log('ERROR', error); }
    return callback(data);
  });
};




exports.isUrlInList = function(url, callback) {
  
  
//   var rawSiteListData;
//   var cb = function (item) { test = rawSiteListData; console.log ('rawSiteListData = ', rawSiteListData); }; 
//   exports.readListOfUrls(cb);

// //////////////////////////////////
//   var rawSiteListData = exports.readListOfUrls(function (item) { return item; });
//   console.log('rawSiteListData =', rawSiteListData);  
// /////////////////////////////////
  
};

exports.addUrlToList = function(url, callback) {
};

exports.isUrlArchived = function(url, callback) {
};

exports.downloadUrls = function(urls) {
};
