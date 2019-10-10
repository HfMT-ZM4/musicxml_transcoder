const musicxml2jmsl = require('./_musicxml2jmsl.js');
const path = require('path');
const Max = require('max-api');

// This will be printed directly to the Max console
//Max.post(`Loaded the ${path.basename(__filename)} script`);

// Use the 'addHandler' function to register a function for a particular message
Max.addHandler("filename", (filename) => {
    musicxml2jmsl.musicxml2jmsl(filename, function(jmsl, skipped){
	Max.outlet("skipped", skipped);
	Max.outlet("jmsl", jmsl);
    });
});

// Use the 'outlet' function to send messages out of node.script's outlet
// Max.addHandler("echo", (msg) => {
//     Max.outlet(msg);
// });


