var vows = require("vows"),
    Omnibus = require("../src/omnibus.js"),
    assert = require('assert');

var omnibus = new Omnibus();

vows.describe("controlleur de l'omnibus").addBatch({
    'when omnibu is asked for nextCommand':  {
        topic: function() {
            return omnibus.nextCommand();
        },
        
        'it returns Open': function(topic) {
            assert.equal(topic,"OPEN");    
        }
    }
    
}).run();