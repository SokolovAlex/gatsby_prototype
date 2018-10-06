import React from 'react';
import { HTMLRenderer } from 'ory-editor-renderer'

import image from 'ory-editor-plugins-image'
import 'ory-editor-plugins-image/lib/index.css'
import 'ory-editor-core/lib/index.css'

import slate from 'ory-editor-plugins-slate' // The rich text area plugin
import 'ory-editor-plugins-slate/lib/index.css' // Stylesheets for the rich text area plugin

import divider from 'ory-editor-plugins-divider'

import spacer from 'ory-editor-plugins-spacer'

const plugins = {
    content: [slate(), image, divider, spacer],
    layout: [ ],
}

const createBanner = (state) => {
  const stateJson = JSON.parse(JSON.parse(state));
  return <HTMLRenderer state={stateJson} plugins={plugins}/>
}

export { createBanner }