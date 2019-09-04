const mocha = require ('mocha');
const assert = require('assert');
const Articles = require('../database/models/Article');

describe('saving to mongodb', function(){

it('save records to a database', function(){

    let Art = new Articles({

        title:'Cévenn’ink Tattoo '

    })

    Art.save().then(function(){
        assert(char.isNew === false);
        done();
    });
});
});