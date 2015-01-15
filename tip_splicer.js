var fs = require('fs');

var tips = fs.readFileSync('./tips.txt', 'utf8');
console.log(tips);