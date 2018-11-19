import React, { Component } from 'react'
import { ProductPromo } from './ProductPromo'
import TextField from '@material-ui/core/TextField'
import data from './_data-ksc-promo-bottom';
import { BottomToolbar } from 'ory-editor-ui'
import { darkTheme } from 'ory-editor-ui/lib/ThemeProvider'

class Form extends Component {
  render() {
    return (
      <div>
        <ProductPromo data={data.fields} text={this.props.text} />
        <BottomToolbar open={this.props.focused} theme={darkTheme}>
          <TextField
            placeholder="enter promo text"
            label="Promo text"
            name="href"
            style={{ width: '512px' }}
            value={this.props.text}
            onChange={(e) => this.props.handleChange(e)}
          />
          <br />
        </BottomToolbar>
      </div>
    )
  }
}

export { Form }
