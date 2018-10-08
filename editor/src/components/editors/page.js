import React from 'react';

import Editor, { Editable } from 'ory-editor-core'
import image from 'ory-editor-plugins-image'

import { Trash, DisplayModeToggle, Toolbar } from 'ory-editor-ui'
import 'ory-editor-ui/lib/index.css'

import 'ory-editor-plugins-image/lib/index.css'
import 'ory-editor-core/lib/index.css'

import slate from 'ory-editor-plugins-slate' // The rich text area plugin
import 'ory-editor-plugins-slate/lib/index.css' // Stylesheets for the rich text area plugin

import background, { COLOR_MODE_FLAG, IMAGE_MODE_FLAG, GRADIENT_MODE_FLAG } from 'ory-editor-plugins-background'
import 'ory-editor-plugins-background/lib/index.css'

import textPlugin from '../plugins/input-text'
import banner from '../plugins/banner'

import native from 'ory-editor-plugins-default-native'
import divider from 'ory-editor-plugins-divider'

import spacer from 'ory-editor-plugins-spacer'
import 'ory-editor-plugins-spacer/lib/index.css'

import IconButton from '@material-ui/core/IconButton';
import PublishIcon from '@material-ui/icons/Publish'

import { setItem, saveItem, getCurrentItem } from '../../services/state';
import { saveTemplate } from '../../services/api';

require('react-tap-event-plugin')() // not work with react >16.4

const save = () => {
    saveItem();
    saveTemplate(getCurrentItem());
    console.log(JSON.stringify(getCurrentItem()));
}

const plugins = {
    content: [slate(), image, divider, spacer, textPlugin, banner],
    layout: [
        background({
            defaultPlugin: slate(),
            enabledModes: COLOR_MODE_FLAG | IMAGE_MODE_FLAG | GRADIENT_MODE_FLAG
        })
    ],
    native
};

const PageActions = () => (
  <div>
    <IconButton onClick={() => save()} style={{marginLeft: 20}} variant="fab" aria-label="Edit">
        <PublishIcon/>
    </IconButton>
  </div>
);

const PageManager = ({ content }) => {
    const editor = new Editor({
        plugins,
        editables: [content],
    });
    return (
        <div style={{margin: 20, border: '1px dotted grey'}}>
            <Editable
                editor={editor}
                id={content.id}
                onChange={(editable) => {
                    setItem('page_state', editable);
                }} />
            <Trash editor={editor}/>
            <DisplayModeToggle editor={editor}/>
            <Toolbar editor={editor}/>
        </div>
    );
}

export { PageManager, PageActions };