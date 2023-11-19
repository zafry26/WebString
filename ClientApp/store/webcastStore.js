import { createSlice } from '@reduxjs/toolkit';
import WebcastService from '@Services/WebcastService';

// Create the slice.
const slice = createSlice({
    name: "webcast",
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
    getHero: (id) => async (dispatch) => {
        dispatch(slice.actions.setFetching(true));

        const service = new WebcastService();

        const result = await service.getHero(id);

        if (!result.hasErrors) {
            dispatch(slice.actions.setSuccess(true));
        }

        dispatch(slice.actions.setFetching(false));

        return result;
    },
    addHero: (model) => async (dispatch) => {
        dispatch(slice.actions.setFetching(true));

        const service = new WebcastService();

        const result = await service.addHero(model);

        if (!result.hasErrors) {
            dispatch(slice.actions.setSuccess(true));
        }

        dispatch(slice.actions.setFetching(false));

        return result;
    },
    addHeroSummary: (model) => async (dispatch) => {
        dispatch(slice.actions.setFetching(true));

        const service = new WebcastService();

        const result = await service.addHeroSummary(model);

        if (!result.hasErrors) {
            dispatch(slice.actions.setSuccess(true));
        }

        dispatch(slice.actions.setFetching(false));

        return result;
    },
    addHeroEducation: (model) => async (dispatch) => {
        dispatch(slice.actions.setFetching(true));

        const service = new WebcastService();

        const result = await service.addHeroEducation(model);

        if (!result.hasErrors) {
            dispatch(slice.actions.setSuccess(true));
        }

        dispatch(slice.actions.setFetching(false));

        return result;
    },
    addHeroExperience: (model) => async (dispatch) => {
        dispatch(slice.actions.setFetching(true));

        const service = new WebcastService();

        const result = await service.addHeroExperience(model);

        if (!result.hasErrors) {
            dispatch(slice.actions.setSuccess(true));
        }

        dispatch(slice.actions.setFetching(false));

        return result;
    },
    addHeroService: (model) => async (dispatch) => {
        dispatch(slice.actions.setFetching(true));

        const service = new WebcastService();

        const result = await service.addHeroService(model);

        if (!result.hasErrors) {
            dispatch(slice.actions.setSuccess(true));
        }

        dispatch(slice.actions.setFetching(false));

        return result;
    },
    addHeroPortfolio: (model) => async (dispatch) => {
        dispatch(slice.actions.setFetching(true));

        const service = new WebcastService();

        const result = await service.addHeroPortfolio(model);

        if (!result.hasErrors) {
            dispatch(slice.actions.setSuccess(true));
        }

        dispatch(slice.actions.setFetching(false));

        return result;
    },
    addHeroTechnical: (model) => async (dispatch) => {
        dispatch(slice.actions.setFetching(true));

        const service = new WebcastService();

        const result = await service.addHeroTechnical(model);

        if (!result.hasErrors) {
            dispatch(slice.actions.setSuccess(true));
        }

        dispatch(slice.actions.setFetching(false));

        return result;
    }
};
