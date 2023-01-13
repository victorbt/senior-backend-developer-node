
import { ApiServerConfig } from './api.config'

import { DatabaseConfig } from './database.config'

interface ENV {
    NODE_ENV: string | undefined;
    HOST: string | undefined;
    PORT: number | undefined;
    MONGO_URI: string | undefined;
}

const getConfig = (): ENV => {
    return {
        //API Configs
        NODE_ENV: process.env.NODE_ENV,
        HOST: process.env.HOST,
        PORT: process.env.PORT ? Number(process.env.PORT) : undefined,

        //Database Config
        MONGO_URI: process.env.MONGO_URI
    };
};

interface Configs {
    API: ApiServerConfig
    DB: DatabaseConfig;
}

//(apiConfig:ApiServerConfig,databseConfig:DatabaseConfig)
const getSanitzedConfigs = (config: ENV): Configs => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in .env`);
        }
    }

    return {
        DB: config as DatabaseConfig,
        API: config as ApiServerConfig
    };
};

const config = getConfig();

const sanitizatedConfigs = getSanitzedConfigs(config)

export const APIConfig = sanitizatedConfigs.API;

export const DBConfig = sanitizatedConfigs.DB;

export * from './api.config'
export * from './database.config'