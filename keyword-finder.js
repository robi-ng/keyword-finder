/*
* Author: Robi Ng
* Date: 26 Jul 2019
* This Node.js script is intended to find list of all files in the current directory that contains a certain keyword. 
* For flexibility, the keyword is accepted as an argument for the script.
*/

var fs = require('fs');
var path = require('path');
var scriptFileName = path.basename(__filename);

// Take in keyword as an argument
var keyword = process.argv[2];
if (!keyword) {
    console.log('Argument is required as keyword. Example: node keyword-finder.js TODO'); 
    return;
}

function keywordFinder(dir, keyword, done) {
    var results = []; // Array to store each matched file
    fs.readdir(dir, function(err, list) {
        if (err) throw err;
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) return done(null, results);
            if (file == scriptFileName) { // Skip the current script file
                next();
            } else {
                file = path.resolve(dir, file);
                fs.stat(file, function(err, target) {
                    if (err) throw err;
                    if (target && target.isDirectory()) { // Call function recursively if it's a directory
                        keywordFinder(file, keyword, function(err, res) {
                            results = results.concat(res);
                            next();
                        });
                    } else { // Read file and check for keyword if it's a file
                        fs.readFile(file, function(err, data) {
                            if (err) throw err;
                            var regex = new RegExp(keyword, "i");
                            if (data.toString().split(/\n/).some(function(element) {
                                return regex.test(element);
                            })) {
                                console.log(file); // Print filename immediately once found
                                results.push(file);
                            }
                            next();
                        });
                    }
                });
            }
        })();
    })
}

keywordFinder('./', keyword, function(err, results) {
    if (err) throw err;
    // results variable is an array that contains list of files with matching keyword in the content
    // Print success message if necessary
}); 
module.exports = keywordFinder;