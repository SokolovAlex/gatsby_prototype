import React from 'react';
import { Header } from '../../components/organisms/Header/Header';

class Layout extends React.PureComponent {
  render() {
    const children = this.props.children;
    return (
      <React.Fragment>
          <div>
            <Header />
            {children}
          </div>
      </React.Fragment>)
  }
}
export default Layout;
