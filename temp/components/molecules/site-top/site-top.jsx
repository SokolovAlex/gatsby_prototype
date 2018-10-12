import React from 'react';
import Icon from '../../organisms/Icon/Icon';

const SiteTop = ({ fields }) => (
  <div id="site-top" className="site-top">
    <div className="container">
      <nav className="site-nav">
        <div className="label">
          <p>{fields.label}</p>
        </div>
        <ul className="site-selector">
          {fields.sections.map((section, i) => (
            /* eslint-disable-next-line react/no-array-index-key */
            <li key={i}>
              <a href={section.link}>
                {/* <i className={`font-icons ${section.css}`} /> */}
                <Icon fill="#717171" name="home" width={15} height={12} style={{ marginRight: '0.5em' }} />
                <span>{section.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </div>
);

export default SiteTop;
