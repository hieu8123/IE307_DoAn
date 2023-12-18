import express from "express";


const router = express.Router();

const initWebRoutes = (app) => {
    //user

    return app.use("/", router);
}

module.exports = initWebRoutes;

