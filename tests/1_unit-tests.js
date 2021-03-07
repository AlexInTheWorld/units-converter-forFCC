
var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });
    
    test('Decimal Input', function(done) {
      var input = '3.3 Gal';
      assert.equal(convertHandler.getNum(input), 3.3)
      done();
    });
    
    test('Fractional Input', function(done) {
      var input = '3/4 kM';
      assert.equal(convertHandler.getNum(input), 0.75)
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      var input = '1.2/2 l';
      assert.equal(convertHandler.getNum(input), 0.6)
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      var input = '5/2/1 gal';
      assert.isNaN(convertHandler.getNum(input))
      done();
    });
    
    test('No Numerical Input', function(done) {
      var input = '   km';
      assert.equal(convertHandler.getNum(input), 1)
      done();
    }); 
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(el) {
        assert.equal(convertHandler.getUnit(el), el.toLowerCase())
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      var input = "43 gah";
      assert.equal(convertHandler.getUnit(input), null)
      done();
    });  
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(el, i) {
        assert.equal(convertHandler.getReturnUnit(el), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    var input = ['gal','l','mi','km','lbs','kg'];
    var expect = ['gallons','liters','miles','kilometers','pounds','kilograms'];
    test('For Each Valid Unit Inputs', function(done) {
      input.forEach(function(el, i) {
        assert.equal(convertHandler.spellOutUnit(el), expect[i]);
      });
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      var input = [9.5, 'l'];
      var expected = 2.51
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1)
      done();
    });
    
    test('Mi to Km', function(done) {
      var input = [10, 'mi'];
      var expected = 16.0934
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1)
      done();
    });
    
    test('Km to Mi', function(done) {
      var input = [1.6, 'km'];
      var expected = 0.994
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1)
      done();
    });
    
    test('Lbs to Kg', function(done) {
      var input = [10, 'lbs'];
      var expected = 4.53592
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1)
      done();
    });
    
    test('Kg to Lbs', function(done) {
      var input = [4, 'kg'];
      var expected = 8.82
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1)
      done();
    });
    
  });

});