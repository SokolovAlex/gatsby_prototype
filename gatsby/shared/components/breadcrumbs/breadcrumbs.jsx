import React from 'react';

import './breadcrumbs.module.scss';

const data = [
  {
    "title": "Accueil",
    "link": "/"
  },
  {
    "title": "Particuliers",
    "link": "/home-security"
  },
  {
    "title": "Kaspersky Anti-Virus"
  }
]

const Breadcrumbs = ({ breadcrumbs }) => {
  const _breadcrumbs = breadcrumbs || data;
  const depth = _breadcrumbs.length;
  return (
    <p className="breadcrumbs">
      {_breadcrumbs.map((state, i) => (
        /* eslint-disable-next-line react/no-array-index-key */
        <a key={i} href={state.link} className={depth === i + 1 ? 'unclickable' : ''}>
          {state.title}
        </a>
      ))}
    </p>
  );
};

export default Breadcrumbs;
