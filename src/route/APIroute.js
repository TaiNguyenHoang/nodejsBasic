import express from "express"

import doctorController from "../controllers/doctorController"

let router = express.Router()


let initApiRouter = (app) => {


    router.get("/test", doctorController.testApi)

    app.use("/api", router)
}


export default initApiRouter