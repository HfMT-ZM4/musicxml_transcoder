const m2j = require('./_musicxml2jmsl.js');
const path = require('path');
const Max = require('max-api');

Max.addHandler("filename", (filename) => {
    m2j.read_musicxml(filename, function(musicxml_str){
	m2j.musicxml2jmsl(musicxml_str, function(jmsl, skipped){
	    Max.outlet("skipped", skipped);
	    Max.outlet("jmsl", jmsl);
	});
    });
});

