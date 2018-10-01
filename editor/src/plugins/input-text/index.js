import React from 'react'

// You are obviously not limited to material-ui, but we really enjoy
// the material-ui svg icons!
import PluginIcon from '@material-ui/icons/Mood'

// This is the ReactJS component which you can find below this snippet
import InputTextField from './input-text'

export default {
  Component: InputTextField,
  IconComponent: <PluginIcon />,
  name: 'example/content/input-text-field',
  version: '0.0.1',
  text: 'Input Text Field'
}