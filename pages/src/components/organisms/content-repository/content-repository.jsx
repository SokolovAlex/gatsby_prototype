import React from 'react'
import { connect } from 'react-redux';
import Loader from 'react-loaders';

import CategorySelector from '../../atoms/category-selector/category-selector'
import ContentRepositoryList from '@mol/content-repository-list/content-repository-list'
import ArticleList from '@mol/article-list//article-list';

import { getContentRepositoryList } from '@services/api';
import { region } from '@config';
import { loadResourceSuccess } from '@actions';

class ContentRepository extends React.PureComponent {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
        getContentRepositoryList({ size: 10 }).then(res => {
            this.props.loadResourceSuccess(res);
        });
    }

    render() {
        const docs = this.props.docs;
        return (
            <section>
                { region !== 'ru-ru' && region !== 'ja-jp' &&
                    <CategorySelector/>
                }
                <div className="container">
                    { docs ?
                        <div className="row">
                            <div className="content col-l-7 col-xl-8">
                                <ContentRepositoryList docs={ docs }/>
                            </div>
                            <div className="sidebar col-l-5 col-xl-4">
                                <ArticleList docs={ docs } />
                            </div>
                        </div>
                        :
                        <div className="row">
                            <div className="content">
                                <Loader type="pacman" />
                            </div>
                        </div>
                    }
                </div>
            </section>
        );
    };
}

export default connect(
    (state) => ({
        docs: state.contentRepository.docs
    }),
    (dispatch) => ({
        loadResourceSuccess(data) {
            dispatch(loadResourceSuccess(data));
        },
        loadSimularArticlesSuccess(data) {
            dispatch(loadSimularArticlesSuccess(data));
        }
    })
)(ContentRepository)