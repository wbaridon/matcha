const path = require('path');
const read = require('utils-fs-read-hjson');

let list = read.sync(path.join(__dirname, 'config.hjson'), 'utf8');

module.exports.interests = list.interests;
module.exports.lastNames = list.lastNames;
module.exports.firstNames = list.firstNames;