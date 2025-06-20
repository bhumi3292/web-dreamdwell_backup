import {
    getAllProductApi,
    createPropertyApi, // Updated import
    getOneProductApi,
    updateOneProductApi
} from "../api/productApi.js";

// PRODUCT SERVICES

export const getAllProductService = async (params) => {
    try {
        const response = await getAllProductApi(params);
        return response.data;
    } catch (err) {
        throw err.response?.data || { message: "Product fetch failed" };
    }
};

export const createPropertyService = async (data) => { // Renamed function
    try {
        const response = await createPropertyApi(data); // Call updated API function
        return response.data;
    } catch (err) {
        throw err.response?.data || { message: "Property creation failed" }; // Updated message
    }
};

export const getOneProductService = async (id) => {
    try {
        const response = await getOneProductApi(id);
        return response.data;
    } catch (err) {
        throw err.response?.data || { message: "Failed to load product" };
    }
};

export const updateOneProductService = async (id, data) => {
    try {
        const response = await updateOneProductApi(id, data);
        return response.data;
    } catch (err) {
        throw err.response?.data || { message: "Failed to update product" };
    }
};
