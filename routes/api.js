/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      var result = {};
      var input = req.query.input || "";
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      
    if ( !initNum && !initUnit ) {
      return res.send( 'invalid number and unit' );
    } else if ( !initNum ) {
      return res.send( 'invalid number' );
    } else if ( !initUnit ) {
      return res.send( 'invalid unit' );
    }
              
             
    // After all inputs are verified, proceeds.
    var returnNum  = convertHandler.convert( initNum, initUnit );
    var returnUnit = convertHandler.getReturnUnit( initUnit );
    var toString   = convertHandler.getString( initNum, initUnit, returnNum, returnUnit );    
    // Finally, returns json object with the values and a string.
    
    res.json( toString );
    });
    
};
