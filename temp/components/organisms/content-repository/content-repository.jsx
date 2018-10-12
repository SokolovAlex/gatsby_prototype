/* eslint-disable react/destructuring-assignment,prefer-destructuring */
import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loaders';

import CategorySelector from '@mol/category-selector/category-selector';
import ContentRepositoryList from '@mol/content-repository-list/content-repository-list';
import ArticleList from '@mol/article-list//article-list';
import Pager from '@mol/pager/pager';

import { getContentRepositoryList } from '@services/api';
import { region } from '@config';
import {
  loadContentRepositorySuccess,
  contentRepositoryChangePage,
  loadSimularArticlesContentRepositorySuccess,
} from '@actions';

class ContentRepository extends React.PureComponent {
  componentDidMount() {
    const { page } = this.props;
    getContentRepositoryList({ size: 10, page }).then((res) => {
      this.props.loadContentRepositorySuccess(res);
    });
    getContentRepositoryList({ size: 5 }).then((res) => {
      this.props.loadSimularArticlesContentRepositorySuccess(res.docs);
    });

    const windowGlobal = typeof window !== 'undefined' && window;
    if (!windowGlobal) {
      return;
    }

    const hash = windowGlobal.location.hash;
    const hashFields = hash.split('page=');
    if (hashFields.length > 0) {
      const currentPage = parseInt(hashFields[hashFields.length - 1], 10);
      if (currentPage) {
        this.props.contentRepositoryChangePage(currentPage);
      }
    }
  }

  gotoPage(page) {
    getContentRepositoryList({ size: 10, page }).then((res) => {
      window.location.href = `${window.location.pathname}#page=${page}`;
      this.props.contentRepositoryChangePage(page);
      this.props.loadContentRepositorySuccess(res);
    });
  }

  render() {
    const { docs, count, page, simularArticles } = this.props;
    return (
      <section>
        {false && region !== 'ru-ru' && region !== 'ja-jp' && <CategorySelector />}
        <div className="container">
          {docs ? (
            <div className="row">
              <div className="content col-l-7 col-xl-8">
                <ContentRepositoryList docs={docs} />
                {/* eslint-disable-next-line react/jsx-no-bind */}
                <Pager count={count} currentPage={page} gotoPage={this.gotoPage.bind(this)} pageSize={10} />
              </div>
              <div className="sidebar col-l-5 col-xl-4">
                {simularArticles && <ArticleList docs={simularArticles} />}
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="content">
                <Loader type="square-spin" />
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default connect(
  (state) => ({
    docs: state.contentRepository.docs,
    simularArticles: state.contentRepository.simularArticles,
    count: state.contentRepository.count,
    page: state.contentRepository.page,
  }),
  (dispatch) => ({
    loadContentRepositorySuccess(data) {
      dispatch(loadContentRepositorySuccess(data));
    },
    loadSimularArticlesContentRepositorySuccess(docs) {
      dispatch(loadSimularArticlesContentRepositorySuccess(docs));
    },
    contentRepositoryChangePage(page) {
      dispatch(contentRepositoryChangePage(page));
    },
  })
)(ContentRepository);
