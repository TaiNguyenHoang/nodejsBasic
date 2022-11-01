import express from "express";
import homController from '../controllers/homeController'
import userController from '../controllers/userController'

import doctorController from "../controllers/doctorController"


let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homController.getHomePage);
    router.get('/crud', homController.getCRUD);
    router.post('/post-crud', homController.postCRUD);

    router.get('/get-crud', homController.displayGetCRUD);
    router.get('/edit-crud', homController.getEditCRUD)
    router.post('/put-crud', homController.putCRUD)

    router.get('/delete-crud', homController.deleteCRUD)
    router.get('/new-page', homController.newPage)







    // restful API

    router.post('/api/login', userController.handleLogin)
    router.get('/api/get-all-users', userController.handleGetAllUsers)
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.put('/api/edit-user', userController.handleEditUser)
    router.delete('/api/delete-users', userController.handleDeleteUser) 

    router.get('/api/allcode', userController.getAllCode)

    router.get("/api/top-doctor-home", doctorController.getDoctorHome)

    


    return app.use("/", router)
}

module.exports = initWebRoutes;