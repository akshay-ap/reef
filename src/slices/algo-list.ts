import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../redux";
import {DDO} from "@oceanprotocol/squid";

interface AlgoListState {
    isLoading: boolean;
    algos: DDO[];
    algoStakes: StakeInterFaceMap;
    myAlgoStakes: MyStakeInterfaceMap
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

const initialState: AlgoListState = {
    isLoading: false,
    algos: [],
    algoStakes: {},
    myAlgoStakes: {}
};

const startLoadingReducer = (state : AlgoListState) => {
    state.isLoading = true;
};

const finishLoadingReducer = (state : AlgoListState) => {
    state.isLoading = false;
};
const setAssetReducer = (state : AlgoListState, {payload} : PayloadAction < DDO[] >) => {
    state.algos = payload;
};

const setStakesReducer = (state : AlgoListState, {payload} : PayloadAction < StakeInterFaceMap >) => {
    state.algoStakes = payload;
};

const setMyStakesReducer = (state : AlgoListState, {payload} : PayloadAction < MyStakeInterfaceMap >) => {
    state.myAlgoStakes = payload;
};

const algoListSlice = createSlice({
    name: "algoList",
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
} = algoListSlice.actions;

export const setAlgoListInfo = (algo : DDO[], stakes : StakeInterFaceMap, myStakes : MyStakeInterfaceMap) : AppThunk => async (dispatch) => {
    dispatch(setAsset(algo))
    dispatch(setStakes(stakes))
    dispatch(setMyStakes(myStakes))
};

export default algoListSlice.reducer;
