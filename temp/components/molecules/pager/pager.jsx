import React from 'react';

const Pager = ({ count, currentPage, pageSize, gotoPage }) => {
  const pagesCount = Math.ceil(count / pageSize);
  /* eslint-disable-next-line no-use-before-define */
  const pages = createPage(pagesCount, currentPage);

  function handleClick(e, page) {
    e.preventDefault();
    if (page > pagesCount || page <= 0) {
      return;
    }
    gotoPage(page);
  }

  return (
    <div className="pagination">
      <div className="pagination">
        <ul className="pagination-list">
          <li className={currentPage === 1 ? 'disabled' : ''}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="" className="prev" onClick={(e) => handleClick(e, currentPage - 1)}>
              <span className="font-icons icon-arrow-left-2" />
            </a>
          </li>
          {pages.map((page, i) => (
            /* eslint-disable-next-line react/no-array-index-key */
            <li key={i} className={`${currentPage === page.num ? 'active' : ''} ${!page.num ? 'disabled' : ''}`}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="" onClick={(e) => handleClick(e, page.num)}>
                {page.label}
              </a>
            </li>
          ))}
          <li className={currentPage === pagesCount ? 'disabled' : ''}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="" className="next" onClick={(e) => handleClick(e, currentPage + 1)}>
              <span className="font-icons icon-arrow-right-2" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

const createPage = (pagesCount, currentPage) => {
  const pages = [];
  const semicols = { label: '...' };
  for (let i = 0; i < pagesCount; i++) {
    pages.push({
      label: i + 1,
      num: i + 1,
    });
  }

  if (pagesCount < 10) {
    return pages;
  }

  if (pagesCount >= 10) {
    if (currentPage < 6) {
      return [...pages.slice(0, 6), semicols, pages[pagesCount - 1]];
    }

    if (currentPage > pagesCount - 5) {
      return [pages[0], semicols, ...pages.slice(pagesCount - 6, pagesCount)];
    }

    return [pages[0], semicols, ...pages.slice(currentPage - 3, currentPage + 2), semicols, pages[pagesCount - 1]];
  }
  return pages;
};

export default Pager;
