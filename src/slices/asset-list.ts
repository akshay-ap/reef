import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../redux";
import {DDO} from "@oceanprotocol/squid";

interface AssetListState {
    isLoading: boolean;
    assets: DDO[];
    stakes: StakeInterFaceMap;
    myStakes: MyStakeInterfaceMap
}

export interface StakeInterFaceMap {
[key: string]: StakeInterface;
}

export interface MyStakeInterfaceMap {
[key: string]: MyStakeInterface;
}


export interface StakeInterface {
    0: string;
    1: string;
    amount: string;
    count: string
}

export interface MyStakeInterface {
    0: string;
    1: string;
    amount: string;
    assetAddress: string
}

const initialState: AssetListState = {
    isLoading: false,
    assets: [],
    stakes: {},
    myStakes: {}
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

const setMyStakesReducer = (state : AssetListState, {payload} : PayloadAction < MyStakeInterfaceMap >) => {
    state.myStakes = payload;
};

const assetListSlice = createSlice({
    name: "assetList",
    initialState,
    reducers: {
        startLoading: startLoadingReducer,
        finishLoading: finishLoadingReducer,
        setAsset: setAssetReducer,
        setStakes: setStakesReducer,
        setMyStakes: setMyStakesReducer
    }
});

export const {
    startLoading,
    finishLoading,
    setAsset,
    setStakes,
    setMyStakes
} = assetListSlice.actions;

export const setAssetListInfo = (asset : DDO[], stakes : StakeInterFaceMap, myStakes : MyStakeInterfaceMap) : AppThunk => async (dispatch) => {
    dispatch(setAsset(asset))
    dispatch(setStakes(stakes))
    dispatch(setMyStakes(myStakes))

    // dispatch(setAsset(asset));
};

// export const setStakesInfo = (stakes : String[]) : AppThunk => async (dispatch) => {
//     // dispatch(setAsset(asset));
// };

export default assetListSlice.reducer;
