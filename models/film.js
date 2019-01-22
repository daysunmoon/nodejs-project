const db = require('../config/db');
const schema = new db.Schema({
    filmName:String,
    filmImg:String,
    describe:String,
    star:String
})
module.exports = db.model('film',schema);