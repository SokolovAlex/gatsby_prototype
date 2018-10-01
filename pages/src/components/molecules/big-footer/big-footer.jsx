import React from 'react'
import { getCountry } from '@services/localization/localization';

class BigFooter extends React.PureComponent {
    constructor(props) {
        super(props);
        this.data = props.data;
        this.country = getCountry();
        this.onToogleCountrySelector = props.onToogleCountrySelector;
    }

    render() {
        const footerData = this.data;
        const now = new Date();
        const year = now.getFullYear();
        const isCountrySelectorOpen = this.props.isCountrySelectorOpen;

        return (
            <section id="site-footer" className="site-footer">
                <div className="container">
                    <div className="footer-links">
                        <div className="featured-pages">
                            <ul>
                                { footerData.leftSetOfBlocks.map((block, i) => (
                                    <li key={i}>
                                        <h3 dangerouslySetInnerHTML={{ __html: block.title }}></h3>
                                        <p>{block.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="contact-pages">
                            <ul className="right">
                                <li className="contact-block">
                                    <h3 dangerouslySetInnerHTML={{ __html: footerData.contactUsBlock.title }}></h3>
                                    <p dangerouslySetInnerHTML={{ __html: footerData.contactUsBlock.description }}></p>
                                </li>
                                { footerData.footerRightSideBlock && 
                                    <li className="lab-shop-block">
                                        <h3 dangerouslySetInnerHTML={{ __html: footerData.footerRightSideBlock.title }}></h3>
                                        <p dangerouslySetInnerHTML={{ __html: footerData.footerRightSideBlock.description }}></p>
                                    </li>
                                }
                                <li className="site-footer-social-icons">
                                    <h3 dangerouslySetInnerHTML={{ __html: footerData.socialBlockHeading }}></h3>
                                    <div>
                                        { footerData.socialIcons.map((item, i) => (
                                            <a key={i} href={item.link} target="_blank" className="social">
                                                <i className={ `font-icons ${item.icon}`}></i>
                                            </a>
                                        ))}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <footer>
                        <p className="copy">
                            &copy;&nbsp;{year}&nbsp;
                            <span dangerouslySetInnerHTML={{ __html: footerData.copyright }}></span>
                        </p>
                        <div className={`country-selector-button font-icons ${ isCountrySelectorOpen ? 'active' : '' }`}
                            onClick={ () => this.onToogleCountrySelector() }>
                            <p>{this.country}</p>
                            <span className="arrow"></span>
                        </div>
                    </footer>
                </div>
            </section>
        );
    };
}

export default BigFooter;