import ProductService from '../services/ProductService';
import BrandService from '../services/BrandService';
import OrderService from '../services/OrderService';
import OrderDetailService from '../services/OrderDetailService';
import UserService from '../services/UserService';
import PathImage from '../config/PathImage';
import WishListService from '../services/WishListService';

const getAllBrands = async (req, res) => {
    try {
        const brands = await BrandService.getAllBrands();

        const brandsWithImagePath = brands.map(brand => ({
            ...brand,
            image: PathImage.Brands + brand.image,
            icon: PathImage.Brands + brand.icon
        }));

        res.status(200).json({ brands: brandsWithImagePath });
    } catch (error) {
        console.error('Error getting all brands:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllOrdersByUser = async (req, res) => {
    try {
        const user = req.user;
        const listOrders = await OrderService.getAllOrdersByUser(user.id);

        const ordersWithDetails = await Promise.all(
            listOrders.map(async (order) => {
                const details = await OrderDetailService.getOrderDetailByOrderId(order.id);

                const detailsWithProduct = await Promise.all(
                    details.map(async (detail) => {
                        const product = await ProductService.getProduct(detail.product_id);
                        return { ...detail, name: product.title };
                    })
                );

                return {
                    ...order,
                    details: detailsWithProduct,
                };
            })
        );

        res.status(200).json({ orders: ordersWithDetails });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const user = req.user;
        const listOrders = await OrderService.getAllOrdersByUser(user.id);

        const ordersWithDetails = await Promise.all(
            listOrders.map(async (order) => {
                const details = await OrderDetailService.getOrderDetailByOrderId(order.id);
                const user = await UserService.getUser(order.user_id);

                const detailsWithProduct = await Promise.all(
                    details.map(async (detail) => {
                        const product = await ProductService.getProduct(detail.product_id);
                        return { ...detail, name: product.name };
                    })
                );

                return {
                    ...order,
                    details: detailsWithProduct,
                    user: { username: user.username, email: user.email }
                };
            })
        );

        res.status(200).json({ orders: ordersWithDetails });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const checkOut = async (req, res) => {
    try {
        const user = req.user;
        const { order } = req.body;
        const details = order.details;
        delete order.details;

        const order_id = await OrderService.addOrder({ ...order, user_id: user.id });

        for (const detail of details) {
            const details_id = await OrderDetailService.addOrderDetail({ ...detail, order_id });
        }

        res.status(200).json({ data: 'Checkout successful' });
    } catch (error) {
        // Handle errors appropriately
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await ProductService.getAllProducts();
        const productsWithImagePath = products.map(product => ({
            ...product,
            image: PathImage.Products + product.image
        }));
        res.status(200).json({ products: productsWithImagePath });
    } catch (error) {
        console.error('Error getting products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllWishListByUser = async (req, res) => {
    try {
        const user = req.user;
        const wishList = await WishListService.getWishlistItemsByUser(user.id);

        const wishListWithProducts = await Promise.all(
            wishList.map(async (item) => {
                const product = await ProductService.getProduct(item.product_id);
                const productWithImagePath = {
                    ...product,
                    image: PathImage.Products + product.image
                };
                return { ...item, product: productWithImagePath };
            })
        );

        res.status(200).json({ data: wishListWithProducts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const addWishList = async (req, res) => {
    try {
        const user = req.user;
        const { product_id } = req.body;
        const WistList = await WishListService.addWishlistItem({user_id: user.id, product_id});
        res.status(200).json({ data: "Add WishList Successful" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteWishList = async (req, res) => {
    try {
        const user = req.user;
        const { productID: product_id } = req.params;
        const WistList = await WishListService.deleteWishlistItemByProductAndUser({user_id: user.id, product_id});
        res.status(200).json({ data: "Delete WishList Successful" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    getAllBrands,
    getAllOrdersByUser,
    getAllOrders,
    checkOut,
    getAllProducts,
    getAllWishListByUser,
    addWishList,
    deleteWishList,
};