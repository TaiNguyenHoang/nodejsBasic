import userService from '../services/userService'


let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    // check email exits
    //compare password
    // return userInformation
    // json_token (access_token): JWT-json web token
    if(!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing inputs parameter!"
        })
    }

    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        userMessage: userData.errMessage,
        user: userData.user ? userData.user : {},
    })
}


let handleGetAllUsers =async (req,res) => {
    let id = req.query.id //ALL or SINGE id
    let users = await userService.getAllUsers(id)
    

    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing parameter',
            users: []
        })
    }
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Oke you good',
        users
    })
}

let handleCreateNewUser = async(req,res) => {
    let message = await userService.createNewUser(req.body)
    return res.status(200).json(message)
}


let handleEditUser = async (req, res) => {
    let data = req.body
    let message = await userService.updateUserData(data)
    return res.status(200).json(message)
}


let handleDeleteUser = async (req,res) => {
    let id = req.body.id
    if(!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing Parameter from userController!"
        })
    } else {
        let message = await userService.deleteUser(id)
        return res.status(200).json(message)
    }
}


let getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type)

        return res.status(200).json(data)
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "can not get all code"
        })
    }
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser:handleDeleteUser,
    getAllCode: getAllCode,
}