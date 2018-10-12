import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loaders';

import ArticleContent from '@mol/article-content/article-content';
import ArticleList from '@mol/article-list/article-list';

import { getContentRepositoryList } from '@services/api';
import { loadContentRepositorySuccess } from '@actions';

class RepositoryArticle extends React.PureComponent {
  componentDidMount() {
    getContentRepositoryList({ size: 5 }).then((res) => {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.loadContentRepositorySuccess(res);
    });
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { image, title, body, docs } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="content col-l-7 col-xl-8">
            <ArticleContent body={body} image={image} />
          </div>
          <div className="sidebar col-l-5 col-xl-4">
            {docs ? <ArticleList docs={docs} /> : <Loader type="square-spin" />}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    docs: state.contentRepository.docs,
  }),
  (dispatch) => ({
    loadContentRepositorySuccess(data) {
      dispatch(loadContentRepositorySuccess(data));
    },
  })
)(RepositoryArticle);
