import Editor from 'ory-editor-core'

import image from 'ory-editor-plugins-image'
import 'ory-editor-plugins-image/lib/index.css'

import slate from 'ory-editor-plugins-slate' // The rich text area plugin
import 'ory-editor-plugins-slate/lib/index.css' // Stylesheets for the rich text area plugin

import background, { COLOR_MODE_FLAG, IMAGE_MODE_FLAG, GRADIENT_MODE_FLAG } from 'ory-editor-plugins-background'
import 'ory-editor-plugins-background/lib/index.css'

import native from 'ory-editor-plugins-default-native'
import divider from 'ory-editor-plugins-divider'

import spacer from 'ory-editor-plugins-spacer'
import 'ory-editor-plugins-spacer/lib/index.css'

import sharedPlugins from '../shared/components/plugins'

const plugins = {
    content: [slate(), image, divider, spacer, ...sharedPlugins],
    layout: [
        background({
            defaultPlugin: slate(),
            enabledModes: COLOR_MODE_FLAG | IMAGE_MODE_FLAG | GRADIENT_MODE_FLAG
        })
    ],
    native
};

const createEditor = (content) => {
  return new Editor({
    plugins,
    editables: [content],
  });
};

export { createEditor }