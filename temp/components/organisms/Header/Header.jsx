import React, { Component } from 'react';
import { trailingUrl } from '@services/url';
import styles from './Header.module.scss';
import Icon from '../Icon/Icon';

const topNavigationContent = {
  label: 'Solutions pour :',
  sections: [
    {
      link: '#',
      css: 'icon-home',
      text: 'Particuliers',
    },
    {
      link: 'https://www.kaspersky.fr/small-business-security',
      css: 'icon-small-business',
      text: 'TPE (1 à 50 employés)',
    },
    {
      link: 'https://www.kaspersky.fr/small-to-medium-business-security',
      css: 'icon-medium-business',
      text: 'PME (51 à 999 employés)',
    },
    {
      link: 'https://www.kaspersky.fr/enterprise-security',
      css: 'icon-enterprise',
      text: 'Grande entreprise (1 000 employés et +)',
    },
  ],
};

const TopNavigation = ({ fields }) => (
  <nav className={styles.topNav}>
    <div className={`${styles.container}`}>
      <div className={styles.topNavLabel}>{fields.label}</div>
      <ul className={`${styles.topNavLinks}`}>
        {fields.sections.map((section, i) => (
          <li key={section.link} className={styles.topNavLinkItem}>
            {i === 0 ? (
              <span className={`kl-icon kl-${section.css}`}>{section.text}</span>
            ) : (
              <a href={section.link} className={`kl-icon kl-${section.css}`}>
                {section.text}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  </nav>
);

const Logo = () => (
  <a href="https://www.kaspersky.fr/home-security" title="Kaspersky Lab" rel="home" className={styles.logo}>
    Kaspersky Lab
  </a>
);

class ComboboxCustom extends Component {
  state = {
    childrenIsVisible: false,
  };

  linkMouseEnterHandler = () => {
    this.setState({ childrenIsVisible: true });
  };

  linkMouseLeaveHandler = () => {
    this.setState({ childrenIsVisible: false });
  };

  render() {
    const { link, text, hasClass, children, isActive, blank, noopener } = this.props;
    const { childrenIsVisible } = this.state;
    const liClass = () => {
      if (Array.isArray(hasClass)) {
        return hasClass.map((clss) => styles[clss]).join(' ');
      }
      return styles[hasClass];
    };
    const linkClass = Array.isArray(hasClass) ? `${hasClass[0]}Link` : `${hasClass}Link`;
    return (
      <li
        key={link}
        className={liClass()}
        onMouseOver={this.linkMouseEnterHandler}
        onFocus={this.linkMouseEnterHandler}
        onMouseLeave={this.linkMouseLeaveHandler}>
        <a
          href={link}
          className={`${styles.combobox} ${isActive ? styles.isActive : ''} ${styles[linkClass]}`}
          target={blank ? '_blank' : ''}
          rel={noopener ? 'noopener noreferrer' : ''}>
          {text}
        </a>
        {React.Children.map(children, (child) =>
          React.cloneElement(child, {
            isVisible: childrenIsVisible,
          })
        )}
      </li>
    );
  }
}

const utilityMenuContent = {
  cartLink: 'https://boutique.kaspersky.fr/qte_mvt.html',
  menuText: 'Mon compte',
  menuLink: 'https://boutique.kaspersky.fr/subscriber-login.html?next=subscription.html',
  menuItems: [
    {
      text: 'My Kaspersky',
      link: 'https://my.kaspersky.com/',
      class: 'icon-devices',
      isExternal: ['Yes'],
      hide: [],
    },
    {
      text: 'Mes produits',
      link: 'https://my.kaspersky.com/MyLicenses',
      class: 'icon-subscriptions',
      isExternal: ['Yes'],
      hide: [],
    },
    {
      text: 'Mes commandes',
      link: 'http://boutique.kaspersky.fr/subscriber-login.html',
      class: 'icon-card',
      isExternal: ['Yes'],
      hide: [],
    },
  ],
  partnerMenuItems: [],
};

const Currency = () => <span className={styles.currency}>EUR</span>;

const UtilitySubMenu = ({ fields, isVisible }) => (
  <ul className={`${styles.myKasperskyList} ${isVisible ? styles.isVisible : ''}`}>
    {fields.map((item) => {
      const iconName = item.class.split('-')[1];
      return (
        <li className={styles.myKasperskyListItem} key={item.link}>
          <a
            href={item.link}
            target={item.isExternal === 'Yes' ? '_blank' : ''}
            className={styles.myKasperskyListItemLink}>
            <Icon name={iconName} size={21} className={styles.myKasperskyListItemIcon} />
            <span className={styles.mt1}>{item.text}</span>
          </a>
        </li>
      );
    })}
  </ul>
);

const UtilityMenu = ({ fields, isVisible }) => (
  <ul className={`${styles.utilityNav}`}>
    <li className={styles.utilityNavCart}>
      <a href={fields.cartLink}>
        <i className="font-icons icon-cart" />
      </a>
    </li>
    <Currency />

    <ComboboxCustom link={fields.menuLink} hasClass="myKaspersky" text={fields.menuText} blank noopener>
      <UtilitySubMenu fields={fields.menuItems} isVisible={isVisible} />
    </ComboboxCustom>
  </ul>
);

const mainMenuContent = [
  {
    text: 'Produits',
    link: '#',
    megaMenuItem: 'content/fr-fr/home-security/main-nav/mega-menu/mega-menu.json',
    mobile_nav_disable: [],
    isExternal: [],
  },
  {
    text: 'Renouveler',
    link: 'https://www.kaspersky.fr/renewal-center/home',
    mobile_nav_disable: [],
    isExternal: [],
  },
  {
    text: 'Téléchargements',
    link: 'https://www.kaspersky.fr/downloads',
    mobile_nav_disable: [],
    isExternal: [],
  },
  {
    text: 'Support',
    link: 'https://support.kaspersky.com/fr#s_tab2',
    mobile_nav_disable: [],
    isExternal: [],
  },
  {
    text: 'Conseils et informations',
    link: 'https://www.kaspersky.fr/resource-center',
    mobile_nav_disable: [],
    isExternal: [],
  },
  {
    text: 'Blog',
    link: '/blog/',
    megaMenuItem: 'content/fr-fr/home-security/main-nav/mega-menu/blog-dropdown.json',
    mobile_nav_disable: [],
    isExternal: [],
  },
];

const MainMenu = ({ fields }) => (
  <nav className={styles.mainNav}>
    <div className={styles.container}>
      <ul className={`${styles.mainNavList}`}>
        {fields.map((nav, i) => {
          const subBox = nav.megaMenuItem;
          return subBox ? (
            <ComboboxCustom
              key={nav.link + nav.text}
              link={nav.link}
              text={nav.text}
              hasClass={['mainNavListItem', 'mr1']}
              isActive={i === 0}
            />
          ) : (
            <li key={nav.link} className={`${styles.mainNavListItem} ${styles.mr1}`}>
              <a href={trailingUrl(nav.link)} className={i === 0 ? styles.isActive : ''}>
                {nav.text}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  </nav>
);

export const Header = () => (
  <header className={styles.header}>
    <TopNavigation fields={topNavigationContent} />

    <div className={`${styles.container} ${styles.pt2} ${styles.pb2}`}>
      <Logo />
      <UtilityMenu fields={utilityMenuContent} />
    </div>

    <MainMenu fields={mainMenuContent} />

    {/* TODO: search */}
  </header>
);
