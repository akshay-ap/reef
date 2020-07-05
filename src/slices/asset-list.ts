import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../redux";
import {DDO} from "@oceanprotocol/squid";

interface AssetListState {
    isLoading: boolean;
    assets: DDO[];
    stakes: StakeInterFaceMap;
}

export interface StakeInterFaceMap {
[key: string]: StakeInterface;
}

export interface StakeInterface {
    0: string;
    1: string;
    amount: string;
    count: string
}


const initialState: AssetListState = {
    isLoading: false,
    assets: [],
    stakes: {}
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

const setStakesReducer = (state : AssetListState, {payload} : PayloadAction < StakeInterFaceMap >) => {
    state.stakes = payload;
};

const assetListSlice = createSlice({
    name: "assetList",
    initialState,
    reducers: {
        startLoading: startLoadingReducer,
        finishLoading: finishLoadingReducer,
        setAsset: setAssetReducer,
        setStakes: setStakesReducer
    }
});

export const {startLoading, finishLoading, setAsset, setStakes} = assetListSlice.actions;

export const setAssetListInfo = (asset : DDO[], stakes : StakeInterFaceMap) : AppThunk => async (dispatch) => {
    dispatch(setAsset(asset))
    dispatch(setStakes(stakes))

    // dispatch(setAsset(asset));
};

// export const setStakesInfo = (stakes : String[]) : AppThunk => async (dispatch) => {
//     // dispatch(setAsset(asset));
// };

export default assetListSlice.reducer;
