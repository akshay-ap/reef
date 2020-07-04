import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../redux";
import {CreateProgressStep, MetaData, Ocean, Account} from "@oceanprotocol/squid";

interface NewDatasetState {
    isLoading: boolean;
    status: CreateProgressStep | -1;
}

const initialState: NewDatasetState = {
    isLoading: false,
    status: -1
};

const startLoadingReducer = (state : NewDatasetState) => {
    state.isLoading = true;
    state.status = -1;
};

const finishLoadingReducer = (state : NewDatasetState) => {
    state.isLoading = false;
    state.status = -1;
};
const setProgressStepReducer = (state : NewDatasetState, {payload} : PayloadAction < CreateProgressStep >) => {
    state.status = payload;

};
const newDatasetSlice = createSlice({
    name: "newDataset",
    initialState,
    reducers: {
        startLoading: startLoadingReducer,
        finishLoading: finishLoadingReducer,
        setProgressStep: setProgressStepReducer
    }
});

export const {startLoading, finishLoading, setProgressStep} = newDatasetSlice.actions;

export const createNewDataset = (asset : MetaData, account : Account, instance : Ocean) : AppThunk => async (dispatch) => {
    dispatch(startLoading());
    try {
        const p = instance ?. assets.create(asset, account)
        p ?. then(d => {
            console.log('Created DDO', d)
        })
        p ?. subscribe((x : CreateProgressStep) => {
            console.log('Step', x)
            dispatch(setProgressStep(x));
        })
        dispatch(finishLoading());
    } catch (error) {
        alert(error);
        dispatch(finishLoading());
    }
};

export default newDatasetSlice.reducer;
