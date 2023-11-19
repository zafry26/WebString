import { createSlice } from '@reduxjs/toolkit';
import EmailService from '@Services/EmailService';

// Create the slice.
const slice = createSlice({
    name: "sendEmail",
    initialState: {
        isFetching: false,
        isLoginSuccess: false
    },
    reducers: {
        setFetching: (state, action) => {
            state.isSending = action.payload;
        },
        setSuccess: (state, action) => {
            state.isSendingSuccess = action.payload;
        }
    }
});

// Export reducer from the slice.
export const { reducer } = slice;

// Define action creators.
export const actionCreators = {
    sendEmail: (model) => async (dispatch) => {
        dispatch(slice.actions.setFetching(true));

        const emailService = new EmailService();

        const result = await emailService.sendEmail(model);

        if (!result.hasErrors) {
            dispatch(slice.actions.setSuccess(true));
        }
        dispatch(slice.actions.setFetching(false));
    }
};
