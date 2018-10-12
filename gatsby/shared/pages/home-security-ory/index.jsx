/* eslint-disable */
import React, { Component } from 'react';

// The editor core
import Editor, { Editable, createEmptyState } from 'ory-editor-core';
import 'ory-editor-core/lib/index.css'; // we also want to load the stylesheets

// Require our ui components (optional). You can implement and use your own ui too!
import { Trash, DisplayModeToggle, Toolbar } from 'ory-editor-ui';
import 'ory-editor-ui/lib/index.css';

// Load some exemplary plugins:
import slate from 'ory-editor-plugins-slate'; // The rich text area plugin
import 'ory-editor-plugins-slate/lib/index.css'; // Stylesheets for the rich text area plugin

import Awards from '../../ory/plugins/content/Awards';
import BuyBlock from '../../ory/plugins/content/BuyBlock';
import Carousel from '../../ory/plugins/content/Carousel';
import CompareTable from '../../ory/plugins/content/CompareTable';
import Footer from '../../ory/plugins/content/Footer';
import HelpMeChoose from '../../ory/plugins/content/HelpMeChoose';
import Header from '../../ory/plugins/content/Header';
import PromoSection from '../../ory/plugins/content/PromoSection';

import { getSavedItem, setItem, saveItem, getCurrentItem, clearState } from '../../services/state';

import '../../layouts/Layout/Layout.scss';

require('react-tap-event-plugin')(); // react-tap-event-plugin is required by material-ui which is used by ory-editor-ui so we need to call it here

const plugins = {
  content: [slate(), Header, PromoSection, Awards, BuyBlock, Carousel, CompareTable, Footer, HelpMeChoose],
  layout: [],
};

const storageKey = 'home-security';

// Creates an empty editable
const content = getSavedItem(storageKey);

// Instantiate the editor
const editor = new Editor({
  plugins,
  editables: [content],
});

class HomeSecurityOry extends Component {
  render() {
    return (
      <React.Fragment>
        <Editable
          editor={editor}
          id={content.id}
          onChange={(editable) => {
            console.log('state', editable);
            setItem(storageKey, editable);
            saveItem(storageKey);
          }}
        />
        <Trash editor={editor} />
        <DisplayModeToggle editor={editor} />
        <Toolbar editor={editor} />
      </React.Fragment>
    );
  }
}

export default HomeSecurityOry;
