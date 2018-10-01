import React from 'react';
import { slideCountrySelector } from '@services/jquery';

class CountrySelector extends React.PureComponent {
    constructor(props) {
        super(props);
        this.fields = props.fields;
        this.onToogleCountrySelector = props.onToogleCountrySelector;
        this.isCountrySelectorOpen = props.isCountrySelectorOpen;
    }

    toggleSelector(e) {
        e.preventDefault();
        this.onToogleCountrySelector();
    }

    render() {
        const body = this.fields.Body;

        slideCountrySelector(); // todo - use react animation

        return (
            <section className="footer-selector">
                <div className="container">
                    <a href="#" className="close-selector" onClick={ e => this.toggleSelector(e) }>
                        <i className="font-icons icon-cancel"></i>
                    </a>
                    <div className="section-col-l-4 reset-l country-list"
                        dangerouslySetInnerHTML={{ __html: body }} ></div>
                </div>
            </section>
        );
    };
}

export default CountrySelector;


