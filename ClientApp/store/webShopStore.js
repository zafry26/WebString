import { createSlice } from '@reduxjs/toolkit';
import WebShopService from '@Services/WebShopService';

// Create the slice.
const slice = createSlice({
    name: "webshop",
    initialState: {
        isFetching: false,
        isSuccess: false
    },
    reducers: {
        setFetching: (state, action) => {
            state.isFetching = action.payload;
        },
        setSuccess: (state, action) => {
            state.isSuccess = action.payload;
        }
    }
});

// Export reducer from the slice.
export const { reducer } = slice;

// Define action creators.
export const actionCreators = {
    getAdmCategories: () => async (dispatch) => {
        dispatch(slice.actions.setFetching(true));

        const service = new WebShopService();

        const result = await service.getAdmCategories();

        if (!result.hasErrors) {
            dispatch(slice.actions.setSuccess(true));
        }

        dispatch(slice.actions.setFetching(false));

        return result;
    },
    getStore: (id) => async (dispatch) => {
        dispatch(slice.actions.setFetching(true));

        const service = new WebShopService();

        const result = await service.getStore(id);

        if (!result.hasErrors) {
            dispatch(slice.actions.setSuccess(true));
        }

        dispatch(slice.actions.setFetching(false));

        return result;
    },
    addStoreSummary: (model) => async (dispatch) => {
        dispatch(slice.actions.setFetching(true));

        const service = new WebShopService();

        const result = await service.addStoreSummary(model);

        if (!result.hasErrors) {
            dispatch(slice.actions.setSuccess(true));
        }

        dispatch(slice.actions.setFetching(false));

        return result;
    },
    addStoreCategory: (model) => async (dispatch) => {
        dispatch(slice.actions.setFetching(true));

        const service = new WebShopService();

        const result = await service.addStoreCategory(model);

        if (!result.hasErrors) {
            dispatch(slice.actions.setSuccess(true));
        }

        dispatch(slice.actions.setFetching(false));

        return result;
    },
    addStorePayment: (model) => async (dispatch) => {
        dispatch(slice.actions.setFetching(true));

        const service = new WebShopService();

        const result = await service.addStorePayment(model);

        if (!result.hasErrors) {
            dispatch(slice.actions.setSuccess(true));
        }

        dispatch(slice.actions.setFetching(false));

        return result;
    }
};
