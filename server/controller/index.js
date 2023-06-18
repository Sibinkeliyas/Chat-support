const userShema = require('../model/userShema')
const bcrypt = require('bcrypt')
const admiShema = require('../model/adminShema')
const generateToken = require('../middleware/generateToken')

exports.login = (req , res) => {
    try {
        if(!req.body.admin) {
            userShema.findOne({email : req.body.email}).then((data) => {
            if(data) {
                bcrypt.compare( req.body.password , data.password ,(err , result) => {
                    if(err)  {
                        res.status(401).json(err)
                    } else if(result){
                        const user = {
                            email : data.email ,
                            token : generateToken('user') ,
                            _id : data._id
                        }
                        res.status(200).json({data : user, user : true})
                    } else {
                        res.status(401).json("invalid password")
                    }
                })
            } else {
                bcrypt.hash(req.body.password , 10 , (err , data) => {
                    if(err) {
                        res.status(401).json(err.message)
                    } else {
                        req.body.password = data
                            userShema.create(req.body).then((data) => {
                                const user = {
                                    email : req.body.email ,
                                    token : generateToken('user') ,
                                    _id : data._id
                                }
                                res.status(200).json({data : user , user : true})
                            }).catch((err) => {
                                res.status(401).json(err.message)
                            })
                        }
                    })
                }
            })
        } else {
            admiShema.findOne({email : req.body.email}).then((data) => {
            if(data) {
                bcrypt.compare( req.body.password , data.password ,(err , result) => {
                    if(err)  {
                        res.status(401).json(err)
                    } else if(result){
                        const admin = {
                            email : data.email ,
                            token : generateToken('admin')
                        }
                        res.status(200).json({data : admin , admin : true})
                    } else {
                        res.status(401).json("invalid password")
                    }
                })
            } else {
                bcrypt.hash(req.body.password , 10 , (err , data) => {
                    if(err) {
                        res.status(401).json(err.message)
                    } else {
                        req.body.password = data
                            admiShema.create(req.body).then((data) => {
                                const admin = {
                                    email : req.body.email ,
                                    token : generateToken('admin')
                                }
                                res.status(200).json({data : admin , admin : true})
                            }).catch((err) => {
                                res.status(401).json(err.message)
                            })
                        }
                    })
                }
            })
        }
    } catch (err) {
        
    }
}

exports.findUsers = (req , res) => {
    try {
        userShema.find().then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
}


