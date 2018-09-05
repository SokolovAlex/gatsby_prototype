import axios from 'axios'

const getFooterData = () => {
    return axios.get(`http://localhost:3000/data/com/homepage_renew-and-about/renew-and-about.json`);
}

const getSiteBarData = () => {
    return axios.get(`http://localhost:3000/data/com/site-header_site-bar/site-bar.json`);
}

export { getFooterData, getSiteBarData };