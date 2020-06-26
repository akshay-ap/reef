import React, {useState, useEffect} from "react";
import {Ocean, Config} from "@oceanprotocol/squid";
import Web3 from "web3";

export interface MyOceanContextInterface {
    loading: boolean,
    instance: Ocean | null
}

export const MyOceanContext = React.createContext < MyOceanContextInterface > ({loading: false, instance: null})

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

// const config: Config = {
//     web3Provider: web3,
//     nodeUri: 'https://nile.dev-ocean.com',
//     aquariusUri: 'https://aquarius.marketplace.dev-ocean.com',
//     brizoUri: 'https://brizo.marketplace.dev-ocean.com',
//     brizoAddress: '0x4aaab179035dc57b35e2ce066919048686f82972',
//     secretStoreUri: 'https://secret-store.nile.dev-ocean.com',
//     verbose: true
// }

const config: Config = {
    web3Provider: web3,
    // the node of the blockchain to connect to, could also be infura
    nodeUri: 'http://localhost:8545',
    // the uri of aquarius
    aquariusUri: 'http://localhost:5000',
    // the uri of brizo
    brizoUri: 'http://localhost:8030',
    // address that brizo uses
    brizoAddress: '0x00bd138abd70e2f00903268f3db08f2d25677c9e',
    // the uri to the parity node you want to use for encryption and decryption
    parityUri: 'http://localhost:9545',
    // the uri of the secret store that holds the keys
    secretStoreUri: 'http://localhost:12001'
}

export const MyProvider = ({children} : Props) => {
    const [data, setData] = useState < Ocean | null > (null)
    const [loading, setLoading] = useState < boolean > (true);

    useEffect(() => {
        async function temp() {
            setLoading(true)
            const ocean: Ocean = await Ocean.getInstance(config)
            setData(ocean)
            setLoading(false)
        }
        temp()
    }, [])

    const get = () => ({loading: loading, instance: data})

    const {Provider} = MyOceanContext
    return (
        <Provider value={
            get()
        }>
            {children} </Provider>
    )
}
