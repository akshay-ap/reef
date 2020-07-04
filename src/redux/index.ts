import ReduxThunk, {ThunkAction} from "redux-thunk";
import {combineReducers, configureStore, Action} from "@reduxjs/toolkit";
import newDataset from "../slices/new-dataset";
import selectedAsset from "../slices/selected-asset";
import assetList from "../slices/asset-list";

const reducer = combineReducers({newDataset, selectedAsset, assetList});
const store = configureStore({reducer, middleware: [ReduxThunk]});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction < void,
RootState,
null,
Action < string >>;
export type RootState = ReturnType < typeof reducer >;

export default store;
