import React from 'react';
import { ProductPromo } from '../shared/components/organisms/ProductPromo/ProductPromo';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { saveTemplate } from '../services/api';

class ComponentSettings extends React.Component {
  constructor(props) {
    super(props);
    const { content } = this.props;
    this.state={
      name: content.product.fields.prodMainTitle,
      brand: content.product.fields.prodKasperskyTitle,
    }
  }

  save() {
    saveTemplate('components', {
      "product": {
        "fields": {
          "title": this.state.name,
          "description": "Kaspersky Security Cloud",
          "shortDesc": "shortDesc",
          "fullSizeImage": "content/fr-fr/images/b2c/product-icon-security-cloud.png",
          "prodKasperskyTitle": this.state.brand,
          "prodMainTitle": this.state.name,
        }
      },
      "class": "ksc-promo",
      "bgImg": "content/fr-fr/images/ksc-bg.png",
      "bgColor": "#ecf5fc"
    });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render () {
    const { content } = this.props;
    return (
      <React.Fragment>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <form>
            <TextField
              label="Product Name"
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
            />
            <br/>
            <TextField
              label="Brand"
              value={this.state.brand}
              onChange={this.handleChange('brand')}
              margin="normal"
            />
            <br/>
            <Button variant="outlined" color="primary" onClick={() => this.save()}>
              Save
            </Button>
          </form>
          <div style={{margin: 20, border: '1px dotted grey'}}>
            <ProductPromo data={content}
              brand={this.state.brand}
              productName={this.state.name}
              text={"Text of instance"}></ProductPromo>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export { ComponentSettings };