import { createSlice } from '@reduxjs/toolkit';
import S3Service from '@Services/S3Service';

// Create the slice.
const slice = createSlice({
    name: "s3",
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
    getImage: (id) => async (dispatch) => {
        dispatch(slice.actions.setFetching(true));

        const service = new S3Service();

        const result = await service.getImage(id);

        if (!result.hasErrors) {
            dispatch(slice.actions.setSuccess(true));
        }

        dispatch(slice.actions.setFetching(false));

        return result;
    },
    uploadImage: (file, fileName, module, section) => async (dispatch) => {
        dispatch(slice.actions.setFetching(true));

        const service = new S3Service();

        const formData = new FormData();
        formData.append("formFile", file)
        formData.append("fileName", fileName)
        formData.append("module", module)
        formData.append("section", section)

        const result = await service.uploadImage(formData);

        if (!result.hasErrors) {
            dispatch(slice.actions.setSuccess(true));
        }

        dispatch(slice.actions.setFetching(false));

        return result;
    }
};
