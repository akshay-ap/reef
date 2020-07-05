import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../redux";
import {DDO} from "@oceanprotocol/squid";
import {getRankedDataSet} from "../utils/normailize";
import {RanksInterface, setRanks} from "./asset-list";

interface AlgoListState {
    isLoading: boolean;
    algos: DDO[];
    algoStakes: StakeInterFaceMap;
    myAlgoStakes: MyStakeInterfaceMap;
    ranks: RanksInterface;
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
    myAlgoStakes: {},
    ranks: {}
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

const setAlgoRanksReducer = (state : AlgoListState, {payload} : PayloadAction < RanksInterface >) => {
    state.ranks = payload;
};

const algoListSlice = createSlice({
    name: "algoList",
    initialState,
    reducers: {
        startLoading: startLoadingReducer,
        finishLoading: finishLoadingReducer,
        setAsset: setAssetReducer,
        setStakes: setStakesReducer,
        setMyStakes: setMyStakesReducer,
        setAlgoRanks: setAlgoRanksReducer
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

    const res = getRankedDataSet(stakes);

    const keysSorted: string[] = Object.keys(res).sort((a, b) => {
        return res[a] - res[b]
    }).reverse();

    const rankedDDOs: DDO[] = []
    keysSorted.forEach((e : string) => {
        const f: DDO | undefined = algo.find((a => {
            return a.id === e
        }));
        if (f !== undefined) {
            rankedDDOs.push(f);
        }
    })


    dispatch(setAsset(rankedDDOs))
    dispatch(setStakes(stakes))
    dispatch(setMyStakes(myStakes))
    dispatch(setRanks(res))
};

export default algoListSlice.reducer;
