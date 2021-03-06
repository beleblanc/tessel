var wifi = require('wifi-cc3000');
var credentials = require('./../twilio/credentials.js');
var network = credentials.wifi_name // put in your network name here
var pass = credentials.wifi_password; // put in your password here, or leave blank for unsecured
var security = 'wpa2'; // other options are 'wep', 'wpa', or 'unsecured'

// connect to the wifi network
// check if the wifi chip is busy (currently trying to connect), if not, try to connect
wifi.tryConnect = function (){
  if (!wifi.isBusy()) {
    connect();
  } else {
    // The cc3k is set up to automatically try to connect on boot. 
    // For the first few seconds of program bootup, you'll always 
    // see the wifi chip as being "busy"
    console.log("is busy, trying again");
    setTimeout(function(){
      wifi.tryConnect();
    }, 1000);
  } 
}

function connect(){
  wifi.connect({
    security: security
    , ssid: network
    , password: pass
    , timeout: 30 // in seconds
  });
}

wifi.on('connect', function(err, data){
  // you're connected
  console.log("connect emitted", err, data);
});

wifi.on('disconnect', function(err, data){
  // wifi dropped, probably want to call connect() again
  console.log("disconnect emitted", err, data);
})

wifi.on('timeout', function(err){
  // tried to connect but couldn't, retry
  console.log("timeout emitted"); 
  connect();
});

wifi.on('error', function(err){
  // one of the following happened
  // 1. tried to disconnect while not connected
  // 2. tried to disconnect while in the middle of trying to connect
  // 3. tried to initialize a connection without first waiting for a timeout or a disconnect
  console.log("error emitted", err);
});
setTimeout(wifi.tryConnect(),6000);


module.exports = wifi;
