import React, {useState, useEffect} from "react";
import {Ocean} from "@oceanprotocol/squid";

export interface MyOceanContextInterface {
    loading: boolean,
    instance: Ocean | null
}

export const MyOceanContext = React.createContext < MyOceanContextInterface > ({loading: false, instance: null})

type Props = {
    children: React.ReactNode
};

export const MyProvider = ({children} : Props) => {
    const [data, setData] = useState < Ocean | null > (null)
    const [loading, setLoading] = useState < boolean > (true);

    useEffect(() => {
        async function temp() {
            setLoading(true)
            const ocean: Ocean = await Ocean.getInstance({
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
            })
            console.log('---', ocean)
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
