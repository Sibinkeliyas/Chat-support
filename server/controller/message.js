const MessageShema = require('../model/built_in_message')

exports.addMessage = (req , res) => {
    try {
        MessageShema.findOne({recieve : { $regex : req.body.recieve}}).then((data) => {
            if(data) {
                console.log("SADFASDFASFASFD");
                res.status(401).json('Question is already added')
            } else {
                MessageShema.create(req.body).then(() => {
                    MessageShema.find().then((data) => {
                        res.status(200).json(data)
                    }).catch((err) => {
                        res.status(401).json(err)
                    })
                }).catch((err) => {
                    res.status(401).json(err.message)
                })
            }
        })
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.findMessage = (req , res) => {
    try {
        MessageShema.find().then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        
    }
}