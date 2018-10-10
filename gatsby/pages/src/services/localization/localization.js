import { locale, region } from '@config';
import allConfigs from './configs';

let locConfig = null;
const getLocConfig = () => {
    if (locConfig === null) {
        locConfig = allConfigs[locale];
    }
    return locConfig;
};

const getCountry = () => {
    return getLocConfig().country;
};

export { getLocConfig, getCountry };