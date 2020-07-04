import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../redux";
import {DDO} from "@oceanprotocol/squid";

interface AssetListState {
    isLoading: boolean;
    assets: DDO[];
}

const initialState: AssetListState = {
    isLoading: false,
    assets: []
};

const startLoadingReducer = (state : AssetListState) => {
    state.isLoading = true;
};

const finishLoadingReducer = (state : AssetListState) => {
    state.isLoading = false;
};
const setAssetReducer = (state : AssetListState, {payload} : PayloadAction < DDO[] >) => {
    state.assets = payload;
};

const assetListSlice = createSlice({
    name: "assetList",
    initialState,
    reducers: {
        startLoading: startLoadingReducer,
        finishLoading: finishLoadingReducer,
        setAsset: setAssetReducer
    }
});

export const {startLoading, finishLoading, setAsset} = assetListSlice.actions;

export const setAssetListInfo = (asset : DDO[]) : AppThunk => async (dispatch) => {
    dispatch(setAsset(asset))
    // dispatch(setAsset(asset));
};

export default assetListSlice.reducer;
