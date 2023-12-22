import axios from 'axios';
import { getAuthUser, network } from '../until';

const getDashBoard = async () => {
    try {
        const user = await getAuthUser();
        const response = await axios.get(`${network.serverip}/admin/dashboard`,
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

const getAllUser = async () => {
    try {
        const user = await getAuthUser();
        const response = await axios.get(`${network.serverip}/admin/users`,
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

const getAllOrders = async () => {
    try {
        const user = await getAuthUser();
        const response = await axios.get(`${network.serverip}/admin/orders`,
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

const updateOrderStatus = async (orderId, status) => {
    try {
        const user = await getAuthUser();
        const response = await axios.put(`${network.serverip}/admin/order/${orderId}`,
        {status},
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

const getAllProducts = async () => {
    try {
        const user = await getAuthUser();
        const response = await axios.get(`${network.serverip}/admin/products`,
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

const addProduct = async (data) =>{
    try {
        const user = await getAuthUser();
        const response = await axios.post(`${network.serverip}/admin/product`,
        {data},
        {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        return response.data;
    } catch (error) {
        return { message: error.response? error.response.data.message : error };
    }
}

const updateProduct = async (id, data) =>{
    try {
        const user = await getAuthUser();
        const response = await axios.put(`${network.serverip}/admin/product/${id}`,
        {data},
        {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        return response.data;
    } catch (error) {
        return { message: error.response? error.response.data.message : error };
    }
}

const deleteProduct = async (id) => {
    try {
        const user = await getAuthUser();
        const response = await axios.delete(`${network.serverip}/admin/product/${id}`,
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

const getAllBrands = async () => {
    try {
        const user = await getAuthUser();
        const response = await axios.get(`${network.serverip}/admin/brands`,
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

const addBrand = async (data) =>{
    try {
        const user = await getAuthUser();
        const response = await axios.post(`${network.serverip}/admin/brand`,
        {data},
        {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        return response.data;
    } catch (error) {
        return { message: error.response? error.response.data.message : error };
    }
}

const updateBrand = async (id, data) =>{
    try {
        const user = await getAuthUser();
        const response = await axios.put(`${network.serverip}/admin/brand/${id}`,
        {data},
        {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        return response.data;
    } catch (error) {
        return { message: error.response? error.response.data.message : error };
    }
}

const deleteBrand = async (id) => {
    try {
        const user = await getAuthUser();
        const response = await axios.delete(`${network.serverip}/admin/brand/${id}`,
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
export default AdminService = {
    getDashBoard,
    getAllUser,
    getAllOrders,
    getAllProducts,
    getAllBrands,
    deleteProduct,
    updateOrderStatus,
    updateProduct,
    addProduct,
    addBrand,
    updateBrand,
    deleteBrand
};