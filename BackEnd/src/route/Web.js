import express from "express";
import upload from "../config/Upload";
import ImageUploadController from "../controllers/ImageUploadController";
import AuthController from "../controllers/AuthController";
import UserController from "../controllers/UserController";
import AdminController from "../controllers/AdminController";

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
    //admin
    app.post('/admin/product/upload-image', [AuthController.authenticateUser, AuthController.isAdmin, upload.single('image')], ImageUploadController.imageUploadSingleController);
    app.post('/admin/brand/upload-image', [AuthController.authenticateUser, AuthController.isAdmin, upload.single('image')], ImageUploadController.imageUploadSingleController);
    app.get('/admin/dashboard', [AuthController.authenticateUser, AuthController.isAdmin], AdminController.getDashBoard);
    app.get('/admin/users', [AuthController.authenticateUser, AuthController.isAdmin], AdminController.getAllUsers);
    app.get('/admin/orders', [AuthController.authenticateUser, AuthController.isAdmin], AdminController.getAllOrders);
    app.put('/admin/order/:orderID', [AuthController.authenticateUser, AuthController.isAdmin], AdminController.updateOrderStatus);
    app.get('/admin/products', [AuthController.authenticateUser, AuthController.isAdmin], AdminController.getAllProducts);
    app.post('/admin/product', [AuthController.authenticateUser, AuthController.isAdmin], AdminController.addProduct);
    app.put('/admin/product/:productID', [AuthController.authenticateUser, AuthController.isAdmin], AdminController.updateProduct);
    app.delete('/admin/product/:productID', [AuthController.authenticateUser, AuthController.isAdmin], AdminController.deleteProduct);
    app.get('/admin/brands', [AuthController.authenticateUser, AuthController.isAdmin], AdminController.getAllBrands);
    app.post('/admin/brand', [AuthController.authenticateUser, AuthController.isAdmin], AdminController.addBrand);
    app.put('/admin/brand/:brandID', [AuthController.authenticateUser, AuthController.isAdmin], AdminController.updateBrand);
    app.delete('/admin/brand/:brandID', [AuthController.authenticateUser, AuthController.isAdmin], AdminController.deleteBrand);
    return app.use("/", router);
}

module.exports = initWebRoutes;

