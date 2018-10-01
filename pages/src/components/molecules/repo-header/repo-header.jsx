import React from 'react'

import PageHeadline from '@at/page-headline/page-headline';
import Breadrumbs from '@at/breadcrumbs/breadcrumbs';

class RepoHeader extends React.PureComponent {
    constructor(props) {
        super(props);
        this.meta = props.meta;
    }

    render() {
        return (
            <header id="page-header" className="page-header">
                <div className="container">
                    <div className="page-info">
                        <Breadrumbs breadcrumbs={this.meta.breadcrumbs}/>
                    </div>
                    <PageHeadline
                        headerTitle={this.props.headerTitle}
                        headerSubTitle={this.props.headerSubTitle}
                        headerDescription={this.props.headerDescription}
                        headerBgImg={this.props.headerBgImg} />
                </div>
            </header>
        );
    };
}

export default RepoHeader;
