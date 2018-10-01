import React from 'react';

import './breadcrumbs.scss'

class Breadcrumbs extends React.PureComponent {
    constructor(props) {
      super(props);
      this.breadcrumbs = props.breadcrumbs;
    }

    render() {
        const depth = this.breadcrumbs.length;
        return (
            <p className="breadcrumbs">
                { this.breadcrumbs.map((state, i) => (
                    <a key={i}
                        href={state.link}
                        className={ depth === (i + 1) ? 'unclickable' : ''}>
                        {state.title}
                    </a>
                ))}
            </p>
        );
    };
}

export default Breadcrumbs;