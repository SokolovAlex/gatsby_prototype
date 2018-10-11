import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AttachmentIcon from '@material-ui/icons/Attachment';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FormatShapesIcon from '@material-ui/icons/FormatShapes';
import SettingsIcon from '@material-ui/icons/Settings';
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';

import { PageManager, PageActions } from '../../editors/page'
import { getBannerTemplate } from '../../services/api';
import './common.css';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#006d5c' },
    secondary: { main: '#b2b2b2' },
  },
});

const PageMenu = ({ onPageOpen }) => (
    <React.Fragment>
      <ListItem button onClick={() => onPageOpen('Page')}>
        <ListItemIcon>
          <ViewQuiltIcon />
        </ListItemIcon>
        <ListItemText primary="Page" />
      </ListItem>
      <ListItem button onClick={() => onPageOpen('Banner')}>
        <ListItemIcon>
          <FormatShapesIcon />
        </ListItemIcon>
        <ListItemText primary="Banner" />
      </ListItem>
    </React.Fragment>
  );
  
const otherMailFolderListItems = (
    <React.Fragment>
        <ListItem button>
        <ListItemIcon>
            <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Setting" />
        </ListItem>
    </React.Fragment>
);

class DenseAppBar extends React.PureComponent {
  state = {
    showSetting: false,
    showHeader: true,
    page: 'Page',
    pageContent: null,
    progress: true
  }

  componentDidMount() {
    this.getPageData();
  }

  getPageData(page) {
    const checkedPage = page || this.state.page;
    this.setState({ progress: true, pageContent: null });
    if (checkedPage === 'Page') {
      getBannerTemplate().then(template => {
        const pageContent = JSON.parse(template.content);
        this.setState({ pageContent, progress: false });
      });
    }
  }

  toogleSettings() {
    this.setState({
      showSetting: !this.state.showSetting,
    });
  }

  toogleHeader() {
    this.setState({
      showHeader: !this.state.showHeader,
    });
  }

  onPageOpen(page) {
    if(page === this.state.page) {
      return;
    }
    this.setState({ page, showSetting: false });
    this.getPageData(page);
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <IconButton color="primary" aria-label="Menu"
            className={ `menu-toggler ${ this.state.showHeader ? 'hide' : ''}` }
            onClick={() => { this.toogleHeader() }}>
            <AttachmentIcon />
        </IconButton>
        <AppBar position="static" className={ `main-header ${ this.state.showHeader ? '' : 'hide'}` }>
          <Toolbar variant="dense">
          <IconButton color="inherit" aria-label="Menu" 
            onClick={() => { this.toogleSettings() }}>
            <MenuIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="Menu" 
            onClick={() => { this.toogleHeader() }}>
            <AttachmentIcon />
          </IconButton>
          <div>KL Marketing Editor</div>
          <div style={{flexGrow: 1}} />
          
          { this.state.page === 'Page' &&
            <PageActions></PageActions>
          }
          
          <div>
            <IconButton color="inherit">
              <Badge badgeContent={3} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton aria-haspopup="true" color="inherit">
              <AccountCircle />
            </IconButton>
          </div>

          </Toolbar>
        </AppBar>

        <Drawer
          variant="persistent"
          open={ this.state.showSetting }>
          <div style={{textAlign: 'center'}}>
            <IconButton onClick={() => { this.toogleSettings() }}>
              <ChevronLeftIcon color="primary" />
            </IconButton>
          </div>
          <Divider />
          <List>
            <PageMenu onPageOpen={(page) => this.onPageOpen(page) }></PageMenu>
          </List>
          <Divider />
          <List>{otherMailFolderListItems}</List>
        </Drawer>

        { this.state.page === 'Page' && this.state.pageContent &&
          <PageManager content={ this.state.pageContent } />
        }

        { this.state.page !== 'Page' &&
          <p>Not implemented yet.</p>
        }
        
      </MuiThemeProvider>
    );
  };
}

export default DenseAppBar;