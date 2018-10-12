import { domain } from '@config';
import allConfigs from './configs';

let locConfig = null;
const getLocConfig = () => {
  if (locConfig === null) {
    locConfig = allConfigs[domain];
  }
  return locConfig || 'unknown';
};

const getCountry = () => getLocConfig().country;

export { getLocConfig, getCountry };
