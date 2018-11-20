import React from 'react';
import { connect } from 'react-redux';

import { Editable, createEmptyState } from 'ory-editor-core'
import { Trash, DisplayModeToggle, Toolbar } from 'ory-editor-ui'

import IconButton from '@material-ui/core/IconButton';
import PublishIcon from '@material-ui/icons/Publish';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { setItem, saveItem, getCurrentItem } from '../services/state';
import { saveTemplate } from '../services/api';

import { ChangeLayout } from '../store/actions'

import 'ory-editor-ui/lib/index.css'
import 'ory-editor-core/lib/index.css'

import { createEditor } from './core';

import Layout from '../shared/layouts/Layout/Layout';
import Layout2 from '../shared/layouts/Layout2/Layout2';

const LayoutTypes = {
  simple: 0,
  blue: 1,
};

const LayoutComponents = {
  [LayoutTypes.simple]: Layout,
  [LayoutTypes.blue]: Layout2,
};

const save = () => {
  saveItem('article');
  saveTemplate('article', getCurrentItem('article'));
}

const ArticlesActionsBase = ({layoutType, changeLayout }) => (
  <div>
    <Select
      value={layoutType}
      onChange={(e) => changeLayout(e.target.value)}
    >
      <MenuItem value={LayoutTypes.simple}>kaspersky</MenuItem>
      <MenuItem value={LayoutTypes.blue}>dr.web</MenuItem>
    </Select>
    <IconButton onClick={() => save()} style={{marginLeft: 20}}
      color="inherit" variant="fab" aria-label="Edit">
      <PublishIcon/>
    </IconButton>
  </div>
)

class ArticleManagerBase extends React.Component {
  componentDidMount() {
    this.content = this.props.content || createEmptyState();
    this.editor = createEditor(this.content);
    this.forceUpdate();
  }
  render () {
    if (!this.editor) {
      return <p>Loader</p>
    }

    const { layoutType } = this.props;
    const LayoutComponent = LayoutComponents[layoutType];

    return (
      <LayoutComponent>
        <div style={{ border: '1px dotted grey', maxWidth: '1000px', margin: '0 auto' }}>
          <Editable
            editor={this.editor}
            id={this.content.id}
            onChange={(editable) => {
                setItem('article', editable);
            }} />
          <Trash editor={this.editor}/>
          <DisplayModeToggle editor={this.editor}/>
          <Toolbar editor={this.editor}/>
        </div>
      </LayoutComponent>
      );
  }
}

const ArticlesActions = connect(
  (state) => ({
    layoutType: state.layout.layoutType
  }),
  (dispatch) => ({
    changeLayout(ltype) {
      dispatch(new ChangeLayout(ltype));
    }
  })
)(ArticlesActionsBase);

const ArticleManager = connect(
  (state) => ({
    layoutType: state.layout.layoutType
  }),
  null
)(ArticleManagerBase);

export { ArticleManager, ArticlesActions };