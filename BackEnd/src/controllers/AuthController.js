import bcrypt from 'bcrypt';
import UserService from '../services/UserService';
import OrderService from '../services/OrderService';
import OrderDetailService from '../services/OrderDetailService';
import ReviewService from '../services/ReviewService';
import jwt from '../config/Token';
import sendMail from '../config/SendMail';
import generatePassword from '../config/GeneratePassword';

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await UserService.getUserByUserName(username);

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.generateJwtToken(user.username);
        res.status(200).json({
            user: {
                token: token,
                username: user.username,
                role: user.role,
                email: user.email,
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const signup = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        const existingUsername = await UserService.getUserByUserName(username);
        if (existingUsername) {
            return res.status(409).json({ message: 'Username already taken' });
        }

        const existingEmail = await UserService.getUserByEmail(email);
        if (existingEmail) {
            return res.status(409).json({ message: 'Email already taken' });
        }

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = await UserService.addUser({
            username: username,
            password: hashedPassword,
            email: email,
            role: 'ROLE_USER'
        });

        const token = jwt.generateJwtToken(username);
        res.status(201).json({
            user: {
                token: token,
                username: username,
                role: 'ROLE_USER',
                email: email,
            }
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const authenticateUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(400).json({ message: "No Auth Token Found" });
        }
        const token = authHeader.substring(7);
        const {decoded: userDecoded = null, error = null} = await jwt.decodeJwtToken(token);
        if(error){
            return res.status(401).json({ message: error.message     });
        }
        const user = await UserService.getUserByUserName(userDecoded.username);

        if (!user) {
            return res.status(401).json({ message: "Authentication failed" });
        }

        req.user = user;
        return next();
    } catch (error) {
        console.error("Error in authenticateUser middleware:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const isAdmin = (req, res, next) => {
    try {
        const user = req.user;

        if (!user || user.role !== "ROLE_ADMIN") {
            return res.status(401).json({ message: "Not authorized. Admin role required." });
        }
        return next();
    } catch (error) {
        console.error("Error in isAdmin middleware:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const changePassword = async (req, res) => {
    try {
        const user = req.user;
        const { currentPassword, newPassword } = req.body;
        if (!bcrypt.compareSync(currentPassword, user.password)) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const newPassHash = bcrypt.hashSync(newPassword, salt);

        await UserService.updateUserPassword(user.id, newPassHash);

        res.status(200).json({ data: 'Password changed successfully' });
    } catch (error) {
        console.error('Error in changePassword:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await UserService.getUserByEmail(email);
        if (!user) {
            return res.status(409).json({ message: 'Email not found' });
        }

        const newPassword = generatePassword();

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const newPassHash = bcrypt.hashSync(newPassword, salt);
        await UserService.updateUserPassword(user.id, newPassHash);

        const emailContent = `Hello, your new password is: ${newPassword}`;
        sendMail({
            email: user.email,
            subject: "New Password",
            message: emailContent,
        });

        res.status(200).json({ data: 'Password reset email sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = req.user;
        const orderList = await OrderService.getAllOrdersByUser(user.id);

        await Promise.all(
            orderList.map(async (order) => {
                await OrderDetailService.deleteOrderDetailByOrderId(order.id);
            })
        );

        await OrderService.deleteAllOrdersByUser(user.id);
        await ReviewService.deleteReviewByUser(user.id);
        await UserService.deleteUser(user.id);

        res.status(200).json({ data: 'Delete successfully' });
    } catch (error) {
        console.error('Error in deleteUser:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    login,
    signup,
    isAdmin,
    authenticateUser,
    changePassword,
    deleteUser,
    forgetPassword
};
