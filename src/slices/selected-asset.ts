import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../redux";
import {DDO} from "@oceanprotocol/squid";

interface SelectedAssetState {
    isLoading: boolean;
    asset: DDO;
    type: string;
}

const initialState: SelectedAssetState = {
    isLoading: false,
    asset: new DDO(),
    type: ''
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
const selectedAssetSlice = createSlice({
    name: "selectedAsset",
    initialState,
    reducers: {
        startLoading: startLoadingReducer,
        finishLoading: finishLoadingReducer,
        setAsset: setAssetReducer,
        setType: setTypeReducer
    }
});

export const {startLoading, finishLoading, setAsset, setType} = selectedAssetSlice.actions;

export const setSelectedAsset = (asset : DDO, type : string) : AppThunk => async (dispatch) => {
    dispatch(setAsset(asset));
    dispatch(setType(type));

};

export default selectedAssetSlice.reducer;
