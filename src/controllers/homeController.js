
import db from '../models/index'
import CRUDService from '../services/CRUDService'

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll()
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        })
    } catch (e) {
        console.log(e)
    }

}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body)
    console.log(message)
    return res.send('Bạn đã đăng kí thành công');
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser()
    console.log(data)

    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        // check user data not found

        // x <- y
        return res.render("editCRUD.ejs", {
            user: userData
        })
    } else {
        return res.send('User not found!');
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data)
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers
    })
}

let deleteCRUD = async(req,res) => {
    let id = req.query.id
    if(id) {
        await CRUDService.deleteUserById(id)
        return res.send("Xoas thanh cong")

    } else {
        return res.send('Error not found!')
    }
} 

let newPage = (req, res) => {
    return res.render('new.ejs')
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
    newPage: newPage
}