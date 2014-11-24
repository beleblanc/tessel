var tessel = require('tessel');
var gpio = tessel.port['GPIO'];
var pin  = gpio.analog[0];
var old_value = pin.read();

setInterval(function(){
  var new_value = pin.read();
  
  if((old_value/new_value) > 1.5)
  {
    console.log("Alarm has been set off. Old Value: "+ old_value +", New Value:" + new_value);
  }
  old_value = new_value;
},300);