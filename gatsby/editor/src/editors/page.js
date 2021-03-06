import React from 'react';

import { Editable, createEmptyState } from 'ory-editor-core'

import { Trash, DisplayModeToggle, Toolbar } from 'ory-editor-ui'
import 'ory-editor-ui/lib/index.css'
import 'ory-editor-core/lib/index.css'

import IconButton from '@material-ui/core/IconButton';
import PublishIcon from '@material-ui/icons/Publish'

import { setItem, saveItem, getCurrentItem } from '../services/state';
import { saveTemplate } from '../services/api';

import { createEditor } from './core';

const save = () => {
    saveItem();
    saveTemplate('page', getCurrentItem('page'));
}

const PageActions = () => (
  <div>
    <IconButton onClick={() => save()} style={{marginLeft: 20}}
      color="inherit" variant="fab" aria-label="Edit">
      <PublishIcon/>
    </IconButton>
  </div>
);

class PageManager extends React.Component {
  componentDidMount() {
    this.content = this.props.content || createEmptyState();
    this.editor = createEditor(this.content);
    this.forceUpdate();
  }
  render () {
    if (!this.editor) {
      return <p>Loader</p>
    }
    return (
      <div style={{margin: 20, border: '1px dotted grey'}}>
        <Editable
        editor={this.editor}
        id={this.content.id}
        onChange={(editable) => {
            setItem('page', editable);
        }} />
        <Trash editor={this.editor}/>
        <DisplayModeToggle editor={this.editor}/>
        <Toolbar editor={this.editor}/>
      </div>
      );
  }
}

export { PageManager, PageActions };