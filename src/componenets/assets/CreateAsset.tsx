import React, {useContext} from 'react';
import {MyOceanContext} from '../../OceanContext';
import {Button} from '@material-ui/core';
import {Account} from '@oceanprotocol/squid';
import asset from '../../data/asset';

const CreateAsset = () => {

    const {instance} = useContext(MyOceanContext);

    const createAsset = async () => {

        const accounts: Account[] | undefined = await instance ?. accounts.list()
        if (accounts !== undefined) {
            console.log('accounts---', accounts)
            console.log('ocean---', instance ?. compute)

            const ddo = await instance ?. assets.create(asset, accounts[0])
            console.log('Asset successfully submitted.')
            console.log(ddo)
        } else {
            console.log("No accounts")
        }
    }

    return (
        <div>CreateAsset
            <Button onClick={createAsset}
                variant="contained">Create</Button>
        </div>
    )
}

export default CreateAsset
