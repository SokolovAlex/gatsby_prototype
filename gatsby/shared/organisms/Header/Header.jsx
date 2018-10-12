/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import { trailingUrl } from '@services/url';
import styles from './Header.module.scss';
import { Icon } from '../Icon/Icon';
import blogDropDownContent from './blog-dropdown.json';
import mainNavDownContent from './main-nav.json';

const topNavigationContent = {
  label: 'Solutions pour :',
  sections: [
    {
      link: '#',
      css: 'icon-home',
      text: 'Particuliers',
    },
    {
      link: '/small-business-security',
      css: 'icon-small-business',
      text: 'TPE (1 à 50 employés)',
    },
    {
      link: '/small-to-medium-business-security',
      css: 'icon-medium-business',
      text: 'PME (51 à 999 employés)',
    },
    {
      link: '/enterprise-security',
      css: 'icon-enterprise',
      text: 'Grande entreprise (1 000 employés et +)',
    },
  ],
};

const TopNavigation = ({ fields }) => (
  <nav className={styles.topNav}>
    <div className={`${styles.container}`}>
      <div className={styles.topNavLabel}>{fields.label}</div>
      <ul className={`${styles.topNavItems}`}>
        {fields.sections.map((section, i) => (
          <li key={section.link} className={styles.topNavItem}>
            {i === 0 ? (
              <span className={styles.topNavItemCurrent}>
                <Icon name={section.css.split('-')[1]} size={12} className={`${styles.topNavItemIcon} ${styles.mr1}`} />
                {section.text}
              </span>
            ) : (
              <a href={section.link} className={styles.topNavItemLink}>
                <Icon name={section.css.split('-')[1]} size={12} className={`${styles.topNavItemIcon} ${styles.mr1}`} />
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
  <a href="/home-security" title="Kaspersky Lab" rel="home" className={styles.logo}>
    Kaspersky Lab
  </a>
);

class ComboboxCustom extends Component {
  state = {
    childrenIsVisible: false,
  };

  linkMouseEnterHandler = () => {
    this.timeoutID = setTimeout(() => {
      this.setState({ childrenIsVisible: true });
    }, 200);
  };

  linkMouseLeaveHandler = () => {
    this.setState({ childrenIsVisible: false });
    clearTimeout(this.timeoutID);
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
        onMouseEnter={this.linkMouseEnterHandler}
        onFocus={this.linkMouseEnterHandler}
        onMouseLeave={this.linkMouseLeaveHandler}>
        {link ? (
          <a
            href={link}
            className={`${styles.combobox} ${isActive ? styles.isActive : ''} ${styles[linkClass]}`}
            target={blank ? '_blank' : ''}
            rel={noopener ? 'noopener noreferrer' : ''}>
            {text}
          </a>
        ) : (
          <span className={`${styles.combobox} ${isActive ? styles.isActive : ''} ${styles[linkClass]}`}>{text}</span>
        )}
        {React.Children.map(
          children,
          (child) =>
            child &&
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

/**
 * [constructCurrencyObject description]
 * @param  {String} currency            The currency ID
 * @param  {String} currencyDisplayName The currency display name
 * @param  {String} geoIP               The geoIP locale
 * @param  {String} locale              The site locale
 * @param  {String} name                The locale display name
 * @param  {String} [symbol='$']        Override for currency symbol
 * @param  {String} region              The region display name
 * @param  {String} [template='']       The currency formatting template; $ is the currency symbol and 1 is the numeric value. (e.g. 1 $ to have symbol at the end)
 * @param  {String} groupSep            Override for thousands separator
 * @param  {String} decimalSep          Override for decimals separator
 * @param  {String} decimalCount        Override for number of decimals to show
 * @return {Object}                     The currency object
 */
function constructCurrencyObject(
  currency,
  currencyDisplayName,
  geoIP,
  locale,
  name,
  symbol,
  region,
  template = '$1',
  groupSep,
  decimalSep,
  decimalCount
) {
  return {
    currency,
    symbol,
    geoIP,
    locale,
    currencyDisplayName,
    name,
    displayName: `${currency} - ${currencyDisplayName}`,
    template,
    groupSep,
    decimalSep,
    decimalCount,
    region,
  };
}

const currencyList = {
  frCurrencies: [
    constructCurrencyObject('EUR', 'Euro', '', 'fr-fr', 'France', '€', null, '1 $'),
    constructCurrencyObject('DA', 'Dinar algérien', 'DZ', 'fr-dz', 'Algeria', 'DA', null, '1 $'),
    constructCurrencyObject('DT', 'Dinar tunisien', 'TN', 'fr-tn', 'Tunisia', 'DT', null, '1 $'),
    constructCurrencyObject('DH', 'Dirham marocain', 'MA', 'fr-ma', 'Morocco', 'DH', null, '1 $', null, ','),
  ],
};

const CurrencyList = ({ fields: { frCurrencies }, isVisible, setCurrency }) => (
  <div className={`${styles.currencyList} ${isVisible ? styles.isVisible : ''}`}>
    {frCurrencies.map((currency) => (
      <button
        onClick={() => setCurrency(currency.currency)}
        type="button"
        key={currency.name}
        className={styles.currencyItem}>
        {currency.displayName}
      </button>
    ))}
  </div>
);

class Currency extends Component {
  state = {
    currentCurrency: 'EUR',
  };

  setCurrency = (currency) => {
    this.setState({
      currentCurrency: currency,
    });
  };

  render() {
    const { fields } = this.props;
    const { currentCurrency } = this.state;
    return (
      <ComboboxCustom text={currentCurrency} hasClass="currency">
        <CurrencyList fields={fields} setCurrency={this.setCurrency} />
      </ComboboxCustom>
    );
  }
}

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

const UtilityMenu = ({ fields }) => (
  <ul className={`${styles.utilityNav}`}>
    <li className={styles.utilityNavCart}>
      <a href={fields.cartLink} className={styles.utilityNavCartLink}>
        <Icon name="cart" size={21} />
      </a>
    </li>
    <Currency fields={currencyList} />

    <ComboboxCustom link={fields.menuLink} hasClass="myKaspersky" text={fields.menuText} blank noopener>
      <UtilitySubMenu fields={fields.menuItems} />
    </ComboboxCustom>
  </ul>
);

const MainMenuDropdownBlog = ({ fields: { customLinks }, isVisible }) => (
  <ul className={`${styles.mainNavDropdownBlog} ${isVisible && styles.isVisible}`}>
    {customLinks.map((item) => (
      <li key={item.link}>
        <a href={item.link} className={`${styles.mainNavDropdownBlogLink}`}>
          {item.text}
        </a>
      </li>
    ))}
  </ul>
);

// eslint-disable-next-line camelcase
const MainNavDropdown = ({ fields: { product, mega_menu_secondary_nav }, isVisible }) => (
  <ul className={`${styles.mainNavDropdown} ${isVisible && styles.isVisible}`}>
    <li>
      <article
        className={styles.mainNavDropdownProducts}
        itemScope
        itemProp="itemListElement"
        itemType="http://schema.org/ItemList">
        <span itemProp="numberOfItems" style={{ display: 'none' }}>
          {product.length}
        </span>
        {product.map(({ fields }) => (
          <section
            key={fields.shortName}
            className={`${styles.mainNavDropdownProductItem} ${fields.new && styles.isNew}`}
            itemProp="itemListElement"
            itemScope
            itemType="http://schema.org/Product">
            <link itemProp="url" href={fields.learnMoreLink} />
            {fields.new && <span className={styles.placemarkNew}>{fields.new}</span>}
            <a href={fields.learnMoreLink}>
              <header>
                <h2 className={`${styles.mainNavDropdownProductItemBrand} ${styles.ma0}`} itemProp="brand">
                  {fields.prodKasperskyTitle}
                </h2>
                <h1 className={`${styles.mainNavDropdownProductItemName} ${styles.ma0}`} itemProp="name">
                  {fields.prodMainTitle}
                </h1>
              </header>
            </a>
            <p
              className={`${styles.mainNavDropdownProductItemShortDescription} ${styles.mt05} ${styles.mb05}`}
              itemProp="description">
              {fields.shortDesc}
            </p>
            <a className={styles.mainNavDropdownProductItemLearnMoreLink} itemProp="url" href={fields.learnMoreLink}>
              {fields.learnMoreText}
            </a>
            <a className={styles.mainNavDropdownProductItemFreeTrialLink} itemProp="url" href={fields.freeTrialLink}>
              {fields.freeTrialText}
            </a>
          </section>
        ))}
      </article>
    </li>
    <li className={styles.mainNavDropdownLinks}>
      <header className={`${styles.mainNavDropdownLinksHeader} ${styles.mb1}`}>
        {mega_menu_secondary_nav.secondary_nav_side_title}
      </header>
      <ul>
        {mega_menu_secondary_nav.secondary_nav_side_links.map((item) => (
          <li key={item.text}>
            <a className={styles.mainNavDropdownLinksLink} href={item.link}>
              {item.text} {item.new && <span className={styles.placemarkNew}>{item.new}</span>}
            </a>
          </li>
        ))}
      </ul>
    </li>
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
    link: '/renewal-center/home',
    mobile_nav_disable: [],
    isExternal: [],
  },
  {
    text: 'Téléchargements',
    link: '/downloads',
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
    link: '/resource-center',
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
              isActive={i === 0}>
              {i === 5 && <MainMenuDropdownBlog fields={blogDropDownContent.fields} />}
              {i === 0 && <MainNavDropdown fields={mainNavDownContent.fields.mainNavItem[0].megaMenuItem.fields} />}
            </ComboboxCustom>
          ) : (
            <li key={nav.link} className={`${styles.mainNavListItem} ${styles.mr1}`}>
              <a
                href={trailingUrl(nav.link)}
                className={`${styles.mainNavListItemLink} ${i === 0 ? styles.isActive : ''}`}>
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
