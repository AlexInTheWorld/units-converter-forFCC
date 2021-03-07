
class ConvertHandler {
  constructor() {
    this.conversionMethods = {
      "imperialTOmetric": function (input, constant) {
        return Number((input * constant).toFixed(5));
      },
      "metricTOimperial": function(input, constant) {
        return Number((input / constant).toFixed(5));
      }
    };
    this.units = {
      "mi": ["miles", "km", "imperialTOmetric", 1.60934],
      "km": ["kilometers", "mi", "metricTOimperial", 1.60934],
      "lbs": ["pounds", "kg","imperialTOmetric", 0.453592],
      "kg": ["kilograms", "lbs", "metricTOimperial", 0.453592],
      "gal": ["gallons", "l", "imperialTOmetric", 3.78541],
      "l": ["liters", "gal", "metricTOimperial", 3.78541]
    };
  }
  getNum(input) {
    var result = input.replace(/\D*$/, "");
    
    var nums_arr = result.split("/");
    if (nums_arr.length == 2) {
      return Number(nums_arr[0]) / Number(nums_arr[1]);
    }
    return result.length > 0 ? Number(result) : 1
    }
  
  getUnit(input) {
    var result = input.match(/\D+$/); 
      
    if (result) {
      var in_unit = result[0].replace(/^[.]/, "");
      in_unit = in_unit.toLowerCase().trim();
      result = this.units[in_unit] ? in_unit : null
    }
    
    return result;
  }
  
  getReturnUnit(initUnit) {
    return this.units[initUnit][1];
    
  }

  spellOutUnit (unit) {
    return this.units[unit][0];
  };

  convert(initNum, initUnit) {
    var numeric_result = this.conversionMethods[this.units[initUnit][2]](initNum, this.units[initUnit][3]);
    return numeric_result;
  }
  
  getString(initNum, initUnit, returnNum, returnUnit) {

    return { initNum, initUnit, returnNum, returnUnit,
      string: initNum + " " + this.spellOutUnit( initUnit )
        + " converts to " + returnNum + " "
        + this.spellOutUnit(returnUnit)
    };
  }
  
}

module.exports = ConvertHandler;
