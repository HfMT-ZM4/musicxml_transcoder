const m2j = require('./_musicxml2jmsl.js');
const path = require('path');
const Max = require('max-api');

Max.addHandler("filename", (filename) => {
    m2j.read_musicxml(filename, function(musicxml_str){
	m2j.musicxml2jmsl(musicxml_str, function(jmsl, skipped){
	    var lines = (jmsl.match(/.*\n/g)||[])
	    //console.log("num lines = " + lines.length);
	    Max.outlet("skipped", skipped);
	    lines.forEach(function(l){
		Max.outlet("jmsl", l);
	    })
	});
    });
});

