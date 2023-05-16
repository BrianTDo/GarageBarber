import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import shopService from "./shopService";

let initialState = {
  shops: [] /* type: any[] */,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get user shops
export const getShops = createAsyncThunk(
  "shops/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await shopService.getShops(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get shop by id
export const getShopById = createAsyncThunk(
  "shops/getShop",
  async (id, thunkAPI) => {
    try {
      return await shopService.getShopById(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create shop
export const createShop = createAsyncThunk(
  "shops/create",
  async (shopData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await shopService.createShop(shopData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update shop
export const updateShop = createAsyncThunk(
  "shops/update",
  async (shopData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await shopService.updateShop(shopData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete shop
export const deleteShop = createAsyncThunk(
  "shops/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await shopService.deleteShop(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    reset: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createShop.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createShop.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.shops = action.payload;
      })
      .addCase(createShop.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getShops.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShops.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.shops = action.payload;
      })
      .addCase(getShops.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteShop.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteShop.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.shops.filter(
        //   (shop) => shop._id !== action.payload.id
        // );
      })
      .addCase(deleteShop.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateShop.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateShop.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.shops.filter(
        //   (shop) => shop._id === action.payload.id
        // );
        // state.shops.push(action.payload);
        state.shops = action.payload;
      })
      .addCase(updateShop.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getShopById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShopById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.shops = action.payload;
      })
      .addCase(getShopById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = shopSlice.actions;
export default shopSlice.reducer;
