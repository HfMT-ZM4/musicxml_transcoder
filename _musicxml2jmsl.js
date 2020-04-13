'use strict'

const transcoder = require('./_musicxml_transcoder.js')
const xml2js = require('xml-js')//require('xml2js');

const T = transcoder.transcode;
const v = transcoder.value;

function doc(jmslscoredoc)
{
    this["declaration"] = {
	"attributes" : {
	    "version" : "1.0",
	    "encoding" : "UTF-8",
	    "standalone" : "no"
	}
    }
    this["elements"] = [jmslscoredoc];
    //this["jmslscoredoc"] = jmslscoredoc;
}

function jmslscoredoc(score)
{
    this["type"] = "element",
    this["name"] = "jmslscoredoc",
    this["elements"] = [score]
    //this["score"] = score;
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
    this["TempoVisible"] = "true";
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
	       ScoreAnnotation,
	       orchestra,
	       mixerpanelsettings,
	       staffspacing,
	       scoresection,
	       measure = [])
{
    this["type"] = "element";
    this["name"] = "score";
    this["attributes"] = attrs;
    this["elements"] = [
	ScoreAnnotation,
	orchestra,
	mixerpanelsettings,
	//staffspacing,
	// scoresection,
	// measure,
	// {
	//     "type" : "element",
	//     "name" : "scoreUserBean",
	//     "elements" : [{"attributes" : {"CLASSNAME" : "com.algomusic.max.MaxScoreRenderedMessageListener"}}]
	// }
    ];
    var _this = this;
    staffspacing.forEach(function(ss){
	_this["elements"].push(ss)
    })
    scoresection.forEach(function(ss){
	_this["elements"].push(ss)
    })
    measure.forEach(function(m){
	_this["elements"].push(m)
    })
    // this["ScoreAnnotation"] = ScoreAnnotation;
    // this["orchestra"] = orchestra;
    // this["mixerpanelsettings"] = mixerpanelsettings;
    // this["staffspacing"] = staffspacing;
    // this["scoresection"] = scoresection;
    // this["measure"] = measure;
    // this["scoreUserBean"] = {"attributes" : {"CLASSNAME" : "com.algomusic.max.MaxScoreRenderedMessageListener"}};
}

function setScoreAnnotationAnnotationProp(jmslscore, key, val)
{
    jmslscore.jmslscoredoc.score[0].ScoreAnnotation[0]['attributes'].Annotation[key] = val;
}

function ScoreAnnotation_attrs()
{
    this["CLASSNAME"] = "com.softsynth.jmsl.score.ScoreAnnotation";
    this["Annotation"] = {};
}

function ScoreAnnotation(attrs)
{
    this["type"] = "element";
    this["name"] = "ScoreAnnotation";
    this["attributes"] = attrs;
    this["elements"] = [];
    //this["attributes"] = attrs;
}

function orchestra_attrs()
{
    this["CLASSNAME"] = "com.softsynth.jmsl.score.Orchestra";
}

function orchestra(attrs, jmslscoreinstrument)
{
    this["type"] = "element";
    this["name"] = "orchestra";
    this["attributes"] = attrs;
    this["elements"] = jmslscoreinstrument;
    // this["attributes"] = attrs;
    // this["jmslscoreinstrument"] = jmslscoreinstrument;
}

function jmslscoreinstrument_attrs(InsIndex,
				   Name = "",
				   CLASSNAME = "com.algomusic.max.MaxScoreInstrument",
				   EditEnabled = true,
				   MixerClassName = "com.softsynth.jmsl.NullMixer",
				   Transposition = 0.0)
{
    this["CLASSNAME"] = CLASSNAME;
    this["InsIndex"] = InsIndex;
    this["EditEnabled"] = EditEnabled;
    this["Name"] = Name;
    this["Transposition"] = Transposition;
    this["MixerClassName"] = MixerClassName;
}

function jmslscoreinstrument(attrs, dim)
{
    this["type"] = "element";
    this["name"] = "jmslscoreinstrument";
    this["attributes"] = attrs;
    this["elements"] = dim;
    // this["attributes"] = attrs;
    // this["dim"] = dim;
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
    this["type"] = "element";
    this["name"] = "dim";
    this["attributes"] = attrs;
    this["elements"] = [];
    //this["attributes"] = attrs;
}

// function _addinstrument(jmsl, name = "")
// {
//     var n = jmsl.jmslscoredoc.score[0].orchestra[0].jmslscoreinstrument.length;
//     var inst = new jmslscoreinstrument(
// 	new jmslscoreinstrument_attrs(n, name),
// 	[new jmslscoreinstrument_dim(
// 	    new jmslscoreinstrument_dim_attrs(4, 0.0, 0.0, 3.0, "EventFlag")),
// 	 new jmslscoreinstrument_dim(
// 	     new jmslscoreinstrument_dim_attrs(5, -1.0, -1.0, 127.0, "originalPitch")),
// 	 new jmslscoreinstrument_dim(
// 	     new jmslscoreinstrument_dim_attrs(6, -1.0, -1.0, 10000.0, "index"))]);
//     jmsl.jmslscoredoc.score[0].orchestra[0].jmslscoreinstrument.push(inst);
//     var faderindex = jmsl.jmslscoredoc.score[0].mixerpanelsettings[0].panamppair.length;
//     jmsl.jmslscoredoc.score[0].mixerpanelsettings[0].panamppair.push(new panamppair(new panamppair_attrs(faderindex)));
//     var staffspacingindex = jmsl.jmslscoredoc.score[0].staffspacing.length
//     jmsl.jmslscoredoc.score[0].staffspacing.push(new staffspacing(new staffspacing_attrs(staffspacingindex)));
    
// }

function mixerpanelsettings(panamppair)
{
    this["type"] = "element";
    this["name"] = "mixerpanelsettings";
    this["elements"] = panamppair;
    //this["panamppair"] = panamppair;
}

function panamppair(attrs)
{
    this["type"] = "element";
    this["name"] = "panamppair";
    this["attributes"] = attrs;
    this["elements"] = [];
}

function panamppair_attrs(FADERINDEX,
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
    this["type"] = "element";
    this["name"] = "staffspacing";
    this["attributes"] = attrs;
}

function scoresection_attrs(NAME, START, END)
{
    this["NAME"] = NAME;
    this["START"] = START;
    this["END"] = END;
}

function scoresection(attrs)
{
    this["type"] = "element";
    this["name"] = "scoresection";
    this["attributes"] = attrs;
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

function jmsl_measure(attrs, staff)
{
    this["type"] = "element";
    this["name"] = "measure";
    this["attributes"] = attrs;
    this["elements"] = staff
    //this["staff"] = [];
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

function staff(attrs)
{
    this["type"] = "element";
    this["name"] = "staff";
    this["attributes"] = attrs;
    var tracks = [];
    [0,1,2,3].forEach(x => tracks.push(new track(new track_attrs(x), [])));
		      //tracks.push(new track_attrs(x), []));
    this["elements"] = tracks;
}

function track_attrs(INDEX)
{
    this["INDEX"] = INDEX;
}

function track(attrs, note)
{
    this["type"] = "element";
    this["name"] = "track";
    this["attributes"] = attrs;
    this["elements"] = note;
    //this["note"] = note;
}

function push_measure(jmsl, measure)
{
    jmsl.elements[0].elements[0].elements.push(measure)
}

function push_staff_onto_measure(measure, staff)
{
    measure.elements.push(staff);
}

function push_note_onto_staff(staff, tracknum, note)
{
    staff.elements[tracknum].elements.push(note);
}

function note_attrs(
    NOTEDUR = 0,
    TUPLET = 0,
    DOTS = 0,
    ACCINFO = 0,
    DURATION = 1.0,
    PITCH = 0.0,
    VELOCITY = 90.0,
    HOLD = 1.0,
    BEAMEDOUT = false,
    GLISSOUT = false,
    TIEDOUT = false,
    ACCPREF = 0,
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

function jmsl_note(attrs, dim)
{
    this["type"] = "element";
    this["name"] = "note";
    this["attributes"] = attrs,
    this["elements"] = dim
}

function note_dim_attrs(index, value, name)
{
    this["index"] = index;
    this["value"] = value;
    this["name"] = name;
}

function note_dim(attrs)
{
    this["type"] = "element";
    this["name"] = "dim";
    this["attributes"] = attrs;
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

function notetype_to_notedur(notetype)
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
    	throw "unknown note type " + JSON.stringify(notetype, null, 2);
    }
}
function notetype_to_duration(notetype)
{
    switch(notetype){
    case "breve":
    	return -1;
    case "whole":
    	return 4;
    case "half":
    	return 2;
    case "quarter":
    	return 1;
    case "eighth":
    	return .5;
    case "16th":
    	return .25;
    case "32nd":
    	return .125;
    case "64th":
    	return 6;
    case "128th":
    	return 7;
    default:
    	throw "unknown note type " + JSON.stringify(notetype, null, 2);
    }
}

function notetype_to_notehead(notetype)
{
    switch(notetype){
    case "whole":
    case "half":
	return 1;
    default: return 0;
    }
}

function set_attr(obj, attr, val)
{
    obj['attributes'][attr] = val;
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

function set_staff_attribute(info_obj, partid, partstaffnum, key, val)
{
    
    if(partstaffnum < 0){
	var staffnumlist = info_obj.parts[partid].staffnums;
	staffnumlist.forEach(i => {
	    info_obj.staffattrs[i][key] = val;
	})
    }else{
	var staffnum = info_obj.parts[partid].staffnums[partstaffnum];
	info_obj.staffattrs[staffnum][key] = val;
    }
}

// var musicxml_callbacks =
//     {
// 	'score-timewise' : (mxml,jmsl)=>{
// 	    var ss = []
// 	    var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
// 	    for(const c of alpha){
// 		ss.push(new scoresection(new scoresection_attrs(c, 0, 0)))
// 	    }
// 	    jmsl.jmslscoredoc.score = [new score(new score_attrs(),
// 						 [ new ScoreAnnotation(new ScoreAnnotation_attrs()) ],
// 						 [ new orchestra(new orchestra_attrs()) ],
// 						 [ new mixerpanelsettings() ],
// 						 [],//[ new staffspacing(new staffspacing_attrs()) ],
// 						 ss,
// 						)]
// 	    T(mxml,
// 		jmsl,
// 		{
// 		    'work' : undefined,// function (mxml, jmsl){
// 		    // 	T(mxml,
// 		    // 	    jmsl,
// 		    // 	    {
// 		    // 		'work-title' : (mxml,jmsl)=>{
// 		    // 		    jmsl.jmslscoredoc.score[0]['attributes'].NAME = mxml;
// 		    // 		}
// 		    // 	    })
// 		    // },
// 		    'identification' : undefined,
// 		    'part-list' : function (mxml, jmsl){
// 			T(mxml,
// 			    jmsl,
// 			    {
// 				'score-part' : (mxml,jmsl)=>{
// 				    T(mxml,
// 					jmsl,
// 					{
// 					    'attributes' : undefined,
// 					    'part-name' : (mxml,jmsl)=>{
// 						_addinstrument(jmsl, v(mxml));
// 					    }
// 					})
// 				}
// 			    })
// 		    },
// 		    'measure' : function (mxml, jmsl){
// 			console.log("measure " + mxml.elements.length);
// 		    }
// 		    // 	var measure = new jmsl_measure(new measure_attrs())
// 		    // 	var staves = 1;
// 		    // 	T(mxml,
// 		    // 	    jmsl,
// 		    // 	    {
// 		    // 		'part' : (mxml,jmsl)=>{
// 		    // 		    var tracks = [];
// 		    // 		    [0, 1, 2, 3].forEach(x => tracks.push(new track(new track_attrs(x))))
// 		    // 		    for(var i = 0; i < staves; i++){
// 		    // 			console.error("adding staff " + measure.staff.length);
// 		    // 		    	measure.staff.push(new staff(new staff_attrs(measure.staff.length), tracks));
// 		    // 			_addinstrument(jmsl);
// 		    // 		    }
// 		    // 		    var divisions = 32;
// 		    // 		    T(mxml,
// 		    // 			jmsl,
// 		    // 			{
// 		    // 			    'attributes' : undefined,
// 		    // 			    'attributes' : (mxml,jmsl)=>{
// 		    // 				T(mxml,
// 		    // 				    jmsl,
// 		    // 				    {
// 		    // 					'divisions' : (mxml,jmsl)=>{divisions = Number(mxml)},
// 		    // 					'key' : (mxml,jmsl)=>{
// 		    // 					    T(mxml,
// 		    // 						jmsl,
// 		    // 						{
// 		    // 						    'key-step' : undefined,
// 		    // 						    'key-alter' : undefined,
// 		    // 						    'key-accidental' : undefined,
// 		    // 						    'cancel' : undefined,
// 		    // 						    'fifths' : (mxml,jmsl)=>{
// 		    // 							var i = Number(mxml);
// 		    // 							//foreach(var s in measure.staff){
// 		    // 							measure.staff.forEach(function (s) {
// 		    // 							    if(i < 0){
// 		    // 								set_attr(s,
// 		    // 									 "KEYSIGTYPE",
// 		    // 									 1);
// 		    // 							    }else{
// 		    // 								set_attr(s,
// 		    // 									 "KEYSIGTYPE",
// 		    // 									 0);
// 		    // 							    }
// 		    // 							    set_attr(s,
// 		    // 								     "KEYSIGNUMACC",
// 		    // 								     Math.abs(i));
// 		    // 							});
// 		    // 						    },
// 		    // 						    'mode' : undefined,
// 		    // 						    'key-octave' : undefined
// 		    // 						})},
// 		    // 					'time' : (mxml,jmsl)=>{
// 		    // 					    var beats = 4;
// 		    // 					    var beat_type = 4;
// 		    // 					    T(mxml,
// 		    // 						jmsl,
// 		    // 						{
// 		    // 						    'beats' : (mxml,jmsl)=>{beats = Number(mxml)},
// 		    // 						    'beat-type' : (mxml,jmsl)=>{beat_type = Number(mxml)}
// 		    // 						});
// 		    // 					    measure['attributes'].TIMESIG = beats + " " + beat_type;
// 		    // 					},
// 		    // 					'staves' : (mxml,jmsl)=>{
// 		    // 					    console.error("staves " + staves + " -> " + Number(mxml));
// 		    // 					    staves = Number(mxml);
// 		    // 					    set_attr(jmsl.jmslscoredoc.score[0],
// 		    // 						     "STAFFS",
// 		    // 						     staves);
// 		    // 					    for(var i = measure.staff.length; i < staves; i++){
// 		    // 						// measure.staff.push(new staff(new staff_attrs(measure.staff.length),
// 		    // 						// 			     tracks));
// 		    // 						measure.staff.push(new staff(measure.staff[0]['attributes'],
// 		    // 									     tracks));
// 		    // 					    }
// 		    // 					    for(var i = jmsl.jmslscoredoc.score[0].orchestra[0].jmslscoreinstrument.length;
// 		    // 					    	i < staves; i++){
// 		    // 						_addinstrument(jmsl);
// 		    // 					    }
// 		    // 					},
// 		    // 					'clef' : (mxml,jmsl)=>{
// 		    // 					    var sign = "G"
// 		    // 					    var line = "2"
// 		    // 					    T(mxml,
// 		    // 						jmsl,
// 		    // 						{
// 		    // 						    'sign' : (mxml,jmsl)=>{sign = mxml},
// 		    // 						    'line' : (mxml,jmsl)=>{line = mxml}
// 		    // 						})
// 		    // 					    var clef = 0
// 		    // 					    if(sign == "G"){
// 		    // 						clef = 0;
// 		    // 					    }else if(sign == "C"){
// 		    // 						if(line == "3"){
// 		    // 						    clef = 1; // alto
// 		    // 						}else if(line == "4"){
// 		    // 						    clef = 2; // tenor
// 		    // 						}else{
// 		    // 						    console.error("unsupported placement of clef " +
// 		    // 								  sign + " on line " + line);
// 		    // 						}
// 		    // 					    }else if(sign == "F"){
// 		    // 						clef = 3; // bass
// 		    // 					    }else if(sign == "percussion"){
// 		    // 						clef = 4; 
// 		    // 					    }else{
// 		    // 						console.error("unhandled clef: sign = " +
// 		    // 							      sign + " line: " + line);
// 		    // 					    }
// 		    // 					    set_attr(get_staff(measure, -1),
// 		    // 						     "CLEF",
// 		    // 						     clef)
// 		    // 					}
// 		    // 				    })
// 		    // 			    },
// 		    // 			    'direction' : undefined,
// 		    // 			    'note' : (mxml,jmsl)=>{
// 		    // 				var track = 0;
// 		    // 				var staff = 0;
// 		    // 				var dims = [new note_dim(new note_dim_attrs(4, 0.0, "EventFlag")),
// 		    // 					    new note_dim(new note_dim_attrs(5, -1.0, "originalPitch")),
// 		    // 					    new note_dim(new note_dim_attrs(6, -1.0, "index"))]
// 		    // 				var note = new jmsl_note(new note_attrs(), dims);
// 		    // 				var chord = false;
// 		    // 				T(mxml,
// 		    // 				    jmsl,
// 		    // 				    {
// 		    // 					'pitch' : (mxml,jmsl)=>{
// 		    // 					    var step;
// 		    // 					    var alter = 0
// 		    // 					    var octave;
// 		    // 					    T(mxml,
// 		    // 						jmsl,
// 		    // 						{
// 		    // 						    'step' : (mxml,jmsl)=>{step = mxml},
// 		    // 						    'alter' : (mxml,jmsl)=>{alter = mxml},
// 		    // 						    'octave' : (mxml,jmsl)=>{octave = mxml}
// 		    // 						})
// 		    // 					    var midipitch = note_to_midi(step, alter, octave);
// 		    // 					    set_attr(note, "PITCH", midipitch);
// 		    // 					    set_attr(note['dim'][1], "value", midipitch);
// 		    // 					},
// 		    // 					'duration' : (mxml,jmsl)=>{
// 		    // 					    set_attr(note, "DURATION", Number(mxml) / divisions)
// 		    // 					},
// 		    // 					'voice' : (mxml,jmsl)=>{track = mxml - 1},
// 		    // 					'type' : (mxml,jmsl)=>{
// 		    // 					    set_attr(note, "NOTEDUR", notetype_to_int(mxml))
// 		    // 					},
// 		    // 					'stem' : undefined,
// 		    // 					'staff' : (mxml,jmsl)=>{
// 		    // 					    staff = Number(mxml) - 1;
// 		    // 					},
// 		    // 					'accidental' : undefined,
// 		    // 					'notations' : (mxml,jmsl)=>{
// 		    // 					    T(mxml,
// 		    // 						jmsl,
// 		    // 						{
// 		    // 						    'footnote' : undefined,
// 		    // 						    'level' : undefined,
// 		    // 						    'accidental-mark' : undefined,
// 		    // 						    'arpeggiate' : undefined,
// 		    // 						    'articulations' : undefined,
// 		    // 						    'dynamics' : undefined,
// 		    // 						    'fermata' : undefined,
// 		    // 						    'glissando' : undefined,
// 		    // 						    'non-arpeggiate' : undefined,
// 		    // 						    'ornaments' : undefined,
// 		    // 						    'other-notation' : undefined,
// 		    // 						    'slide' : undefined,
// 		    // 						    'slur' : undefined,
// 		    // 						    'technical' : undefined,
// 		    // 						    'tied' : undefined,
// 		    // 						    'tuplet' : undefined
// 		    // 						})
// 		    // 					},
// 		    // 					'chord' : (mxml,jmsl)=>{chord = true}
// 		    // 				    })
// 		    // 				if(chord == true){
// 		    // 				    var t = get_track(get_staff(measure, -1), track);
// 		    // 				    var n = t.note[t.note.length - 1];
// 		    // 				    if("interval" in n == false){
// 		    // 					n.interval = new Array();
// 		    // 				    }
// 		    // 				    n.interval.push(note);

// 		    // 				}else{
// 		    // 				    push_note(get_track(get_staff(measure, -1), track), note);
// 		    // 				}
						
// 		    // 			    }
// 		    // 			})
// 		    // 		}
// 		    // 	    })
// 		    // 	jmsl.jmslscoredoc.score[0].measure.push(measure)
// 		    // }
// 		})
// 	}
//     }

var musicxml_callbacks =
    {
	'score-timewise' : (mxml,jmsl)=>{
	    var divisions = 32;
	    var tempo = 60;
	    T(mxml, jmsl, {
		  'work' : undefined,// function (mxml, jmsl){
		  // 	T(mxml,
		  // 	    jmsl,
		  // 	    {
		  // 		'work-title' : (mxml,jmsl)=>{
		  // 		    jmsl.jmslscoredoc.score[0]['attributes'].NAME = mxml;
		  // 		}
		  // 	    })
		  // },
		  'identification' : undefined,
		  'part-list' : undefined,
		  // 'part-list' : function (mxml, jmsl){
		  //     T(mxml,
		  // 	jmsl,
		  // 	{
		  // 	    'score-part' : (mxml,jmsl)=>{
		  // 		T(mxml,
		  // 		  jmsl,
		  // 		  {
		  // 		      'attributes' : undefined,
		  // 		      'part-name' : (mxml,jmsl)=>{

		  // 		      }
		  // 		  })
		  // 	    }
		  // 	})
		  // },
		  'measure' : function (mxml, jmsl){
		      var __m = new jmsl_measure(new measure_attrs(), []);
		      __m.attributes.TEMPO = tempo;
		      if("width" in mxml.attributes){
			  // __m.attributes.WIDTH = Math.round(mxml.attributes.width);
			  // __m.attributes.WIDTHSETBYHAND = true;
		      }
		      var sidx = 0;
		      T(mxml, jmsl,
			{
			    'part' : (mxml,jmsl)=>{ // jmsl staff
				var partid = mxml.attributes.id;
				var __ss = [];
				for(var i = 0; i < jmsl.info.parts[partid].nstaves; i++){
				    __ss.push(new staff({}));
				}
				var wedge = "0";
				var dyn = undefined;
				var start_of_measure = true;
				T(mxml, jmsl,
				  {
				      
				      // this is the <attributes> tag, not the attributes of the part tag!
				      'attributes' : (mxml,jmsl)=>{ 
					  T(mxml, jmsl,
					    {
						'divisions' : (mxml,jmsl)=>{divisions = Number(v(mxml));},
						'key' : (mxml,jmsl)=>{
						    T(mxml, jmsl,
						      {
							  'key-step' : undefined,
							  'key-alter' : undefined,
							  'key-accidental' : undefined,
							  'fifths' : (mxml,jmsl)=>{
							      var i = Number(v(mxml));
							      if(i < 0){
								  set_staff_attribute(jmsl.info, partid, -1, "KEYSIGTYPE", 1);
							      }else{
								  set_staff_attribute(jmsl.info, partid, -1, "KEYSIGTYPE", 0);
							      }
							      set_staff_attribute(jmsl.info, partid, -1, "KEYSIGNUMACC", Math.abs(i));
							  },
							  'mode' : undefined,
							  'key-octave' : undefined
						      })
						},
						'time' : undefined,
						'staves' : (mxml,jmsl)=>{
						    // we've already dealt with the number of staves
						    // when we entered this part
						},
						'clef' : (mxml,jmsl)=>{
		    				    var sign = "G"
		    				    var line = "2"
						    var staff = 0;
		    				    T(mxml,jmsl,
		    				      {
							  'attributes' : (mxml,jmsl)=>{
							      // these are the attributes of the clef element
							      if("number" in mxml){
								  staff = Number(mxml.number) - 1;
							      }
							  },
		    					  'sign' : (mxml,jmsl)=>{sign = v(mxml)},
		    					  'line' : (mxml,jmsl)=>{line = v(mxml)}
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
						    set_staff_attribute(jmsl.info, partid, staff, "CLEF", clef);
		    				}
					    })
				      },
				      'barline' : (mxml,jmsl) => {
					  T(mxml, jmsl, {
					      'bar-style' : undefined,
					      'repeat' : (mxml,jmsl)=>{
						  switch(mxml.attributes.direction){
						  case "forward":
						      __m.attributes.REPEATSTART = true;
						      break;
						  case "backward":
						      __m.attributes.REPEATEND = true;
						      break;
						  }
					      }
					  })
				      },
				      'direction' : (mxml,jmsl) => {
					  var staff = 0;
					  var voice = 0;
					  T(mxml, jmsl, {
					      'direction-type' : (mxml,jmsl)=>{
						  T(mxml, jmsl, {
						      'dynamics' : (mxml,jmsl)=>{
							  // DYNAMIC_NONE, DYNAMIC_PPP, DYNAMIC_PP, DYNAMIC_P, DYNAMIC_MP, DYNAMIC_MF, DYNAMIC_F, DYNAMIC_FF, DYNAMIC_FFF
							  T(mxml, jmsl, {
							      'f' : (mxml,jmsl)=>{dyn = 6},
							      'ff' : (mxml,jmsl)=>{dyn = 7},
							      'fff' : (mxml,jmsl)=>{dyn = 8},
							      'ffff' : undefined,
							      'fffff' : undefined,
							      'ffffff' : undefined,
							      'fp' : undefined,
							      'fz' : undefined,
							      'mf' : (mxml,jmsl)=>{dyn = 5},
							      'mp' : (mxml,jmsl)=>{dyn = 4},
							      'other-dynamics' : undefined,
							      'p' : (mxml,jmsl)=>{dyn = 3},
							      'pp' : (mxml,jmsl)=>{dyn = 2},
							      'ppp' : (mxml,jmsl)=>{dyn = 1},
							      'pppp' : undefined,
							      'ppppp' : undefined,
							      'pppppp' : undefined,
							      'rf' : undefined,
							      'rfz' : undefined,
							      'sf' : undefined,
							      'sffz' : undefined,
							      'sfp' : undefined,
							      'sfpp' : undefined,
							      'sfz' : undefined
							  })
						      },
						      'metronome' : (mxml,jmsl)=>{
							  if(start_of_measure == false){
							      transcoder.default_elem_handler(mxml.name, mxml, jmsl);
							  }
							  var beat_unit = 1;
							  T(mxml, jmsl, {
							      'beat-unit' : (mxml,jmsl)=>{
								  switch(v(mxml)){
								  case "whole":
								      beat_unit = 4;
								      break;
								  case "half":
								      beat_unit = 2;
								      break;
								  case "eighth":
								      beat_unit = .5;
								      break;
								  case "16th":
								      beat_unit = .25;
								      break;
								  case "32nd":
								      beat_unit = .125;
								      break;
								  case "64th":
								      beat_unit = .0625;
								      break;
								  case "128th":
								      beat_unit = .03125;
								      break;
								  }
							      },
							      'beat-unit-dot' : (mxml,jmsl)=>{
								  beat_unit *= 1.5;
							      },
							      'per-minute' : (mxml,jmsl)=>{
								  tempo = v(mxml) * beat_unit;
								  __m.attributes.TEMPO = tempo;
							      }
							  })
						      },
						      'wedge' : (mxml,jmsl)=>{
							  T(mxml, jmsl, {
							      'attributes' : (mxml,jmsl)=>{
								  var type = mxml.type;
								  if(type == "stop"){
								      wedge = "0";
								  }else if(type == "crescendo"){
								      wedge = "cresc";
								  }else if(type == "diminuendo"){
								      wedge = "decresc";
								  }else if(type == "continue"){
								      // nothing
								  }
							      }
							  })
						      }
						  })

					      },
					      'offset' : undefined,//(mxml,jmsl)=>{},
					      'voice' : (mxml,jmsl)=>{
						  voice = Number(v(mxml));
					      },
					      'staff' : (mxml,jmsl)=>{
						  staff = Number(v(mxml));
					      }
					  })
				      },
				      'note' : (mxml,jmsl)=>{
					  var nattr = new note_attrs();
					  nattr.WEDGE = wedge;
					  var ndimattrs = [new note_dim_attrs(4, 0.0, "EventFlag"),
							   new note_dim_attrs(5, -1.0, "originalPitch"),
							   new note_dim_attrs(6, -1.0, "index")];
					  var tracknum = 0;
					  var chord = false;
					  var staffnum = 0;
					  var dots = 0;
					  start_of_measure = false;
					  T(mxml, jmsl,
					    {
						'attributes' : undefined,
						'cue' : undefined,
						'grace' : undefined,
						'chord' : (mxml,jmsl)=>{chord = true},
						'pitch' : (mxml,jmsl)=>{
						    var step;
						    var alter = 0
						    var octave;
						    T(mxml, jmsl,
						      {
						    	  'step' : (mxml,jmsl)=>{step = v(mxml)},
						    	  'alter' : (mxml,jmsl)=>{alter = Number(v(mxml))},
						    	  'octave' : (mxml,jmsl)=>{octave = Number(v(mxml))}
						      })
						    var midipitch = note_to_midi(step, alter, octave);
						    nattr.PITCH = midipitch;
						    ndimattrs[1].value = midipitch;
						},
						'rest' : (mxml,jmsl)=>{
						    // rest is indicated by PITCH=0, so nothing to do
						},
						'unpitched' : undefined,
						'duration' : (mxml,jmsl)=>{
						    nattr.DURATION = Number(v(mxml)) / divisions
						},
						'tie' : undefined, // sound element---notations:tied is for notation
						'instrument' : undefined,
						'footnote' : undefined,
						'level' : undefined,
						'voice' : (mxml,jmsl)=>{ // jmsl track
						    tracknum = Number(v(mxml)) - 1;
						},
						'type' : (mxml,jmsl)=>{
						    nattr.NOTEDUR = notetype_to_notedur(v(mxml));
						    nattr.DURATION = notetype_to_duration(v(mxml));
						    nattr.NOTEHEAD = notetype_to_notehead(v(mxml));
						},
						'dot' : (mxml,jmsl)=>{dots++},
						'accidental' : (mxml,jmsl)=>{
						    var atype = v(mxml);
						    switch(atype){
						    case "sharp":
							nattr.ACCINFO = 1;
							nattr.ACCPREF = 0;
							break;
						    case "flat":
							nattr.ACCINFO = 2;
							nattr.ACCPREF = 1;
							break;
						    case "natural":
							nattr.ACCINFO = 3;
							break;
						    case "double-sharp":
							nattr.ACCINFO = 5;
							break;
						    case "flat-flat":
							nattr.ACCINFO = 4;
							break;
						    }
						},
						'time-modification' : undefined,
						'stem' : (mxml,jmsl)=>{
						    var s = v(mxml)
						    switch(s){
						    case "up":
							nattr.STEMINFO = 1;
							nattr.STEMINFOOVERRIDE = true;
							break;
						    case "down":
							nattr.STEMINFO = 2;
							nattr.STEMINFOOVERRIDE = true;
							break;
						    case "none":
							break;
						    case "double":
							break;
						    }
						},
						'notehead' : undefined,
						'notehead-text' : undefined,
						'staff' : (mxml,jmsl)=>{
						    staffnum = Number(v(mxml)) - 1;
						},
						'beam' : (mxml,jmsl)=>{
						    var val = v(mxml);
						    if(val == "begin" || val == "continue"){
							nattr.BEAMEDOUT = true;
						    }
						},
/*
0 : MARK_NONE, 
1 : MARK_ACCENT, 
2 : MARK_STACCATO, 
3 : MARK_TENUTO, 
4 : MARK_WEDGE, 
5 : MARK_ACCENT_STACCATO, 
6 : MARK_ACCENT_TENUTO, 
7 : MARK_WEDGE_STACCATO, 
8 : MARK_FERMATA, 
9 : MARK_HARMONIC, 
10 : MARK_TRILL, 
11 : MARK_TRILL_FLAT, 
12 : MARK_TRILL_SHARP, 
13 : MARK_TRILL_NATURAL, 
14 : MARK_MORDANT, 
15 : MARK_INVERTED_MORDANT, 
16 : MARK_BOWED_TREMOLO_1, 
17 : MARK_BOWED_TREMOLO_2, 
18 : MARK_BOWED_TREMOLO_3, 
19 : MARK_ACCIACCATURA
*/
						'notations' : (mxml,jmsl)=>{
		    				    T(mxml, jmsl,
		    				      {
		    					  'footnote' : undefined,
		    					  'level' : undefined,
		    					  'accidental-mark' : undefined,
		    					  'arpeggiate' : undefined,
		    					  'articulations' : (mxml,jmsl)=>{
							      T(mxml, jmsl, {
								  'accent' : (mxml,jmsl)=>{nattr.MARK = 1},
								  'breath-mark' : undefined,
								  'caesura' : undefined,
								  'detached-legato' : undefined,
								  'doit' : undefined,
								  'falloff' : undefined,
								  'other-articulation' : undefined,
								  'plop' : undefined,
								  'scoop' : undefined,
								  'spiccato' : undefined,
								  'staccatissimo' : (mxml,jmsl)=>{nattr.MARK = 4},
								  'staccato' : (mxml,jmsl)=>{nattr.MARK = 2},
								  'stress' : undefined,
								  'strong-accent' : undefined,
								  'tenuto' : (mxml,jmsl)=>{nattr.MARK = 3},
								  'unstress' : undefined
							      })
							  },
		    					  'dynamics' : (mxml,jmsl)=>{
							      // DYNAMIC_NONE, DYNAMIC_PPP, DYNAMIC_PP, DYNAMIC_P, DYNAMIC_MP, DYNAMIC_MF, DYNAMIC_F, DYNAMIC_FF, DYNAMIC_FFF
							      T(mxml, jmsl, {
								  'f' : (mxml,jmsl)=>{nattr.DYN = 6},
								  'ff' : (mxml,jmsl)=>{nattr.DYN = 7},
								  'fff' : (mxml,jmsl)=>{nattr.DYN = 8},
								  'ffff' : undefined,
								  'fffff' : undefined,
								  'ffffff' : undefined,
								  'fp' : undefined,
								  'fz' : undefined,
								  'mf' : (mxml,jmsl)=>{nattr.DYN = 5},
								  'mp' : (mxml,jmsl)=>{nattr.DYN = 4},
								  'other-dynamics' : undefined,
								  'p' : (mxml,jmsl)=>{nattr.DYN = 3},
								  'pp' : (mxml,jmsl)=>{nattr.DYN = 2},
								  'ppp' : (mxml,jmsl)=>{nattr.DYN = 1},
								  'pppp' : undefined,
								  'ppppp' : undefined,
								  'pppppp' : undefined,
								  'rf' : undefined,
								  'rfz' : undefined,
								  'sf' : undefined,
								  'sffz' : undefined,
								  'sfp' : undefined,
								  'sfpp' : undefined,
								  'sfz' : undefined
							      })
							  },
		    					  'fermata' : (mxml,jmsl)=>{nattr.MARK = 8;},
		    					  'glissando' : (mxml,jmsl)=>{
							      var val = mxml.attributes.type;
							      if(val == "start" || val == "continue"){
								  nattr.GLISSOUT = true;
							      }
							  },
		    					  'non-arpeggiate' : undefined,
		    					  'ornaments' : undefined,
		    					  'other-notation' : undefined,
		    					  'slide' : undefined,
		    					  'slur' : (mxml,jmsl)=>{
							      var val = mxml.attributes.type;
							      if(val == "start" || val == "continue"){
								  nattr.SLUROUT = "true";
							      }else if(val == "stop"){
								  // this is not a valid value for this attribute in jmsl,
								  // but we may not know what voice or staff we're on, so
								  // we put this here as a marker now, and then compare with
								  // the previous attributes for the voice and staff once we know,
								  // down below, just before pushing this note.
								  nattr.SLUROUT = "stop";
							      }
							  },
		    					  'technical' : undefined,
		    					  'tied' : (mxml,jmsl)=>{
							      var val = mxml.attributes.type;
							      if(val == "start" || val == "continue"){
								  nattr.TIEDOUT = true;
							      }
							  },
		    					  'tuplet' : undefined,// (mxml,jmsl)=>{
							  //     if(mxml.attributes.type == "start"){
							  // 	  console.error("tuplet start: ");
							  // 	  //nattr.TUPLET = 1;
							  //     }else{
							  // 	  console.error("tuplet stop: ");
							  // 	  nattr.TUPLET = "stop";
							  //     }
							  // }
		    				      })
		    				},
						'time-modification' : (mxml,jmsl)=>{
						    T(mxml, jmsl, {
							'actual-notes' : (mxml,jmsl)=>{
							    nattr.TUPLET = Number(v(mxml));
							},
							'normal-notes' : (mxml,jmsl)=>{

							}
						    })
						},
						/*
						  <lyric default-y="-130" number="2">
						  <syllabic>middle</syllabic>
						  <text>Je</text>
						  </lyric>
						*/
						'lyric' : (mxml,jmsl)=>{
						    var num = 1;
						    if("default-x" in mxml.attributes){
							nattr.TEXTOFFSETX = mxml.attributes["default-x"];
						    }
						    if("default-y" in mxml.attributes){
							nattr.TEXTOFFSETY = mxml.attributes["default-y"];
						    }
						    if("number" in mxml.attributes){
							num = mxml.attributes.number;
						    }
						    T(mxml, jmsl, {
							'text' : (mxml,jmsl)=>{
							    if(num > 1){
								nattr.TEXT = nattr.TEXT + "\n" + v(mxml);
							    }else{
								nattr.TEXT = v(mxml);
							    }
							}
						    })
						},
						'play' : undefined
					    })
					  nattr.DOTS = dots;
					  if(dyn != undefined){
					      nattr.DYN = dyn;
					      dyn = undefined;
					  }
					  var prev_note_attr = jmsl.info.noteattrs[jmsl.info.parts[partid].staffnums[staffnum]][tracknum];
					  if(nattr.SLUROUT == "stop"){
					      nattr.SLUROUT = "false";
					  }else if(nattr.SLUROUT == "true"){
					      // cool
					  }else{
					      nattr.SLUROUT = prev_note_attr.SLUROUT;
					  }
					  // if(nattr.TUPLET == "stop"){
					  //     nattr.TUPLET = 0;
					  // }else if(nattr.TUPLET == 1){
					  //     // all good
					  // }else{
					  //     nattr.TUPLET = prev_note_attr.TUPLET;
					  // }
					  jmsl.info.noteattrs[jmsl.info.parts[partid].staffnums[staffnum]][tracknum] = nattr;
					  var note = new jmsl_note(nattr, [new note_dim(ndimattrs[0]),
									   new note_dim(ndimattrs[1]),
									   new note_dim(ndimattrs[2])])
					  push_note_onto_staff(__ss[staffnum], tracknum, note);
				      }
				  })
				__ss.forEach((s, i) => {
				    s.attributes = JSON.parse(JSON.stringify(jmsl.info.staffattrs[i]));
				    push_staff_onto_measure(__m, s);
				})
			    }
			})
		      push_measure(jmsl, __m);
		  }
	      })
	}
    }


function init_jmsl_score(mxml)
{
    //var jmsl = new doc();
    var info = transcoder.get_score_info(mxml);
    var ss = [];
    var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for(const c of alpha){
	ss.push(new scoresection(new scoresection_attrs(c, 0, 0)))
    }
    var jmslscoreinstruments = new Array(info.nparts);
    var panamppairs = new Array(info.nparts);
    var staffspacings = new Array(info.nparts);
    
    var nstaves = 0;
    var staff = 0;
    info.partids.forEach(p => {
	info.parts[p].staffnums = [];
	var ns = info.parts[p].nstaves;
	nstaves += ns;
	for(var i = 0; i < ns; i++){
	    info.parts[p].staffnums.push(i + staff);
	}
	staff += nstaves;
    })
    var staffattrs = new Array(nstaves);
    var noteattrs = new Array(nstaves);
    for(var i = 0; i < nstaves; i++){
	jmslscoreinstruments[i] = new jmslscoreinstrument(new jmslscoreinstrument_attrs(i),
							  [new jmslscoreinstrument_dim(new jmslscoreinstrument_dim_attrs(4,
															 0.0,
															 0.0,
															 3.0,
															 "EventFlag")),
							   new jmslscoreinstrument_dim(new jmslscoreinstrument_dim_attrs(5,
															 -1.0,
															 -1.0,
															 127.0,
															 "originalPitch")),
							   new jmslscoreinstrument_dim(new jmslscoreinstrument_dim_attrs(6,
															 -1.0,
															 -1.0,
															 10000.0,
															 "index"))
							  ]);
	panamppairs[i] = new panamppair(new panamppair_attrs(i));
	staffspacings[i] = new staffspacing(new staffspacing_attrs(i));
	staffattrs[i] = new staff_attrs(i);
	noteattrs[i] = [];
	for(var j = 0; j < 4; j++){
	    noteattrs[i].push(new note_attrs());
	}
    }
    var scoreattrs = new score_attrs();
    scoreattrs.STAFFS = nstaves;
    var jmsl = new doc(new jmslscoredoc(new score(scoreattrs,
						  new ScoreAnnotation(new ScoreAnnotation_attrs()),
						  new orchestra(new orchestra_attrs(), jmslscoreinstruments),
						  new mixerpanelsettings(panamppairs),
						  staffspacings,
						  ss)));
    info["nstaves"] = nstaves;
    info["staffattrs"] = staffattrs;
    info["noteattrs"] = noteattrs;
    jmsl['info'] = info;
    return jmsl;
}

function musicxml2jmsl_transcode(mxml)
{
    return T(mxml, new doc(), musicxml_callbacks);
}

function musicxml2jmsl(musicxml_str, callback)
{
    var jsonfromxml = JSON.parse(xml2js.xml2json(musicxml_str,
						 {spaces: 4}))
    var mxml = jsonfromxml;
    for(var i = 0; i < jsonfromxml.elements.length; i++){
	var e = jsonfromxml.elements[i];	
	if(e.name == "score-partwise"){
	    mxml = transcoder.partwise_to_timewise(jsonfromxml)
	    break;
	}
    }
    var jmsl = init_jmsl_score(mxml);
    //console.log(JSON.stringify(jmsl.info, null, 2));
    jmsl = T(mxml, jmsl, musicxml_callbacks);
    //console.log(JSON.stringify(jmsl, null, 2))
    // var jmsl = musicxml2jmsl_transcode(mxml);
    var skipped_elems = {'skipped' : jmsl.skipped_elems};
    var skipped_str = JSON.stringify(skipped_elems,
    				     null,
    				     2);
    delete jmsl['skipped_elems']
    //var score_annotation = jmsl.jmslscoredoc.score[0].ScoreAnnotation[0]['attributes'].Annotation
    //jmsl.jmslscoredoc.score[0].ScoreAnnotation[0]['attributes'].Annotation = JSON.stringify(score_annotation);
    var score_annotation = jmsl.elements[0].elements[0].elements[0].attributes.Annotation;
    jmsl.elements[0].elements[0].elements[0].attributes.Annotation = JSON.stringify(score_annotation);
    var jmsl_xml = xml2js.json2xml(jmsl, {spaces: 4});
    //console.log(jmsl_xml);
    callback(jmsl_xml, skipped_str);
}

// function musicxml2jmsl(musicxml_str, callback)
// {
//     xml2js.parseString(musicxml_str, function(err, mxml){
// 	if(!err){
// 	    if(mxml['score-timewise'] != undefined){
// 	    }else if(mxml['score-partwise'] != undefined){
// 		mxml = transcoder.partwise_to_timewise(mxml);
// 	    }else{
// 		console.error("not a musicxml score.");
// 		return;
// 	    }
// 	    var jmsl = musicxml2jmsl_transcoder(mxml)
// 	    var skipped_elems = {'skipped' : jmsl.skipped_elems}
// 	    var skipped_str = JSON.stringify(skipped_elems,
// 					     null,
// 					     2);
// 	    // console.error("skipped elements: \n");
// 	    // console.error(skipped_str)
// 	    delete jmsl['skipped_elems']
// 	    var score_annotation = jmsl.jmslscoredoc.score[0].ScoreAnnotation[0]['attributes'].Annotation
// 	    jmsl.jmslscoredoc.score[0].ScoreAnnotation[0]['attributes'].Annotation = JSON.stringify(score_annotation);
// 	    var builder = new xml2js.Builder()
// 	    var jmsl_xml = builder.buildObject(jmsl)
// 	    //console.log(jmsl_xml)
// 	    callback(jmsl_xml, skipped_str)
// 	}else{
// 	    console.error("error converting xml string to json:\n" + err);
// 	}
//     });
// }

exports.musicxml2jmsl = musicxml2jmsl
exports.read_musicxml = transcoder.read_musicxml

/*
testing:
make maxscore document and export jmsl (jmsl1)
import jmsl1 to jmsl and export jmsl (jmsl2)
import jmsl2 to jmsl and export musicxml (musicxml1)
transcode musicxml1 to jmsl (jmsl3)
import jmsl3 to jmsl and export jmsl (jmsl4)
diff jmsl4 and jmsl2
*/
