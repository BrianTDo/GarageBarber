import axios from "axios";

const API_URL = "/api/customer/";

// Get Customers
const getCustomers = async (shop, token) => {
  const response = await axios({
    method: "get",
    url: API_URL + shop,
    headers: { Authorization: "Bearer " + token },
  });
  return response.data;
};

// Create Customer
const createCustomer = async (customerData, token) => {
  const response = await axios.post(API_URL, customerData);
  return response.data;
};

// Delete Customer
const deleteCustomer = async (customerId, token) => {
  const response = await axios({
    method: "delete",
    url: API_URL + customerId,
    headers: { Authorization: "Bearer " + token },
  });
  return response.data;
};

const customerService = {
  getCustomers,
  createCustomer,
  deleteCustomer,
};
export default customerService;
