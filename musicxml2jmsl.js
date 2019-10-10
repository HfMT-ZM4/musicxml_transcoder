const m2j = require('./_musicxml2jmsl.js')
const process = require('process')

function __main()
{
    if(process.argv.length < 3){
	console.error("you must supply a filename");
	return;
    }
    m2j.musicxml2jmsl(process.argv[2], function(jmsl, skipped){
	console.error(skipped);
	console.log(jmsl);
    });
}

__main();
