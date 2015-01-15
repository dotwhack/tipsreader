var fs = require('fs');
var headers = ['TIP SUBMITTER','TECHNICAL ESCALATION #','LENOVO RECORD #','DATE CREATED','DATE LAST UPDATED','CLASSIFICATION',
               'SEVERITY LEVEL','CONTACT CENTER CRITICAL','PE APPROVAL NAME','COMPONENT CATEGORY','SYMPTOM CATEGORY','TITLE','SYMPTOM','AFFECTED CONFIGURATIONS',
               'AFFECTED SYSTEMS','SYSTEM IS CONFIGURED WITH','OPERATING SYSTEMS','LIMITATIONS','SOLUTION','WORKAROUND','META KEY WORDS','TRADEMARKS'
               ];

var tipObj = {};
var tip = fs.readFileSync('./singletip.txt', 'utf8');
var lines = tip.split('\n');
var cleanLines = lines.map(function(x){
	var r = x.split(':'); 
	r.forEach(function(i){
		r[r.indexOf(i)] = i.trim();	
	});
	return r;
 });

var count = 0;
var filtered = cleanLines.filter(function(x){	
	if(x != '') return x;	
});

filtered.forEach(function(s){
	s.forEach(function(t){
		if(t == ''){
			s.splice(s.indexOf(t),1);
		}
	});
});

//console.log(filtered);

//console.log(filtered[1].indexOf('ECR 204967'));
var tipArray = [];
filtered.forEach(function(x){
	x.forEach(function(i){
		tipArray.push(i);
	});
});
//console.log(tipArray);
//tipArray.splice(tipArray.indexOf('TRADEMARKS'),15);
//console.log(tipArray);

//console.log(tipArray.indexOf('TIP SUBMITTER'),tipArray.indexOf('TECHNICAL ESCALATION #'));


var nextHeader = 1;
headers.forEach(function(x){
	
	
	var newArray = tipArray.splice(tipArray.indexOf(x)+1, tipArray.indexOf(headers[nextHeader])-tipArray.indexOf(x)-1);
	
	tipObj[x] = newArray.join(' ');
	nextHeader++;


});
//tipArray.unshift(1);
//console.log(tipArray);
//console.log(headers[1]);
//var newArray = tipArray.splice(tipArray.indexOf('TIP SUBMITTER')+1, tipArray.indexOf('TECHNICAL ESCALATION #')-tipArray.indexOf('TIP SUBMITTER')-1);
//var newArray = tipArray.splice(tipArray.indexOf('LIMITATIONS')+1, tipArray.indexOf('SOLUTION')-tipArray.indexOf('LIMITATIONS')-1);
//console.log(newArray.join(' '));
console.log(JSON.stringify(tipObj));




