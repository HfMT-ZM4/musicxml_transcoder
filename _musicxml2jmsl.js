'use strict'

const fs = require('fs');
const xml2js = require('xml2js');

function doc(jmslscoredoc = {})
{
    this["jmslscoredoc"] = jmslscoredoc;
}

function jmslscoredoc(score = [])
{
    this["score"] = score;
}

function score_attrs()
{
    this["NAME"] = "";
    this["SUBTITLE"] = "";
    this["COMPOSER"] = "";
    this["COPYRIGHT"] = "";
    this["WIDTH"] = "800";
    this["HEIGHT"] = "800";
    this["STAFFS"] = "1";
    this["NUMTRACKSPERSTAFF"] = "4";
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

function score(attrs,
	       ScoreAnnotation = [],
	       orchestra = [],
	       mixerpanelsettings = [],
	       staffspacing = [],
	       scoresection = [],
	       measure = [])
{
    this["$"] = attrs;
    this["ScoreAnnotation"] = ScoreAnnotation;
    this["orchestra"] = orchestra;
    this["mixerpanelsettings"] = mixerpanelsettings;
    this["staffspacing"] = staffspacing;
    this["scoresection"] = scoresection;
    this["measure"] = measure;
}

function ScoreAnnotation_attrs()
{
    this["CLASSNAME"] = "com.softsynth.jmsl.score.ScoreAnnotation";
    this["Annotation"] = "";
}

function ScoreAnnotation(attrs)
{
    this["$"] = attrs;
}

function orchestra_attrs()
{
    this["CLASSNAME"] = "com.softsynth.jmsl.score.Orchestra";
}

function orchestra(attrs, jmslscoreinstrument = [])
{
    this["$"] = attrs;
    this["jmslscoreinstrument"] = jmslscoreinstrument;
}

function jmslscoreinstrument_attrs(InsIndex,
				   Name,
				   CLASSNAME = "com.algomusic.max.MaxScoreInstrument",
				   EditEnabled = true,
				   MixerClassName = "com.softsynth.jmsl.NullMixer",
				   Transposition = 0.0)
{
    this["CLASSNAME"] = CLASSNAME;
    this["InsIndex"] = InsIndex;
    this["EditEnabled"] = EditEnabled;
    this["Name"] = Name;
    this["MixerClassName"] = MixerClassName;
    this["Transposition"] = Transposition;
}

function jmslscoreinstrument(attrs, dim = [])
{
    this["$"] = attrs;
    this["dim"] = dim;
}

function jmslscoreinstrument_dim_attrs(index,
				       defaultvalue,
				       lowlimit,
				       highlimit,
				       name)
{
    this["index"] = index;
    this["defaultvalue"] = defaultvalue;
    this["lowlimit"] = lowlimit;
    this["highlimit"] = highlimit;
    this["name"] = name;
}

function jmslscoreinstrument_dim(attrs)
{
    this["$"] = attrs;
}

function mixerpanelsettings(panamppair = [])
{
    this["panamppair"] = panamppair;
}

function panamppair(attrs)
{
    this["$"] = attrs;
}

function panamppair_attrs(FADERINDEX = 0,
			  PAN = 0.5,
			  AMP = 0.5)
{
    this["FADERINDEX"] = FADERINDEX;
    this["PAN"] = PAN;
    this["AMP"] = AMP;
}

function staffspacing_attrs(INDEX = 0,
			    ABOVE = 72.0,
			    BELOW = 72.0)
{
    this["INDEX"] = INDEX;
    this["ABOVE"] = ABOVE;
    this["BELOW"] = BELOW;
}

function staffspacing(attrs)
{
    this["$"] = attrs;
}

function scoresection_attrs(NAME, START, END)
{
    this["NAME"] = NAME;
    this["START"] = START;
    this["END"] = END;
}

function scoresection(attrs)
{
    this["$"] = attrs;
}

function measure_attrs(WIDTH = 1523,
		       WIDTHSETBYHAND = false,
		       TIMESIG = "4 4",
		       TIMESIGSETBYHAND = false,
		       TEMPO = 60.0,
		       TEMPOSETBYHAND = false,
		       REPEATSTART = false,
		       REPEATEND = false,
		       NUMREPEATS = 1,
		       BARLINE = "SINGLE",
		       MEASURETEXT = "",
		       MEASURETEXTX = 48,
		       MEASURETEXTY = 48,
		       MEASURELEFTMARGIN = 50.0)
{
    this["WIDTH"] = WIDTH;
    this["WIDTHSETBYHAND"] = WIDTHSETBYHAND;
    this["TIMESIG"] = TIMESIG; 
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
    this["MEASURELEFTMARGIN"] = MEASURELEFTMARGIN;
}

function jmsl_measure(attrs, staff = [])
{
    this["$"] = attrs;
    this["staff"] = [];
}

function staff_attrs(INDEX = 0, CLEF = 0,
		     CLEFSETBYHAND = false,
		     INSTRUMENTINDEX = 0,
		     INSINDEXSETBYHAND = false,
		     KEYSIGTYPE = 0,
		     KEYSIGNUMACC = 0,
		     KEYSIGSETBYHAND = false,
		     EXTENDEDLINESABOVE = 0,
		     EXTENDEDLINESBELOW = 0)
{
    this["INDEX"] = INDEX
    this["CLEF"] = CLEF
    this["CLEFSETBYHAND"] = CLEFSETBYHAND
    this["INSTRUMENTINDEX"] = INSTRUMENTINDEX
    this["INSINDEXSETBYHAND"] = INSINDEXSETBYHAND
    this["KEYSIGTYPE"] = KEYSIGTYPE
    this["KEYSIGNUMACC"] = KEYSIGNUMACC
    this["KEYSIGSETBYHAND"] = KEYSIGSETBYHAND
    this["EXTENDEDLINESABOVE"] = EXTENDEDLINESABOVE
    this["EXTENDEDLINESBELOW"] = EXTENDEDLINESBELOW
}

function staff(attrs, track = [])
{
    this["$"] = attrs;
    this["track"] = track;
}

function track_attrs(INDEX)
{
    this["INDEX"] = INDEX;
}

function track(attrs, note = [])
{
    this["$"] = attrs;
    this["note"] = note;
}

function note_attrs(
    NOTEDUR = 0,
    TUPLET = 0,
    DOTS = 0,
    ACCINFO = 2,
    DURATION = 1.0,
    PITCH = 60.0,
    VELOCITY = 90.0,
    HOLD = 1.0,
    BEAMEDOUT = true,
    GLISSOUT = false,
    TIEDOUT = false,
    ACCPREF = 1,
    ACCVISPOLICY = 0,
    ALTENHARMONIC = false,
    DYN = 0,
    SLUROUT = false,
    ISGRACENOTE = false,
    GRACENOTESEPARATIONSCALER=2.0,
    LEDGERLINESVISIBLE=true,
    WEDGE = "none",
    OTTAVA = "none",
    MARK = 0,
    TEXTOFFSETX = 0,
    TEXTOFFSETY = 0,
    NOTEHEAD = 0,
    NOTEHEADSCALE=1.0,
    VISIBLE = true,
    NOTEHEADVISIBLE = true,
    STEMVISIBLE = true,
    OVERRIDELEVEL=-1,
    ISOVERRIDELEVEL=false,
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
    this["GRACENOTESEPARATIONSCALER"] = GRACENOTESEPARATIONSCALER
    this["LEDGERLINESVISIBLE"] = LEDGERLINESVISIBLE
    this["WEDGE"] = WEDGE
    this["OTTAVA"] = OTTAVA
    this["MARK"] = MARK
    this["TEXTOFFSETX"] = TEXTOFFSETX
    this["TEXTOFFSETY"] = TEXTOFFSETY
    this["NOTEHEAD"] = NOTEHEAD
    this["NOTEHEADSCALE"] = NOTEHEADSCALE
    this["VISIBLE"] = VISIBLE
    this["NOTEHEADVISIBLE"] = NOTEHEADVISIBLE
    this["STEMVISIBLE"] = STEMVISIBLE
    this["OVERRIDELEVEL"] = OVERRIDELEVEL
    this["ISOVERRIDELEVEL"] = ISOVERRIDELEVEL
    this["STEMINFOOVERRIDE"] = STEMINFOOVERRIDE
    this["STEMINFO"] = STEMINFO
    this["TEXT"] = TEXT
}

function jmsl_note(attrs, dim = [])
{
    this["$"] = attrs,
    this["dim"] = dim
}

function note_dim_attrs(index, value, name)
{
    this["index"] = index;
    this["value"] = value;
    this["name"] = name;
}

function note_dim(attrs)
{
    this["$"] = attrs;
}

function note_to_midi(step, alter, octave)
{
    var midi = 0
    switch(step){
    case "C":
	break;
    case "D":
	midi += 2
	break;
    case "E":
	midi += 4
	break;
    case "F":
	midi += 5
	break;
    case "G":
	midi += 7
	break;
    case "A":
	midi += 9
	break;
    case "B":
	midi += 11
	break;
    }
    if(typeof alter == "string"){
	alter = Number(alter)
    }
    if(typeof octave == "string"){
	octave = Number(octave)
    }
    midi += alter
    midi += (octave + 1) * 12
    return midi    
}

function notetype_to_int(notetype)
{
    switch(notetype){
    case "breve":
	return -1;
    case "whole":
	return 0
    case "half":
	return 1;
    case "quarter":
	return 2;
    case "eighth":
	return 3
    case "16th":
	return 4;
    case "32nd":
	return 5;
    case "64th":
	return 6;
    case "128th":
	return 7;
    default:
	throw "unknown note type";
    }
}

function set_attr(obj, attr, val)
{
    obj['$'][attr] = val;
}

function get_staff(measure, n)
{
    if(n < 0){
	n = measure.staff.length + n;
    }
    return measure.staff[n]
}

function get_track(staff, n)
{
    if(n < 0){
	n = staff.track.length + n;
    }
    return staff.track[n];
}

function push_note(track, note)
{
    track.note.push(note);
}

function default_elem_handler(key, mxml, output_obj)
{
    if(output_obj.skipped_elems == undefined){
	output_obj.skipped_elems = [];
    }
    var o = {}
    o[key] = mxml
    output_obj.skipped_elems.push(o)
}

var musicxml_callbacks =
    {
	'score-timewise' : (mxml,jmsl)=>{
	    var ss = []
	    var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	    for(const c of alpha){
		ss.push(new scoresection(new scoresection_attrs(c, 0, 0)))
	    }
	    jmsl.jmslscoredoc.score = [new score(new score_attrs(),
						 [ new ScoreAnnotation(new ScoreAnnotation_attrs()) ],
						 [ new orchestra(new orchestra_attrs()) ],
						 [ new mixerpanelsettings(new panamppair(new panamppair_attrs())) ],
						 [ new staffspacing(new staffspacing_attrs()) ],
						 ss,
						)]
	    tcd(mxml,
		jmsl,
		{
		    'work' : function (mxml, jmsl){
			tcd(mxml,
			    jmsl,
			    {
				'work-title' : (mxml,jmsl)=>{
				    jmsl.jmslscoredoc.score[0]['$'].NAME = mxml;
				}
			    })
		    },
		    'identification' : undefined,
		    'part-list' : function (mxml, jmsl){
			tcd(mxml,
			    jmsl,
			    {
				'score-part' : (mxml,jmsl)=>{
				    tcd(mxml,
					jmsl,
					{
					    '$' : undefined,
					    'part-name' : (mxml,jmsl)=>{
						var n = jmsl.jmslscoredoc.score[0].orchestra[0].jmslscoreinstrument.length;
						var inst = new jmslscoreinstrument(
						    new jmslscoreinstrument_attrs(n, mxml),
						    [new jmslscoreinstrument_dim(
							new jmslscoreinstrument_dim_attrs(4, 0.0, 0.0, 3.0, "EventFlag")),
						     new jmslscoreinstrument_dim(
							 new jmslscoreinstrument_dim_attrs(5, -1.0, -1.0, 127.0, "originalPitch")),
						     new jmslscoreinstrument_dim(
							 new jmslscoreinstrument_dim_attrs(6, -1.0, -1.0, 10000.0, "index"))]);
						jmsl.jmslscoredoc.score[0].orchestra[0].jmslscoreinstrument.push(inst);
					    }
					})
				}
			    })
		    },
		    'measure' : function (mxml, jmsl){
			var measure = new jmsl_measure(new measure_attrs())
			tcd(mxml,
			    jmsl,
			    {
				'part' : (mxml,jmsl)=>{
				    var tracks = [];
				    [0, 1, 2, 3].forEach(x => tracks.push(new track(new track_attrs(x))))
				    measure.staff.push(new staff(new staff_attrs(measure.staff.length), tracks))
				    var divisions = 32;
				    tcd(mxml,
					jmsl,
					{
					    '$' : undefined,
					    'attributes' : (mxml,jmsl)=>{
						tcd(mxml,
						    jmsl,
						    {
							'divisions' : (mxml,jmsl)=>{divisions = Number(mxml)},
							'key' : (mxml,jmsl)=>{
							    tcd(mxml,
								jmsl,
								{
								    'key-step' : undefined,
								    'key-alter' : undefined,
								    'key-accidental' : undefined,
								    'cancel' : undefined,
								    'fifths' : (mxml,jmsl)=>{
									var i = Number(mxml);
									if(i < 0){
									    set_attr(get_staff(measure, -1),
											   "KEYSIGTYPE",
											   1);
									}else{
									    set_attr(get_staff(measure, -1),
											   "KEYSIGTYPE",
											   0);
									}
									set_attr(get_staff(measure, -1),
										       "KEYSIGNUMACC",
										       Math.abs(i));
								    },
								    'mode' : undefined,
								    'key-octave' : undefined
								})},
							'time' : (mxml,jmsl)=>{
							    var beats = 4;
							    var beat_type = 4;
							    tcd(mxml,
								jmsl,
								{
								    'beats' : (mxml,jmsl)=>{beats = Number(mxml)},
								    'beat-type' : (mxml,jmsl)=>{beat_type = Number(mxml)}
								});
							    measure['$'].TIMESIG = beats + " " + beat_type;
							},
							'clef' : (mxml,jmsl)=>{
							    var sign = "G"
							    var line = "2"
							    tcd(mxml,
								jmsl,
								{
								    'sign' : (mxml,jmsl)=>{sign = mxml},
								    'line' : (mxml,jmsl)=>{line = mxml}
								})
							    var clef = 0
							    if(sign == "G"){
								clef = 0;
							    }else if(sign == "C"){
								if(line == "3"){
								    clef = 1; // alto
								}else if(line == "4"){
								    clef = 2; // tenor
								}else{
								    console.error("unsupported placement of clef " +
										  sign + " on line " + line);
								}
							    }else if(sign == "F"){
								clef = 3; // bass
							    }else if(sign == "percussion"){
								clef = 4; 
							    }else{
								console.error("unhandled clef: sign = " +
									      sign + " line: " + line);
							    }
							    set_attr(get_staff(measure, -1),
								     "CLEF",
								     clef)
							}
						    })
					    },
					    'direction' : undefined,
					    'note' : (mxml,jmsl)=>{
						var track = 0;
						var dims = [new note_dim(new note_dim_attrs(4, 0.0, "EventFlag")),
							    new note_dim(new note_dim_attrs(5, -1.0, "originalPitch")),
							    new note_dim(new note_dim_attrs(6, -1.0, "index"))]
						var note = new jmsl_note(new note_attrs(), dims);
						var chord = false;
						tcd(mxml,
						    jmsl,
						    {
							'pitch' : (mxml,jmsl)=>{
							    var step;
							    var alter = 0
							    var octave;
							    tcd(mxml,
								jmsl,
								{
								    'step' : (mxml,jmsl)=>{step = mxml},
								    'alter' : (mxml,jmsl)=>{alter = mxml},
								    'octave' : (mxml,jmsl)=>{octave = mxml}
								})
							    set_attr(note, "PITCH", note_to_midi(step, alter, octave));
							},
							'duration' : (mxml,jmsl)=>{
							    set_attr(note, "DURATION", Number(mxml) / divisions)
							},
							'voice' : (mxml,jmsl)=>{track = mxml - 1},
							'type' : (mxml,jmsl)=>{
							    set_attr(note, "NOTEDUR", notetype_to_int(mxml))
							},
							'accidental' : undefined,
							'notations' : (mxml,jmsl)=>{
							    tcd(mxml,
								jmsl,
								{
								    'footnote' : undefined,
								    'level' : undefined,
								    'accidental-mark' : undefined,
								    'arpeggiate' : undefined,
								    'articulations' : undefined,
								    'dynamics' : undefined,
								    'fermata' : undefined,
								    'glissando' : undefined,
								    'non-arpeggiate' : undefined,
								    'ornaments' : undefined,
								    'other-notation' : undefined,
								    'slide' : undefined,
								    'slur' : undefined,
								    'technical' : undefined,
								    'tied' : undefined,
								    'tuplet' : undefined
								})
							},
							'chord' : (mxml,jmsl)=>{chord = true}
						    })
						if(chord == true){
						    var t = get_track(get_staff(measure, -1), track);
						    var n = t.note[t.note.length - 1];
						    if("interval" in n == false){
							n.interval = new Array();
						    }
						    n.interval.push(note);

						}else{
						    push_note(get_track(get_staff(measure, -1), track), note);
						}
						
					    }
					})
				}
			    })
			jmsl.jmslscoredoc.score[0].measure.push(measure)
		    }
		})
	}
    }

function tcd(mxml,
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

function musicxml2jmsl_transcoder(mxml)
{
    return tcd(mxml, new doc(), musicxml_callbacks);
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

function musicxml2jmsl(musicxml_str, callback)
{
    xml2js.parseString(musicxml_str, function(err, mxml){
	if(!err){
	    if(mxml['score-timewise'] != undefined){
	    }else if(mxml['score-partwise'] != undefined){
		mxml = partwise_to_timewise(mxml);
	    }else{
		console.error("not a musicxml score.");
		return;
	    }
	    var jmsl = musicxml2jmsl_transcoder(mxml)
	    var skipped_elems = {'skipped' : jmsl.skipped_elems}
	    var skipped_str = JSON.stringify(skipped_elems,
					     null,
					     2);
	    // console.error("skipped elements: \n");
	    // console.error(skipped_str)
	    delete jmsl['skipped_elems']
	    var builder = new xml2js.Builder()
	    var jmsl_xml = builder.buildObject(jmsl)
	    //console.log(jmsl_xml)
	    callback(jmsl_xml, skipped_str)
	}else{
	    console.error("error converting xml string to json:\n" + err);
	}
    });
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

exports.musicxml2jmsl = musicxml2jmsl
exports.read_musicxml = read_musicxml

/*
testing:
make maxscore document and export jmsl (jmsl1)
import jmsl1 to jmsl and export jmsl (jmsl2)
import jmsl2 to jmsl and export musicxml (musicxml1)
transcode musicxml1 to jmsl (jmsl3)
import jmsl3 to jmsl and export jmsl (jmsl4)
diff jmsl4 and jmsl2
*/
