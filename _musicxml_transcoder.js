'use strict'

const fs = require('fs');

function default_elem_handler(key, mxml, output_obj)
{
    if(output_obj.skipped_elems == undefined){
	output_obj.skipped_elems = [];
    }
    var o = {}
    o[key] = mxml
    output_obj.skipped_elems.push(o)
}

function transcode(mxml,
		   output_obj,
		   callbacks,
		   default_elem_handler_fn = default_elem_handler)
{
    var _this = this
    Object.keys(mxml).forEach(function(k){
	if(Array.isArray(mxml[k]) == true){
	    mxml[k].forEach(function(o){
		if(callbacks[k] == undefined){
		    default_elem_handler(k, o, output_obj)
		}else{
	    	    callbacks[k](o, output_obj);
		}
	    })
	}else{
	    if(callbacks[k] == undefined){
		default_elem_handler(k, mxml[k], output_obj)
	    }else{
		callbacks[k](mxml[k], output_obj)
	    }
	}
    })
    return output_obj
}

function timewise_to_partwise(tw)
{
    // not sure we need this
}

function partwise_to_timewise(pw)
{
    var tw = JSON.parse(JSON.stringify(pw));
    Object.defineProperty(tw, 'score-timewise',
			  Object.getOwnPropertyDescriptor(tw,
							  'score-partwise'));
    delete tw['score-partwise'];
    var part = JSON.parse(JSON.stringify(pw['score-partwise'].part));
    delete tw['score-timewise'].part;
    tw['score-timewise'].measure = new Array(part[0].measure.length);
    part[0].measure.forEach(function(pm, i){
	tw['score-timewise'].measure[i] = {
	    '$' : pm['$'],
	    'part' : new Array(part.length)
	};
    })

    tw['score-timewise'].measure.forEach(function(m, i){
	part.forEach(function(p, j){
	    m.part[j] = JSON.parse(JSON.stringify(p.measure[i]));
	    m.part[j]['$'] = JSON.parse(JSON.stringify(p['$']));
	})
    })
    return tw;
}

function read_musicxml(filename, callback)
{
    fs.readFile(filename, {encoding: 'utf-8'}, function(err, musicxml_str){
	if(!err){
	    callback(musicxml_str);
	}else{
	    console.error("couldn't read " + filename);
	}
    })
}

exports.transcode = transcode
//exports.default_elem_handler = default_elem_handler
exports.timewise_to_partwise = timewise_to_partwise
exports.partwise_to_timewise = partwise_to_timewise
exports.read_musicxml = read_musicxml
