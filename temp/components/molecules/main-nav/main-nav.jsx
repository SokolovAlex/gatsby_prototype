import React from 'react';
import classSet from 'classnames';

import { listB2CTemplate, listResTemplate } from './templates';

const getNavClass = (megaNav, mobileNavLength, isActive) => {
  if (!megaNav) {
    return classSet({ active: isActive });
  }
  return classSet({
    active: isActive,
    b2c: megaNav.menuType === 'b2c',
    mega: megaNav.menuType !== 'res',
    'res-small': megaNav.menuType === 'res',
    'mega-small': megaNav.menuType === 'vsb' || megaNav.menuType === 'smb',
    dropdown: megaNav && !mobileNavLength,
    'mega-float': !megaNav.mega_menu_secondary_nav,
  });
};

const getMegaNavClass = (megaNav) => {
  if (!megaNav) {
    return classSet({});
  }
  return classSet({
    ent: megaNav.menuType === 'ent',
    'extended-ent': megaNav.menuType === 'ent-featured',
  });
};

const listTemplate = (megaNav) => {
  const rootClass = getMegaNavClass(megaNav);
  switch (megaNav.menuType) {
    case 'b2c':
      return listB2CTemplate(megaNav, rootClass);
    case 'res':
      return listResTemplate(megaNav, rootClass);
    default:
      return <ul className={rootClass} />;
  }
};

const MainNav = ({ fields }) => {
  const { rightMenuItem } = fields;
  return (
    <nav className="main-nav">
      <ul className="main-menu">
        {fields.mainNavItem.map((nav, i) => {
          const megaNav = nav.megaMenuItem && nav.megaMenuItem.fields;
          const isActive = nav.link === '/resource-center';
          return (
            /* eslint-disable-next-line react/no-array-index-key */
            <li key={i} name={`item-${i}`} className={getNavClass(megaNav, 0, isActive)}>
              <a href={nav.link}>{nav.text}</a>
              {megaNav && listTemplate(megaNav)}
            </li>
          );
        })}

        {
          <li className="quick-menu">
            {false && (
              <span className="red-item">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a>` ${rightMenuItem.ctaText}`</a>
              </span>
            )}
            {false && (
              <span className="red-item">
                {/* eslint-disable-next-line react/no-this-in-sfc */}
                <a href={`${rightMenuItem.ctaLink}${this.utm}`}>{rightMenuItem.ctaText}</a>
              </span>
            )}
          </li>
        }
      </ul>
    </nav>
  );
};

export default MainNav;
