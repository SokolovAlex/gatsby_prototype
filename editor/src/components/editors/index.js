import React from 'react'

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import logo from '../logo.svg';
import BannerManager from './banner'
import { getBannerTemplate } from '../services/api';

class EditManagment extends React.Component {
    state = {
      value: 0,
    };

    componentDidMount() {
        getBannerTemplate().then(template => {
            this.bannerContent = JSON.parse(template.content);
            this.forceUpdate();
        });
    }
  
    handleChange = (event, value) => {
      this.setState({ value });
    };
  
    render() {
      const { value } = this.state;

      return (
        <div>
          <AppBar position="static">
            <Tabs value={value} centered onChange={this.handleChange}>
                <img src={logo} style={{ width: 25, height: 25 }} alt="logo" />
              <Tab label="Banner managment" />
              <Tab label="Page Editor" />
            </Tabs>
          </AppBar>
          { value === 0 && this.bannerContent
            && <BannerManager content={ this.bannerContent } /> }
          { value === 1 && <p>Not emplemented</p>}
        </div>
      );
    }
}

export default EditManagment
