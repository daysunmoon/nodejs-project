const db = require('../config/db');
const schema = new db.Schema({
    cinemaName:String,
    cinemaAddress:String,
    LowerPrice:String,
    mile:String
})
module.exports = db.model('cinema',schema);