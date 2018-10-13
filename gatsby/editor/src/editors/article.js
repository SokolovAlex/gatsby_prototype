import React from 'react';

import { Editable, createEmptyState } from 'ory-editor-core'
import { Trash, DisplayModeToggle, Toolbar } from 'ory-editor-ui'

import IconButton from '@material-ui/core/IconButton';
import PublishIcon from '@material-ui/icons/Publish'

import { setItem, saveItem, getCurrentItem } from '../services/state';
import { saveTemplate } from '../services/api';

import 'ory-editor-ui/lib/index.css'
import 'ory-editor-core/lib/index.css'

import { createEditor } from './core';

import Layout from '../shared/layouts/Layout/Layout';

const save = () => {
    saveItem('article');
    saveTemplate('article', getCurrentItem('article'));
}

const ArticlesActions = () => (
  <div>
    <IconButton onClick={() => save()} style={{marginLeft: 20}}
      color="inherit" variant="fab" aria-label="Edit">
      <PublishIcon/>
    </IconButton>
  </div>
);

class ArticleManager extends React.Component {
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
      <Layout>
        <div style={{margin: 20, border: '1px dotted grey'}}>
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
      </Layout>
      );
  }
}

export { ArticleManager, ArticlesActions };