var fs = require('fs'),
    path = require('path'),
    process = require('process'),
    xml2js = require('xml2js');

function doc(jmslscoredoc = {})
{
    this["jmslscoredoc"] = jmslscoredoc;
}

function jmslscoredoc(score = [])
{
    this["score"] = score;
}

function score_attributes()
{
    this["NAME"] = "";
    this["SUBTITLE"] = "";
    this["COMPOSER"] = "";
    this["COPYRIGHT"] = "";
    this["WIDTH"] = "800";
    this["HEIGHT"] = "1000";
    this["STAFFS"] = "13";
    this["NUMTRACKSPERSTAFF"] = "2";
    this["InstrumentNamesVisible"] = "false";
    this["TempoVisible"] = "false";
    this["StaffNumbersVisible"] = "true";
    this["MeasureNumbersVisible"] = "true";
    this["SectionBracketsVisible"] = "true";
    this["TimeSignaturesVisible"] = "true";
    this["KeySignaturesVisible"] = "true";
    this["ClefsVisible"] = "true";
    this["ScoreTitleVisible"] = "true";
    this["CourtesyClefsVisible"] = "false";
    this["MeasureNumberOffset"] = "1";
    this["LeftMargin"] = "20.0";
    this["RightMargin"] = "20.0";
    this["TopMargin"] = "15.0";
    this["BottomMargin"] = "15.0";
    this["TopMarginOfFirstPage"] = "60.0";
    this["DrawAllMeasureNumbers"] = "true";
    this["TextFontScaler"] = "1.5";
    this["ScoreSubtitleFontScaler"] = "2.0";
    this["ScoreTitleFontScaler"] = "4.0";
    this["TimesigFontScaler"] = "2.5";
    this["MeasureNumberFontScaler"] = "1.5";
    this["TextFontName"] = "SansSerif";
    this["ScoreSubtitleFontName"] = "Serif";
    this["ScoreTitleFontName"] = "Serif";
    this["TimesigFontName"] = "Serif";
    this["MeasureNumberFontName"] = "SansSerif";
}

function score(attributes, ScoreAnnotation = [], orchestra = [], mixerpanelsettings = [], staffspacing = [], scoresection = [], measure = [])
{
    this["$"] = attributes;
    this["ScoreAnnotation"] = ScoreAnnotation;
    this["orchestra"] = orchestra;
    this["mixerpanelsettings"] = mixerpanelsettings;
    this["staffspacing"] = staffspacing;
    this["scoresection"] = scoresection;
    this["measure"] = measure;
}

function ScoreAnnotation_attributes()
{
    this["CLASSNAME"] = "com.softsynth.jmsl.score.ScoreAnnotation";
    this["Annotation"] = "";
}

function ScoreAnnotation(attributes)
{
    this["$"] = attributes;
}

function orchestra_attributes()
{
    this["CLASSNAME"] = "com.softsynth.jmsl.score.Orchestra";
}

function orchestra(attributes, jmslscoreinstrument = [])
{
    this["$"] = attributes;
    this["jmslscoreinstrument"] = jmslscoreinstrument;
}

function jmslscoreinstrument_attributes(InsIndex, Name, CLASSNAME = "com.algomusic.max.MaxScoreInstrument", EditEnabled = true, MixerClassName = "com.softsynth.jmsl.NullMixer", Transposition = 0.0)
{
    this["CLASSNAME"] = CLASSNAME;
    this["InsIndex"] = InsIndex;
    this["EditEnabled"] = EditEnabled;
    this["Name"] = Name;
    this["MixerClassName"] = MixerClassName;
    this["Transposition"] = Transposition;
}

function jmslscoreinstrument(attributes, dim = [])
{
    this["$"] = attributes;
    this["dim"] = dim;
}

function jmslscoreinstrument_dim_attributes(index, defaultvalue, lowlimit, highlimit, name)
{
    this["index"] = index;
    this["defaultvalue"] = defaultvalue;
    this["lowlimit"] = lowlimit;
    this["highlimit"] = highlimit;
    this["name"] = name;
}

function jmslscoreinstrument_dim(attributes)
{
    this["$"] = attributes;
}

function mixerpanelsettings(panamppair = [])
{
    this["panamppair"] = panamppair;
}

function panamppair(attributes)
{
    this["$"] = attributes;
}

function panamppair_attributes(FADERINDEX = 0, PAN = 0.5, AMP = 0.5)
{
    this["FADERINDEX"] = FADERINDEX;
    this["PAN"] = PAN;
    this["AMP"] = AMP;
}

function staffspacing_attributes(INDEX = 0, ABOVE = 72.0, BELOW = 72.0)
{
    this["INDEX"] = INDEX;
    this["ABOVE"] = ABOVE;
    this["BELOW"] = BELOW;
}

function staffspacing(attributes)
{
    this["$"] = attributes;
}

function scoresection_attributes(NAME, START, END)
{
    this["NAME"] = NAME;
    this["START"] = START;
    this["END"] = END;
}

function scoresection(attributes)
{
    this["$"] = attributes;
}

function measure_attributes(WIDTH = 1523, WIDTHSETBYHAND = false, TIMESIG = "4 4", TIMESIGSETBYHAND = false, TEMPO = 60.0, TEMPOSETBYHAND = false, REPEATSTART = false, REPEATEND = false, NUMREPEATS = 1, BARLINE = "SINGLE", MEASURETEXT = "", MEASURETEXTX = 48, MEASURETEXTY = 48)
{
    this["WIDTH"] = WIDTH;
    this["WIDTHSETBYHAND"] = WIDTHSETBYHAND;
    this["TIMESIG"] = TIMESIG; // this is two numbers in quotes separated by a space!! i.e., "3 4" fml
    this["TIMESIGSETBYHAND"] = TIMESIGSETBYHAND;
    this["TEMPO"] = TEMPO;
    this["TEMPOSETBYHAND"] = TEMPOSETBYHAND;
    this["REPEATSTART"] = REPEATSTART;
    this["REPEATEND"] = REPEATEND;
    this["NUMREPEATS"] = NUMREPEATS;
    this["BARLINE"] = BARLINE;
    this["MEASURETEXT"] = MEASURETEXT;
    this["MEASURETEXTX"] = MEASURETEXTX;
    this["MEASURETEXTY"] = MEASURETEXTY;
}

function jmsl_measure(attributes, staff = [])
{
    this["$"] = attributes;
    this["staff"] = [];
}

function staff_attributes(INDEX, CLEF, CLEFSETBYHAND = false, INSTRUMENTINDEX, INSINDEXSETBYHAND = false, KEYSIGTYPE, KEYSIGNUMACC, KEYSIGSETBYHAND = false, EXTENDEDLINESABOVE = 0, EXTENDEDLINESBELOW = 0)
{
    this["INDEX"] = "0"
    this["CLEF"] = "0"
    this["CLEFSETBYHAND"] = "false"
    this["INSTRUMENTINDEX"] = "0"
    this["INSINDEXSETBYHAND"] = "false"
    this["KEYSIGTYPE"] = "1"
    this["KEYSIGNUMACC"] = "0"
    this["KEYSIGSETBYHAND"] = "false"
    this["EXTENDEDLINESABOVE"] = "0"
    this["EXTENDEDLINESBELOW"] = "0"
}

function staff(attributes, track = [])
{
    this["$"] = attributes;
    this["track"] = track;
}

function track_attributes(INDEX)
{
    this["INDEX"] = INDEX;
}

function track(attributes, note = [])
{
    this["$"] = attributes;
    this["note"] = note;
}

function note_attributes(
    NOTEDUR,
    TUPLET = 0,
    DOTS = 0,
    ACCINFO = 2,
    DURATION,
    PITCH,
    VELOCITY,
    HOLD,
    BEAMEDOUT = true,
    GLISSOUT = false,
    TIEDOUT = false,
    ACCPREF = 1,
    ACCVISPOLICY = 0,
    ALTENHARMONIC = false,
    DYN,
    SLUROUT = false,
    ISGRACENOTE = false,
    WEDGE = "none",
    OTTAVA = "none",
    MARK = 0,
    TEXTOFFSETX = 0,
    TEXTOFFSETY = 0,
    NOTEHEAD = 0,
    VISIBLE = true,
    NOTEHEADVISIBLE = true,
    STEMVISIBLE = true,
    STEMINFOOVERRIDE = false,
    STEMINFO = 2,
    TEXT = "")
{
    this["NOTEDUR"] = NOTEDUR
    this["TUPLET"] = TUPLET
    this["DOTS"] = DOTS
    this["ACCINFO"] = ACCINFO
    this["DURATION"] = DURATION
    this["PITCH"] = PITCH
    this["VELOCITY"] = VELOCITY
    this["HOLD"] = HOLD
    this["BEAMEDOUT"] = BEAMEDOUT
    this["GLISSOUT"] = GLISSOUT
    this["TIEDOUT"] = TIEDOUT
    this["ACCPREF"] = ACCPREF
    this["ACCVISPOLICY"] = ACCVISPOLICY
    this["ALTENHARMONIC"] = ALTENHARMONIC
    this["DYN"] = DYN
    this["SLUROUT"] = SLUROUT
    this["ISGRACENOTE"] = ISGRACENOTE
    this["WEDGE"] = WEDGE
    this["OTTAVA"] = OTTAVA
    this["MARK"] = MARK
    this["TEXTOFFSETX"] = TEXTOFFSETX
    this["TEXTOFFSETY"] = TEXTOFFSETY
    this["NOTEHEAD"] = NOTEHEAD
    this["VISIBLE"] = VISIBLE
    this["NOTEHEADVISIBLE"] = NOTEHEADVISIBLE
    this["STEMVISIBLE"] = STEMISVISIBLE
    this["STEMINFOOVERRIDE"] = STEMINFOOVERRIDE
    this["STEMINFO"] = STEMINFO
    this["TEXT"] = TEXT
}

function note_dim_attributes(index, value, name)
{
    this["index"] = index;
    this["value"] = value;
    this["name"] = name;
}

function note_dim(attributes)
{
    this["$"] = attributes;
}

function musicxml_score_timewise_to_jmsl(musicxml_json, jmsl_json)
{
    var ss = []
    var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for(const c of alpha){
	ss.push(new scoresection(new scoresection_attributes(c, 0, 0)))
    }
    jmsl_json.jmslscoredoc.score = [new score(new score_attributes(),
					      [ new ScoreAnnotation(new ScoreAnnotation_attributes()) ],
					      [ new orchestra(new orchestra_attributes()) ],
					      [ new mixerpanelsettings(new panamppair(new panamppair_attributes())) ],
					      [ new staffspacing(new staffspacing_attributes()) ],
					      ss,
					     )]
    _musicxml_transcoder(musicxml_json,
			 jmsl_json,
			 {
			     'work' : musicxml_work_to_jmsl,
			     //'identification' : musicxml_identification_to_jmsl,
			     'part-list' : musicxml_part_list_to_jmsl,
			     'measure' : musicxml_measure_to_jmsl
			 })
}

function musicxml_work_to_jmsl(musicxml_json, jmsl_json)
{
    _musicxml_transcoder(musicxml_json,
			 jmsl_json,
			 {
			     'work-title' : function(musicxml_json, jmsl_json){
				 jmsl_json.jmslscoredoc.score[0]['$'].NAME = musicxml_json;
			     }
			 })
}

// function musicxml_identification_to_jmsl(musicxml_json, jmsl_json)
// {
//     _musicxml_transcoder(musicxml_json,
// 			 jmsl_json,
// 			 {
// 			     'encoding' : function(musicxml_json, jmsl_json){
// 			     }
// 			 })
// }

function musicxml_part_list_to_jmsl(musicxml_json, jmsl_json)
{
    _musicxml_transcoder(musicxml_json,
			 jmsl_json,
			 {
			     'score-part' : function(musicxml_json, jmsl_json){
				 _musicxml_transcoder(musicxml_json,
						      jmsl_json,
						      {
							  '$' : function(musicxml_json, jmsl_json){
							  },
							  'part-name' : function(musicxml_json, jmsl_json){
							      var n = jmsl_json.jmslscoredoc.score[0].orchestra[0].jmslscoreinstrument.length;
							      var inst = new jmslscoreinstrument(
								  new jmslscoreinstrument_attributes(n, musicxml_json),
								  [new jmslscoreinstrument_dim(new jmslscoreinstrument_dim_attributes(4, 0.0, 0.0, 3.0, "EventFlag")),
								   new jmslscoreinstrument_dim(new jmslscoreinstrument_dim_attributes(5, -1.0, -1.0, 127.0, "originalPitch")),
								   new jmslscoreinstrument_dim(new jmslscoreinstrument_dim_attributes(6, -1.0, -1.0, 10000.0, "index"))]);
							      jmsl_json.jmslscoredoc.score[0].orchestra[0].jmslscoreinstrument.push(inst);
							  }
						      })
			     }
			 })
}

function musicxml_measure_to_jmsl(musicxml_json, jmsl_json)
{
    console.log("measure: ");
    console.log(musicxml_json);
    var measure = new jmsl_measure(new measure_attributes())
    _musicxml_transcoder(musicxml_json,
			 jmsl_json,
			 {
			     'part' : function(musicxml_json, jmsl_json){
				 _musicxml_transcoder(musicxml_json,
						      jmsl_json,
						      {
							  'attributes' : function(musicxml_json, jmsl_json){
							      _musicxml_transcoder(musicxml_json,
										   jmsl_json,
										   {
										       'divisions' : function(){},
										       'key' : function(){},
										       'time' : function(){},
										       'clef' : function(){}
										   })
							  },
							  'direction' : function(){},
							  'note' : function(){}
						      })
			     }
			 })
}

function default_elem_handler(key, musicxml_json, output_obj)
{
    console.log("skipping elem:        " + key);
    //this.transcode(musicxml_json, output_obj);
}

var musicxml_callbacks =
{
    'score-timewise' : musicxml_score_timewise_to_jmsl,
}

function _musicxml_transcoder(musicxml_json, output_obj, callbacks, default_elem_handler_fn = default_elem_handler)
{
    _this = this
    Object.keys(musicxml_json).forEach(function(k){
	if(Array.isArray(musicxml_json[k]) == true){
	    musicxml_json[k].forEach(function(o){
		if(callbacks[k] == undefined){
		    default_elem_handler(k, o, output_obj)
		}else{
	    	    callbacks[k](o, output_obj);
		}
	    })
	}else{
	    if(callbacks[k] == undefined){
		default_elem_handler(k, musicxml_json[k], output_obj)
	    }else{
		callbacks[k](musicxml_json[k], output_obj)
	    }
	}
    })
    return output_obj
}

function musicxml2jmsl_transcoder(musicxml_json)
{
    return _musicxml_transcoder(musicxml_json, new doc(), musicxml_callbacks);
}

function timewise_to_partwise(tw)
{
// not sure we need this
}

function partwise_to_timewise(pw)
{
    var tw = JSON.parse(JSON.stringify(pw));
    Object.defineProperty(tw, 'score-timewise',
			  Object.getOwnPropertyDescriptor(tw, 'score-partwise'));
    delete tw['score-partwise'];
    var part = JSON.parse(JSON.stringify(pw['score-partwise'].part));
    delete tw['score-timewise'].part;
    tw['score-timewise'].measure = new Array(part[0].measure.length);
    part[0].measure.forEach(function(pm, i){
	tw['score-timewise'].measure[i] = {'$' : pm['$'], 'part' : new Array(part.length)};
    })

    tw['score-timewise'].measure.forEach(function(m, i){
	part.forEach(function(p, j){
	    m.part[j] = JSON.parse(JSON.stringify(p.measure[i]));
	    m.part[j]['$'] = JSON.parse(JSON.stringify(p['$']));
	})
    })
    return tw;
}

function __main()
{
    var filename = process.argv[2];
    fs.readFile(filename, {encoding: 'utf-8'}, function(err, xmlstr){
	if (!err) {
	    xml2js.parseString(xmlstr, function(err, musicxmljs){
		if(!err){
		    if(musicxmljs['score-timewise'] != undefined){
		    }else if(musicxmljs['score-partwise'] != undefined){
			musicxmljs = partwise_to_timewise(musicxmljs);
			var jmsljs = musicxml2jmsl_transcoder(musicxmljs)
			var builder = new xml2js.Builder()
			var jmslxml = builder.buildObject(jmsljs)
			console.log(jmslxml)
		    }else{
			console.log("can't find score-partwise or score-timewise tag. this doesn't appear to be a musicxml score...");
			return;
		    }
// do it here
		}else{
		    console.log("error converting xml string to json:\n" + err);
		}
	    });
	} else {
	    console.log("error reading xml file:\n" + err);
	}
    });

}

__main();

//var builder = new xml2js.Builder();
//var rt = builder.buildObject(xmljs);
//console.log(rt);
