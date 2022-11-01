
import bcrypt from 'bcryptjs';
import db from '../models/index'


const salt = bcrypt.genSaltSync(10)

let createNewUser  =  async (data) => {
    return new Promise(async (resolve, reject) => { // resolve tuong tu return
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1'  ? false : true,
                roleId: data.roleId,
            })
            resolve('create new User Succeed')
        } catch(e) {
            reject(e);
        }
    })
}

let hashUserPassword = (password) => { // mã hoá password
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt)
            resolve(hashPassword)
        } catch(e) {
            reject(e)
        }
    })
}

let getAllUser =  () => {
    return new Promise( async(resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true, 
                // raw: true (Hiển thị dưới dạng 1 object (JSON))
            });
            resolve(users)
        } catch(e) {
            reject(e)
        }
    })
}

let getUserInfoById =  (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            })
            if(user) {
                resolve(user)
            } else {
                resolve({})
            }
        } catch (e) {
            reject(e)
        }
    })
}

let updateUserData = async (data) => {
    return new Promise( async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id},
                raw: true
                
            })
            if(user) {
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address
               
                await db.User.save()
                let allUsers = await db.User.findAll();
                resolve(allUsers)
            } else {
                resolve()
            }
        } catch (e) {
            reject(e)
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise( async( resolve,reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: userId},

            })
            if(user) {
                await db.User.destroy({
                    where: {id: userId}
                })

            }
            resolve() // return
        } catch(e) {
            reject(e)
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
}