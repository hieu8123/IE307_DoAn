import express from "express";
import AuthController from "../controllers/AuthController";
import UserController from "../controllers/UserController";


const router = express.Router();

const initWebRoutes = (app) => {
    //user
    app.post('/login', AuthController.login);
    app.post('/signup', AuthController.signup);
    app.delete('/user', [AuthController.authenticateUser], AuthController.deleteUser);
    app.put('/change-password', [AuthController.authenticateUser], AuthController.changePassword);
    app.get('/products', [AuthController.authenticateUser], UserController.getAllProducts);
    app.get('/brands', [AuthController.authenticateUser], UserController.getAllBrands);
    app.get('/orders', [AuthController.authenticateUser], UserController.getAllOrdersByUser);
    app.post('/checkout', [AuthController.authenticateUser], UserController.checkOut);
    app.get('/wishlist', [AuthController.authenticateUser], UserController.getAllWishListByUser);
    app.post('/wishlist', [AuthController.authenticateUser], UserController.addWishList);
    app.delete('/wishlist/:productID', [AuthController.authenticateUser], UserController.deleteWishList);

    return app.use("/", router);
}

module.exports = initWebRoutes;

