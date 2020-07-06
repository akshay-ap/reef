import {Output} from '@oceanprotocol/squid/dist/node/ocean/OceanCompute';
import {Config} from '@oceanprotocol/squid';

export const ComputeOutput: Output = {
    brizoAddress: '0x376817c638D2a04f475a73aF37f7B51A2862D567',
    brizoUri: 'https://brizo.nile.dev-ocean.com',
    metadataUri: 'https://aquarius.nile.dev-ocean.com',
    nodeUri: 'https://nile.dev-ocean.com',
    secretStoreUri: 'https://secret-store.nile.dev-ocean.com'
};

export const OceanConfig: Config = {
    nodeUri: 'https://nile.dev-ocean.com',
    aquariusUri: 'https://aquarius.marketplace.dev-ocean.com',
    brizoUri: 'https://brizo.marketplace.dev-ocean.com',
    brizoAddress: '0x4aaab179035dc57b35e2ce066919048686f82972',
    secretStoreUri: 'https://secret-store.nile.dev-ocean.com',
    verbose: true
};

export const STAKE_APP_CONTRACT_ADDRESS = '0xA641cc999Bb2d2935c9608c860041c49463fc418';
export const OCEAN_TOKEN_CONTRACT_ADDRESS = '0x9861Da395d7da984D5E8C712c2EDE44b41F777Ad';
