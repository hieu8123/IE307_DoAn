import axios from 'axios';
import { getAuthUser, network } from '../until';

const getAllBrands = async () => {
    try {
        const user = await getAuthUser();
        const response = await axios.get(`${network.serverip}/brands`,
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
        return response.data;
    } catch (error) {
        return { message: error.response? error.response.data.message : error };
    }
};

const getAllOrdersByUser = async () => {
    try {
        const user = await getAuthUser();
        const response = await axios.get(`${network.serverip}/orders`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        return response.data;
    } catch (error) {
        return { message: error.response.data.message };
    }
};

const getOrderByCode = async (code) => {
    try {
        const user = await getAuthUser();
        const response = await axios.post(`${network.serverip}/order-code`,
            { code },
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
        return response.data;
    } catch (error) {
        return { message: error.response? error.response.data.message : error };
    }
};

const checkOut = async (order) => {
    try {
        const user = await getAuthUser();
        const response = await axios.post(`${network.serverip}/checkout`,
            { order }
            , {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
        return response.data;
    } catch (error) {
        return { message: error.response? error.response.data.message : error };
    }
};

const getAllProducts = async () => {
    try {
        const user = await getAuthUser();
        const response = await axios.get(`${network.serverip}/products`,
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
        return response.data;
    } catch (error) {
        return { message: error.response? error.response.data.message : error };
    }
};

const getProductByCode = async (code) => {
    try {
        const user = await getAuthUser();
        const response = await axios.post(`${network.serverip}/product-code`,
            { code },
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
        return response.data;
    } catch (error) {
        return { message: error.response? error.response.data.message : error };
    }
};

const getProductDetail = async (productId) => {
    try {
        const user = await getAuthUser();
        const response = await axios.get(`${network.serverip}/product-detail/${productId}`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        return response.data;
    } catch (error) {
        return { message: error.response ? error.response.data.message : error };
    }
};

const getProductReview = async (productId) => {
    try {
        const user = await getAuthUser();
        const response = await axios.get(`${network.serverip}/product-review/${productId}`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        return response.data;
    } catch (error) {
        return { message: error.response ? error.response.data.message : error };
    }
};

const addProductReview = async (productId, data) => {
    try {
        const user = await getAuthUser();
        const response = await axios.post(`${network.serverip}/product-review/${productId}`, { data }, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        return response.data;
    } catch (error) {
        return { message: error.response ? error.response.data.message : error };
    }
};

const getWishListByUser = async () => {
    try {
        const user = await getAuthUser();
        const response = await axios.get(`${network.serverip}/wishlist`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        return response.data;
    } catch (error) {
        return { message: error.response? error.response.data.message : error };
    }
};

const addWishList = async (product_id) => {
    try {
        const user = await getAuthUser();
        const response = await axios.post(`${network.serverip}/wishlist`,
            { product_id },
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
        return response.data;
    } catch (error) {
        return { message: error.response? error.response.data.message : error };
    }
};

const deleteWishList = async (product_id) => {
    try {
        const user = await getAuthUser();
        const response = await axios.delete(`${network.serverip}/wishlist/${product_id}`,
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
        return response.data;
    } catch (error) {
        return { message: error.response? error.response.data.message : error };
    }
};


export default UserService = {
    getAllBrands,
    getAllOrdersByUser,
    getOrderByCode,
    checkOut,
    getAllProducts,
    getProductDetail,
    getProductReview,
    addProductReview,
    getProductByCode,
    getWishListByUser,
    addWishList,
    deleteWishList
};