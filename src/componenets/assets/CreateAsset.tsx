import React, {useContext, useState} from 'react';
import {MyOceanContext} from '../../OceanContext';
import {Button, Grid, TextField, Divider} from '@material-ui/core';
import {Account} from '@oceanprotocol/squid';
import asset from '../../data/asset';
import FormControl from '@material-ui/core/FormControl';

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


    const handleSubmit = (event : React.FormEvent < HTMLFormElement >) => {}
    // const [mainMetaData, setMainMetaData] = useState < MetaDataMain > ({
    //     name: 'name',
    //     type: 'dataset',
    //     dateCreated: '',
    //     author: 'author',
    //     license: 'license',
    //     price: 'price',
    //     files: []
    // });

    return (
        <div>CreateAsset {/* <form onSubmit={handleSubmit}> */}
            {/* <div>
                    <TextField value={
                            mainMetaData.name
                        }
                        placeholder="Name"
                        onChange={
                            (e) => setMainMetaData((prevstate) => ({
                                ...prevstate,
                                name: e.target.value
                            }))
                    }></TextField>
                </div>
                <div>
                    <TextField value={
                            mainMetaData.author
                        }
                        placeholder="Author"
                        onChange={
                            (e) => setMainMetaData((prevstate) => ({
                                ...prevstate,
                                author: e.target.value
                            }))
                    }></TextField>
                </div>
                <div>
                    <TextField value={
                            mainMetaData.license
                        }
                        placeholder="License"
                        onChange={
                            (e) => setMainMetaData((prevstate) => ({
                                ...prevstate,
                                license: e.target.value
                            }))
                    }></TextField>
                </div>
                <Divider></Divider>
 */}

            <Button type="submit" variant="contained"
                onClick={createAsset}>Create</Button>
            {/* </form> */} </div>
    )
}

export default CreateAsset
