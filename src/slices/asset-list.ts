import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../redux";
import {DDO} from "@oceanprotocol/squid";
import {getRankedDataSet} from "../utils/normailize";

interface AssetListState {
    isLoading: boolean;
    assets: DDO[];
    stakes: StakeInterFaceMap;
    myStakes: MyStakeInterfaceMap;
    ranks: RanksInterface
}
export interface RanksInterface {
[key: string]: number
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
    myStakes: {},
    ranks: {}
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


const setRanksReducer = (state : AssetListState, {payload} : PayloadAction < RanksInterface >) => {
    state.ranks = payload;
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
        setMyStakes: setMyStakesReducer,
        setRanks: setRanksReducer
    }
});

export const {
    startLoading,
    finishLoading,
    setAsset,
    setStakes,
    setMyStakes,
    setRanks
} = assetListSlice.actions;

export const setAssetListInfo = (asset : DDO[], stakes : StakeInterFaceMap, myStakes : MyStakeInterfaceMap) : AppThunk => async (dispatch) => {


    const res: RanksInterface = getRankedDataSet(stakes);

    const keysSorted: string[] = Object.keys(res).sort((a, b) => {
        return res[a] - res[b]
    }).reverse();

    const rankedDDOs: DDO[] = []
    keysSorted.forEach((e : string) => {
        const f: DDO | undefined = asset.find((a => {
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

export default assetListSlice.reducer;
