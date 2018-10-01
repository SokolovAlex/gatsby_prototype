import React from 'react'

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import BannerManager from './banner'

class EditManagment extends React.Component {
    state = {
      value: 0,
    };
  
    handleChange = (event, value) => {
      this.setState({ value });
    };
  
    render() {
      const { value } = this.state;
  
      return (
        <div>
          <AppBar position="static">
            <Tabs value={value} centered onChange={this.handleChange}>
              <Tab label="Banner managment" />
              <Tab label="Page Editor" />
              <Tab label="Unknown" />
            </Tabs>
          </AppBar>
          {value === 0 && <BannerManager/> }
          {value === 1 && <p>Not emplemented</p>}
          {value === 2 && <p>Not emplemented</p>}
        </div>
      );
    }
}

export default EditManagment
