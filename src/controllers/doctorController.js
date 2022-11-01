import express from "express";
import doctorService from "../services/doctorService"

let getDoctorHome = async (req, res) => {
    let limit = req.body.limit;
    if (!limit) {
        limit = 10
    }
    try {
        let getTopDoctor = await doctorService.getTopDoctorHome(limit);
        return res.status(200).json(getTopDoctor)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error code from service"
        })
    }
}

let testApi = (req, res) => {
    return res.send("oke")
}

module.exports = {
    getDoctorHome: getDoctorHome,
    testApi
}