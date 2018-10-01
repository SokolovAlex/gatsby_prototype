import React from 'react'
import { Link, graphql } from 'gatsby'

class SiteTop extends React.PureComponent {
    constructor(props) {
      super(props);
    }
    render() {
      return Template(this.props.fields);
    }
}

const Template = (fields) => {
    return (
        <div id="site-top" className="site-top">
            <div className="container">
                <nav className="site-nav">
                    <div className="label">
                        <p>{ fields.label }</p>
                    </div>
                    <ul className="site-selector">
                    {
                        fields.sections.map((section, i) => (
                            <li key={i}>
                                <Link to={section.link}>
                                    <i className={`font-icons ${section.css}`}></i>
                                    <span>{ section.text }</span>
                                </Link>
                            </li>
                        ))
                    }
                    </ul>
                </nav>
            </div>
        </div>
    )
};

export default SiteTop

export const query = graphql`
  fragment sitetopFragment on SitetopJson {
    _fields {
      label
      sections {
        link
        css
        text
      }
    }
  }
`;
