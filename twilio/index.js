//Load Wifi library to see if the connection is up
var wifi = require('wifi-cc3000');
//Load Credentials from a seperate file
var credentials = require('./credentials.js');
//Tessel Base Library
var tessel = require('tessel');
//
var client = require('twilio')(credentials.twilio_sid,credentials.twilio_token);  
var gpio = tessel.port['GPIO'];
var pin  = gpio.analog[0];  

console.log("In the loop");
var old_value = pin.read();

setInterval(function(){
  var new_value = pin.read();
  
  if((old_value/new_value) > 1.5)
  {
    
    sendText("+15062327733", credentials.twilio_number,"Alarm has been set off at athena");
  }
  old_value = new_value;
},300);


function sendText(to,from,msg) {
  client.sms.messages.create({
    to: to,
    from: from,
    body:msg
  }, function(error, message) {
    if (!error) {
      console.log('Success! The SID for this SMS message is:');
      console.log(message.sid);
      console.log('Message sent on:');
      console.log(message.dateCreated);
    } else {
      console.log('Oops! There was an error.', error);
    }
  });
}