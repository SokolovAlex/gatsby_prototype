import axios from 'axios'

const footer = () => {
    return axios.get(`http://localhost:3000/data/com/homepageFooter/footer.json`);
}

const siteBar = () => {
    return axios.get(`http://localhost:3000/data/com/site-header_site-bar/site-bar.json`);
}

export { footer, siteBar };