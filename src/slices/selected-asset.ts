import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../redux";
import {DDO} from "@oceanprotocol/squid";

interface SelectedAssetState {
    isLoading: boolean;
    asset: DDO;
}

const initialState: SelectedAssetState = {
    isLoading: false,
    asset: new DDO()
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
const selectedAssetSlice = createSlice({
    name: "selectedAsset",
    initialState,
    reducers: {
        startLoading: startLoadingReducer,
        finishLoading: finishLoadingReducer,
        setAsset: setAssetReducer
    }
});

export const {startLoading, finishLoading, setAsset} = selectedAssetSlice.actions;

export const setSelectedAsset = (asset : DDO) : AppThunk => async (dispatch) => {
    dispatch(setAsset(asset));
};

export default selectedAssetSlice.reducer;
