import ProductService from '../services/ProductService';
import ProductDetailService from '../services/ProductDetailService';
import BrandService from '../services/BrandService';
import OrderService from '../services/OrderService';
import OrderDetailService from '../services/OrderDetailService';
import UserService from '../services/UserService';
import ReviewService from '../services/ReviewService';
import PathImage from '../config/PathImage';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';

const getDashBoard = async (req, res) => {
    try {
        const userCount = await UserService.getCountUsers();
        const brandCount = await BrandService.getCountBrands(); // Assuming you have a service for brands
        const productCount = await ProductService.getCountProducts(); // Assuming you have a service for products
        const orderCount = await OrderService.getCountOrders(); // Assuming you have a service for orders

        return res.status(200).json({
            data: {
                usersCount: userCount,
                brandsCount: brandCount,
                productsCount: productCount,
                ordersCount: orderCount
            }
        });
    } catch (error) {
        console.error('Error getting dashboard data:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await UserService.getAllUsers();
        return res.status(200).json({ users: users });
    } catch (error) {
        console.error('Error All Users data:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const listOrders = await OrderService.getAllOrders();
        const ordersWithDetails = await Promise.all(
            listOrders.map(async (order) => {
                const details = await OrderDetailService.getOrderDetailByOrderId(order.id);
                const user = await UserService.getUser(order.user_id);

                const detailsWithProduct = await Promise.all(
                    details.map(async (detail) => {
                        const product = await ProductService.getProduct(detail.product_id);
                        return { ...detail, title: product.title };
                    })
                );
                return {
                    ...order,
                    details: detailsWithProduct,
                    user: { username: user.username, email: user.email }
                };
            })
        );

        return res.status(200).json({ orders: ordersWithDetails });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { orderID } = req.params;
        const { status } = req.body;
        const success = await OrderService.updateOrderStatus(orderID, status);

        if (!success) {
            return res.status(404).json({ message: 'Order not found' });
        }
        return res.status(200).json({ data: 'Order status updated successfully' });
    } catch (error) {
        console.error('Error updating order status:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const [products, brands] = await Promise.all([
            ProductService.getAllProducts(),
            BrandService.getAllBrands()
        ]);

        const productsWithDetails = await Promise.all(products.map(async (product) => {
            const imagePath = PathImage.Products + product.image;

            const brand = brands.find(b => b.id === product.brand_id);

            const productDetail = await ProductDetailService.getProductDetail(product.id);

            return {
                ...product,
                image: imagePath,
                brand: brand.name,
                detail: productDetail
            };
        }));

        return res.status(200).json({ products: productsWithDetails });
    } catch (error) {
        console.error('Error getting products:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const addProduct = async (req, res) => {
    try {
        const { data } = req.body;

        const productData = { ...data, detail: undefined };
        const productDetail = data.detail;
        const product = await ProductService.addProduct(productData);

        await ProductDetailService.addProductDetail(product, productDetail);

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const code = bcrypt.hashSync(JSON.stringify(data), salt);

        await ProductService.updateProductCode(product, code);

        return res.status(200).json({ data: 'Product added successfully' });
    } catch (error) {
        console.error('Error adding product:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const updateProduct = async (req, res) => {
    try {
        const { productID } = req.params;
        const { data } = req.body;

        const productData = { ...data, detail: undefined };
        const productDetail = data.detail;
        const existingProduct = await ProductService.getProduct(productID);

        if (existingProduct.image !== productData.image) {
            const imagePath = `${path.join(__dirname, '../../public/products/')}${existingProduct.image}`;
            fs.unlink(imagePath, async (err) => {
                if (err) {
                    console.log(err)
                }
            });
        }
        const successProductUpdate = await ProductService.updateProduct(productID, productData);
        const successDetailUpdate = await ProductDetailService.updateProductDetail(productID, productDetail);

        if (!successProductUpdate || !successDetailUpdate) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({ data: 'Product updated successfully' });
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const deleteProduct = async (req, res) => {
    try {
        const { productID } = req.params;
        const orderDetails = await OrderDetailService.getOrderDetailByProductId(productID);
        const product = await ProductService.getProduct(productID);

        const imagePath = `${path.join(__dirname, '../../public/products/')}${product.image}`;
        fs.unlink(imagePath, async (err) => {
            if (err) {
                console.log(err)
            }
        });
        for (const orderDetail of orderDetails) {
            const order = await OrderService.getOrder(orderDetail.order_id);
            await OrderService.updateOrderAmount(orderDetail.order_id, order.amount - orderDetail.price * orderDetail.quantity);
        }

        await OrderDetailService.deleteOrderDetailByProductId(productID);
        await ProductDetailService.deleteProductDetail(productID);
        await ReviewService.deleteReviewByProduct(productID);
        const success = await ProductService.deleteProduct(productID);

        if (!success) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({ data: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



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

const addBrand = async (req, res) => {
    try {
        const { data } = req.body;
        const brand = await BrandService.addBrand(data);
        return res.status(200).json({ data: 'Brand added successfully' });
    } catch (error) {
        console.error('Error adding brand:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const updateBrand = async (req, res) => {
    try {
        const { brandID } = req.params;
        const { data } = req.body;
        const brand = await BrandService.getBrand(brandID);

        if (brand.image !== data.image) {
            fs.unlink(`${path.join(__dirname, '../../public/brands/')}${brand.image}`, async (err) => {
                if (err) {
                    console.log(err)
                }
            });
        }
        const success = await BrandService.updateBrand(brandID, data);
        if (!success) {
            return res.status(404).json({ message: 'Brand not found' });
        }

        return res.status(200).json({ data: 'Brand updated successfully' });
    } catch (error) {
        console.error('Error updating brand:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteBrand = async (req, res) => {
    try {
        const { brandID } = req.params;
        const products = await ProductService.getAllProductsByBrand(brandID);
        const brand = await BrandService.getBrand(brandID);
        fs.unlink(`${path.join(__dirname, '../../public/brands/')}${brand.image}`, async (err) => {
            if (err) {
                console.log(err)
            }
        });
        for (const product of products) {
            const orderDetails = await OrderDetailService.getOrderDetailByProductId(product.id);

            for (const orderDetail of orderDetails) {
                const order = await OrderService.getOrder(orderDetail.order_id);
                await OrderService.updateOrderAmount(orderDetail.order_id, order.amount - orderDetail.price * orderDetail.quantity);
            }
            await OrderDetailService.deleteOrderDetailByProductId(product.id);
            await ProductDetailService.deleteProductDetail(product.id);
            await ReviewService.deleteReviewByProduct(product.id);
            await ProductService.deleteProduct(product.id);
        }

        const success = await BrandService.deleteBrand(brandID);
        if (!success) {
            return res.status(404).json({ message: 'Brand not found' });
        }

        res.status(200).json({ data: 'Brand deleted successfully' });
    } catch (error) {
        console.error('Error deleting brand:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getDashBoard,
    getAllUsers,
    getAllOrders,
    updateOrderStatus,
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getAllBrands,
    addBrand,
    updateBrand,
    deleteBrand,
};
