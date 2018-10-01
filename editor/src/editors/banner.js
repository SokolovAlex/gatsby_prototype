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

import Button from '@material-ui/core/Button';
import PublishIcon from '@material-ui/icons/Publish'
import BugReportIcon from '@material-ui/icons/BugReport'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

import { getSavedItem, setItem, saveItem, getCurrentItem, clearState } from '../services/state';
require('react-tap-event-plugin')() // not work with react >16.4

const content = getSavedItem();

const editor = new Editor({
  plugins: {
    content: [slate(), image, divider, spacer, textPlugin, banner],
    layout: [
        background({
            defaultPlugin: slate(),
            enabledModes: COLOR_MODE_FLAG | IMAGE_MODE_FLAG | GRADIENT_MODE_FLAG
        })
    ],
    native
  },
  editables: [content],
})

const save = () => {
    saveItem();
}

const viewSavedJson = () => {
    alert(JSON.stringify(getCurrentItem()));
}

const clearJson = () => {
    const isSure = false;// confirm("Are you sure ?");
    if (isSure) {
        clearState();
    }
}

function BannerManager() {
    return (
        <div style={{marginTop: 30}}>
            <h3>Banner Editor</h3>
            <div>
                <Button onClick={() => save()} style={{marginLeft: 20}} variant="fab" aria-label="Edit">
                    <PublishIcon/>
                </Button>
                <Button onClick={() => viewSavedJson()} variant="fab" style={{marginLeft: 20}}
                    color="primary"
                    aria-label="Edit">
                    <BugReportIcon/>
                </Button>
                <Button onClick={() => clearJson()} variant="fab" style={{marginLeft: 20}}
                    color="secondary"
                    aria-label="Edit">
                    <DeleteForeverIcon/>
                </Button>
            </div>
            <hr/>
            <Editable
                editor={editor}
                id={content.id}
                onChange={(editable) => {
                    console.log('state', editable);
                    setItem('banner_state', editable);
                }} />
            <Trash editor={editor}/>
            <DisplayModeToggle editor={editor}/>
            <Toolbar editor={editor}/>
        </div>
    );
}

export default BannerManager;