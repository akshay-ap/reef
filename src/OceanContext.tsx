import React, {useState, useEffect} from "react";
import {Ocean, Config} from "@oceanprotocol/squid";
import Web3 from "web3";

export interface MyOceanContextInterface {
    loading: boolean,
    instance: Ocean | null,
    web3: Web3 | null
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

    useEffect(() => {
        async function temp() {
            setLoading(true)
            const ocean: Ocean = await Ocean.getInstance(config)
            setData(ocean)

            console.log("Using ocean", ocean)
            setLoading(false)
        }
        temp()
    }, [])

    const get = () => ({loading: loading, instance: data, web3: web3})

    const {Provider} = MyOceanContext
    return (
        <Provider value={
            get()
        }>
            {children} </Provider>
    )
}
