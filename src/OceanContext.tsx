import React, {useState, useEffect} from "react";
import {Ocean, Config} from "@oceanprotocol/squid";
import Web3 from "web3";
import {AbiItem} from 'web3-utils';
import {Contract} from 'web3-eth-contract';
import StakeApp from "./abi/StakeApp.json";

export interface MyOceanContextInterface {
    loading: boolean,
    instance: Ocean | null,
    web3: Web3 | null,
    stakeApp?: Contract
}

export const MyOceanContext = React.createContext < MyOceanContextInterface > ({loading: false, instance: null, web3: null})

type Props = {
    children: React.ReactNode
};


declare global {
    interface Window {
        web3: any;
        ethereum: any;
    }
}

let web3: Web3 | null = null

if (window.web3) {
    web3 = new Web3(window.web3.currentProvider)
    window.ethereum.enable()
}

const config: Config = {
    web3Provider: web3,
    nodeUri: 'https://nile.dev-ocean.com',
    aquariusUri: 'https://aquarius.marketplace.dev-ocean.com',
    brizoUri: 'https://brizo.marketplace.dev-ocean.com',
    brizoAddress: '0x4aaab179035dc57b35e2ce066919048686f82972',
    secretStoreUri: 'https://secret-store.nile.dev-ocean.com',
    verbose: true
}

// const config: Config = {
//     web3Provider: web3,
//     nodeUri: 'http://localhost:8545',
//     aquariusUri: 'http://aquarius:5000',
//     brizoUri: 'http://localhost:8030',
//     brizoAddress: '0x068Ed00cF0441e4829D9784fCBe7b9e26D4BD8d0',
//     secretStoreUri: 'http://localhost:12001',
//     verbose: true
// }

export const MyProvider = ({children} : Props) => {
    const [data, setData] = useState < Ocean | null | any > (null)
    const [loading, setLoading] = useState < boolean > (true);
    const [contract, setContract] = useState < Contract > ();

    const setUpContract = async () => {
        const networkId = await web3 ?. eth.net.getId();
        if (web3 !== null) {
            let parsed: AbiItem | AbiItem[] = StakeApp.abi as AbiItem | AbiItem[];
            let meta = new web3.eth.Contract(parsed, '0xA641cc999Bb2d2935c9608c860041c49463fc418');
            console.log('this.meta', meta)
            setContract(meta);
        }

    }
    useEffect(() => {
        async function temp() {
            setLoading(true)
            const ocean: Ocean = await Ocean.getInstance(config)
            setData(ocean)

            console.log("Using ocean", ocean)
            setLoading(false)
        }
        temp()
        setUpContract()
    }, [])

    const get = () => ({loading: loading, instance: data, web3: web3, stakeApp: contract})

    const {Provider} = MyOceanContext
    return (
        <Provider value={
            get()
        }>
            {children} </Provider>
    )
}
