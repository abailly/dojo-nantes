var vows = require("vows"),
    Ascenseur = require("../src/ascenseur.js"),
    assert = require('assert');

var ascenseur = new Ascenseur();

vows.describe("controlleur de l'ascenseur").addBatch({
    'when ascenseur is asked for nextCommand':  {
        topic: function() {
            return ascenseur.nextCommand();
        },
        
        'it returns Nothing': function(topic) {
            assert.equal(topic,"NOTHING");    
        }
    }
    
}).run();