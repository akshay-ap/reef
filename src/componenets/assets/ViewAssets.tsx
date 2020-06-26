import React, {useContext, useEffect, useState} from 'react';
import {MyOceanContext} from '../../OceanContext';
import {DDO} from '@oceanprotocol/squid';

const ViewAssets = () => {
    const {instance} = useContext(MyOceanContext)
    const [assets, setAssets] = useState < DDO[] > ([]);

    useEffect(() => {
        console.log('loading assets...')
        const result = instance ?. assets.query({
            query: {
                text: ''
            }
        })
        if (result !== undefined) {
            result.then((r) => {
                console.log(r)
                setAssets(r.results)
            })
        } else {
            console.log('result undefined')
        }
    }, [instance])

    return (
        <div>ViewAssets
            <ul> {
                assets.map(item => {
                    return <li>{
                        item.id
                    }</li>;
                })
            } </ul>
        </div>
    )
}

export default ViewAssets
