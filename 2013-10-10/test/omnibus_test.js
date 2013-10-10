var vows = require("vows"),
    Omnibus = require("../src/omnibus.js"),
    assert = require('assert');



vows.describe("controlleur de l'omnibus").addBatch({
    'when omnibus is asked for nextCommand':  {
        topic: function() {
            var omnibus = new Omnibus();
            return omnibus.nextCommand();
        },
        
        'it opens the door': function(topic) {
            assert.equal(topic,"OPEN");    
        }
    }, 
    
    'when omnibus is asked for nextCommand twice':  {
        topic: function() {
            var omnibus = new Omnibus();
            omnibus.nextCommand();
            return omnibus.nextCommand();
        },
        
        'it opens then close the door': function(topic) {
            assert.equal(topic,"CLOSE");    
        }
    }
    
}).run();