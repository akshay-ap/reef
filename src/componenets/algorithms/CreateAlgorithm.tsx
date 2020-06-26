import React, {useContext} from 'react';
import {MyOceanContext} from '../../OceanContext';
import {assetAlgo} from '../../data/asset';
import {Button} from '@material-ui/core';
const CreateAlgorithm = () => {
    const {instance} = useContext(MyOceanContext)

    const publishalgo = async () => {
        try {
            const accounts = await instance ?. accounts.list()
            console.log('Publishing algo.')
            if (accounts !== undefined) {
                const ddoAlgorithmNew = await instance ?. assets.create(assetAlgo, accounts[0])
                console.log(ddoAlgorithmNew)
                console.log('Algo asset successfully submitted.')
                alert('Algorithm successfully submitted.')
            }

        } catch (error) {
            console.error(error.message)
        }
    }
    return (
        <div>CreateAlgorithm
            <Button variant="contained"
                onClick={publishalgo}>Create</Button>

        </div>
    )
}

export default CreateAlgorithm
