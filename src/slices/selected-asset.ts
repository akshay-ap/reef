import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../redux";
import {DDO} from "@oceanprotocol/squid";

interface SelectedAssetState {
    isLoading: boolean;
    asset: DDO;
    type: string;
    selectDatasetForCompute: string;
    selectAlgorithmForCompute: string;

}

const initialState: SelectedAssetState = {
    isLoading: false,
    asset: new DDO(),
    type: '',
    selectDatasetForCompute: '',
    selectAlgorithmForCompute: ''
};

const startLoadingReducer = (state : SelectedAssetState) => {
    state.isLoading = true;
};

const finishLoadingReducer = (state : SelectedAssetState) => {
    state.isLoading = false;
};
const setAssetReducer = (state : SelectedAssetState, {payload} : PayloadAction < DDO >) => {
    state.asset = payload;

};

const setTypeReducer = (state : SelectedAssetState, {payload} : PayloadAction < string >) => {
    state.type = payload;
};

const setDatasetForComputeReducer = (state : SelectedAssetState, {payload} : PayloadAction < string >) => {
    state.selectDatasetForCompute = payload;
};

const selectAlgorithmForComputeReducer = (state : SelectedAssetState, {payload} : PayloadAction < string >) => {
    state.selectAlgorithmForCompute = payload;
};


const selectedAssetSlice = createSlice({
    name: "selectedAsset",
    initialState,
    reducers: {
        startLoading: startLoadingReducer,
        finishLoading: finishLoadingReducer,
        setAsset: setAssetReducer,
        setType: setTypeReducer,
        datasetForCompute: setDatasetForComputeReducer,
        algorithmForCompute: selectAlgorithmForComputeReducer
    }
});

export const {
    startLoading,
    finishLoading,
    setAsset,
    setType,
    algorithmForCompute,
    datasetForCompute
} = selectedAssetSlice.actions;

export const setSelectedAsset = (asset : DDO, type : string) : AppThunk => async (dispatch) => {
    dispatch(setAsset(asset));
    dispatch(setType(type));
};

export const setSelectedAlgoForCompute = (did : string) : AppThunk => async (dispatch) => {
    dispatch(algorithmForCompute(did));
};

export const setSelectedDataForCompute = (did : string) : AppThunk => async (dispatch) => {
    dispatch(datasetForCompute(did));
};


export default selectedAssetSlice.reducer;
