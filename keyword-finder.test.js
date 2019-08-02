var keywordFinder = require('./keyword-finder');
var assert = require('assert');
describe('Unit Tests', function() {
  describe('Based on number of output', function() {
    it('should be able to find 1 file', function(done) {
        var results = keywordFinder('./somedir', 'Todo', function(err, results) {
          assert.equal(results.length, 1);
          done();
        });
    });
    it('should not have output when no results found', function(done) {
        var results = keywordFinder('./somedir', 'abcdefzzzzz', function(err, results) {
          assert.equal(results.length, 0);
          done();
        });
    });
    it('should be able to check more than 1 file', function(done) {
        var results = keywordFinder('./somedir2', 'TODOs', function(err, results) {
          assert.equal(results.length, 2);
          done();
        });
    });
  });
});