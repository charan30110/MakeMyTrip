const usersModel = require('../models/users.model')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    try {
        let { formData } = req.body
        // console.log(formData)
        let user = await usersModel.findOne({ uname: formData.uname })
        if (!user || user.password !== formData.password) {
            return res.status(400).send("Invalid credetials")
        } else {
            jwt.sign({ user }, "secret", (error, token) => {
                if (!error) {
                    res.cookie("jwt", token, {
                        path: "/",
                        maxAge: 2 * 3600 * 1000
                    })
                    return res.status(200).json({ status: 'success', token: token, role: user.role, uname: user.uname})
                } else {
                    return res.status(400).send("jwt Error")
                }
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Error!!!")
    }
}

const register = async (req, res) => {
    try {
        let { formData } = req.body
        formData.role = "customer"
        delete formData.reTypePassword;
        // console.log(formData)
        let isUser = await usersModel.findOne({ uname: formData.uname })
        if (isUser) return res.status(400).send("Already a register user")
        let user = await usersModel.create(formData)
        return res.status(200).send("Success")
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Error!!!")
    }
}

module.exports = {
    login,
    register
}