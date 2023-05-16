import axios from "axios";

const API_URL = "/api/shops/";

// Get Shops
const getShops = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get Shop by id
const getShopById = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

// Create Shop
const createShop = async (shopData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, shopData, config);
  return response.data;
};

// Update Shop
const updateShop = async (shopData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(shopData)
  const response = await axios.put(API_URL + shopData.id, shopData, config);
  return response.data;
};

// Delete Shop
const deleteShop = async (shopId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + shopId, config);
  return response.data;
};

const shopService = {
  getShops,
  createShop,
  updateShop,
  deleteShop,
  getShopById,
};
export default shopService;
