const mongoose = require('mongoose')

const userShema = mongoose.Schema({
    recieve : {
        type : String ,
        required : true
    } ,
    send : {
        type : String ,
        required : true
    }
})

module.exports = mongoose.model('builtInMessage' , userShema)