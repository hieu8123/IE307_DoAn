import ProductService from '../services/ProductService';
import ProductDetailService from '../services/ProductDetailService';
import BrandService from '../services/BrandService';
import OrderService from '../services/OrderService';
import OrderDetailService from '../services/OrderDetailService';
import ReviewService from '../services/ReviewService';
import PathImage from '../config/PathImage';
import WishListService from '../services/WishListService';
import UserService from '../services/UserService';
import bcrypt from 'bcrypt';
import QRCode from 'qrcode'

const getAllBrands = async (req, res) => {
    try {
        const brands = await BrandService.getAllBrands();

        const brandsWithImagePath = brands.map(brand => ({
            ...brand,
            image: PathImage.Brands + brand.image,
            icon: PathImage.Brands + brand.icon
        }));

        return res.status(200).json({ brands: brandsWithImagePath });
    } catch (error) {
        console.error('Error getting all brands:', error);
        return res.status(500).json({ message: 'Internal server error' });
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
                        return {
                            ...detail, product: {
                                ...product,
                                image: PathImage.Products + product.image,
                            }
                        };
                    })
                );
                return {
                    ...order,
                    details: detailsWithProduct,
                };
            })
        );
        return res.status(200).json({ orders: ordersWithDetails });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const checkOut = async (req, res) => {
    try {
        const user = req.user;
        const { order } = req.body;
        const details = order.details;
        delete order.details;

        const order_id = await OrderService.addOrder({ ...order, user_id: user.id });
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const code = bcrypt.hashSync(JSON.stringify(order), salt);
        await OrderService.updateOrderCode(order_id, code);

        const qrCodeData = JSON.stringify({
            type: 'order',
            code: code
        });

        await QRCode.toFile(`public/qrcode/orders/${order_id}.png`, qrCodeData, {
            scale: 50,
        })

        for (const detail of details) {
            const details_id = await OrderDetailService.addOrderDetail({ ...detail, order_id });
        }

        return res.status(200).json({ data: 'Checkout successful' });
    } catch (error) {
        // Handle errors appropriately
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const user = req.user;
        const products = await ProductService.getAllProducts();

        const productsWithImagePath = await Promise.all(products.map(async (product) => {
            const isBuy = await ProductService.checkIsBuyProduct(user.id, product.id);
            return {
                ...product,
                image: PathImage.Products + product.image,
                isBuy: isBuy,
            };
        }));

        return res.status(200).json({ products: productsWithImagePath });
    } catch (error) {
        console.error('Error getting products:', error);
        return res.status(500).json({ message: 'Internal server error' });
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

        return res.status(200).json({ data: wishListWithProducts });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const addWishList = async (req, res) => {
    try {
        const user = req.user;
        const { product_id } = req.body;
        const WistList = await WishListService.addWishlistItem({ user_id: user.id, product_id });
        return res.status(200).json({ data: "Add WishList Successful" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteWishList = async (req, res) => {
    try {
        const user = req.user;
        const { productID: product_id } = req.params;
        const WistList = await WishListService.deleteWishlistItemByProductAndUser({ user_id: user.id, product_id });
        return res.status(200).json({ data: "Delete WishList Successful" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const getProductByCode = async (req, res) => {
    try {
        const user = req.user;
        const { code } = req.body;
        const product = await ProductService.getProductByCode(code);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.image = PathImage.Products + product.image;

        return res.status(200).json({ product: product });
    } catch (error) {
        console.error('Error in getProductByCode:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const getProductDetail = async (req, res) => {
    try {
        const user = req.user;
        const { productId } = req.params;
        const productDetail = await ProductDetailService.getProductDetail(productId);
        if (!productDetail) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({ productDetail: productDetail });
    } catch (error) {
        console.error('Error in getProductDetail:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const getProductById = async (req, res) => {
    try {
        const user = req.user;
        const { productId } = req.params;
        const product = await ProductService.getProduct(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({ product: product });
    } catch (error) {
        console.error('Error in getProductDetail:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const getProductReview = async (req, res) => {
    try {
        const user = req.user;
        const { productId } = req.params;

        const reviewsProduct = await ReviewService.getReviewsByProduct(productId);

        const reviewsWithUsername = await Promise.all(reviewsProduct.map(async (review) => {
            const user = await UserService.getUser(review.user_id);
            return { ...review, username: user.username };
        }));

        return res.status(200).json({ reviews: reviewsWithUsername });
    } catch (error) {
        console.error('Error in getProductReview:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


const addProductReview = async (req, res) => {
    try {
        const user = req.user;
        const { productId } = req.params;
        const { data } = req.body;
        const reviewsProduct = await ReviewService.addReview(user.id, productId, data);
        await ProductService.updateProductRating(productId);
        if (!reviewsProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({ data: "Add Reviews For Product Success" });
    } catch (error) {
        console.error('Error in addProductReview:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


const getOrderByCode = async (req, res) => {
    try {
        const user = req.user;
        const { code } = req.body;

        const order = await OrderService.getOrderByCode(user.id, code);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const details = await OrderDetailService.getOrderDetailByOrderId(order.id);
        const detailsWithProduct = await Promise.all(
            details.map(async (detail) => {
                const product = await ProductService.getProduct(detail.product_id);
                return {
                    ...detail, product: {
                        ...product,
                        image: PathImage.Products + product.image,
                    }
                };
            })
        );

        return res.status(200).json({ order: { ...order, details: detailsWithProduct } });
    } catch (error) {
        console.error('Error in getOrderByCode:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports = {
    getAllBrands,
    getAllOrdersByUser,
    checkOut,
    getAllProducts,
    getAllWishListByUser,
    addWishList,
    deleteWishList,
    getProductByCode,
    getProductDetail,
    getOrderByCode,
    getProductReview,
    addProductReview,
    getProductById
};