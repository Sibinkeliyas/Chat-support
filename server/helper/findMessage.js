const MessageShema = require('../model/built_in_message')

module.exports = {
    doFindMessage : (message) => {
        return new Promise((resolve, reject) => {
            MessageShema.findOne({recieve : {$regex : message , $options : 'i'}}).then((data) => {
                if(data) {
                    resolve(data)
                } else {
                    reject("I cant't answer for this 😔")
                }
            }).catch((err) => {
                reject(err)
            })
        })
    }
}