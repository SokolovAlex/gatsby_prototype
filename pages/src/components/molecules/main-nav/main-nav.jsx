import React from 'react'
import classSet from 'classnames';

import { listB2CTemplate, listResTemplate } from './templates';

import { getJson } from '@services/api';

class MainNav extends React.PureComponent {
    showMenu = true;
    activeState = null; // todo
    hideSearch = false; // todo
    utm = 'utm'; // todo

    generalData = { // todo
        'new': true
    }

    constructor(props) {
      super(props);
      this.fields = this.props.fields;
      this.megaMenu = this.props.megaMenu;
      this.megaMenuBlog = this.props.megaMenuBlog;
    }

    componentDidMount() {
        // todo: need embeded json
        this.loadProducts().then(products => {
            this.megaMenu.productData = products;
            this.forceUpdate();
        });
    }

    loadProducts() {
        const jsonRequests = this.megaMenu.product
            .map(url => getJson(url));
        return Promise.all(jsonRequests);
    }

    hideGetInTouchCta() {
        return true;
    }

    navigateUserTo(link) {
        return true;
    }

    hideGetInTouchCta() {
        return true;
    }

    makeActive(index) {
        this.activeState = index;
        // commit
    }

    showSubMenu(menuItem) {
        console.log();
    }

    hideSubMenu(menuItem) {
        console.log('hide');
    }

    getMegaNav(nav) {
        if (!nav.megaMenuItem) {
            return null;
        }
        const jsonName = nav.megaMenuItem.split('/').pop();
        switch(jsonName) {
            case 'mega-menu.json':
                return this.megaMenu;
            case 'blog-dropdown-general.json':
                return this.megaMenuBlog;
            default:
                return null;
        }
    }

    getNavClass(megaNav, mobileNavLength, index) {
        if (!megaNav) {
            return {};
        }
        return classSet({
            active: this.activeState === index,
            b2c: megaNav.menuType === 'b2c',
            mega: megaNav.menuType !== 'res',
            'res-small': megaNav.menuType === 'res',
            'mega-small': megaNav.menuType === 'vsb' || megaNav.menuType === 'smb',
            dropdown: megaNav && !mobileNavLength,
            'mega-float': !megaNav.mega_menu_secondary_nav
        });
    }

    getMegaNavClass(megaNav) {
        if (!megaNav) {
            return {};
        }
        return classSet({
            'ent': megaNav.menuType === 'ent',
            'extended-ent': megaNav.menuType === 'ent-featured'
        });
    }

    listTemplate(megaNav) {
        const rootClass = this.getMegaNavClass(megaNav);
        switch(megaNav.menuType) {
            case 'b2c':
                return listB2CTemplate(megaNav, rootClass);
            case 'res':
                return listResTemplate(megaNav, rootClass)
            default:
                return <ul className={ rootClass }></ul>;
        }
    }

    render() {
        const fields = this.fields;
        const rightMenuItem = fields.rightMenuItem;
        return (
            <nav className="main-nav" style={ !this.showMenu ? { display: 'none' } : {}} >
                <ul className="main-menu">
                { fields.mainNavItem.map((nav, i) => {
                    const megaNav = this.getMegaNav(nav);
                    const mobileNavLength = nav.mobile_nav_disable && nav.mobile_nav_disable.length;
                    return (
                        <li key={i}
                            name={`item-${i}`}
                            className={ this.getNavClass(megaNav, mobileNavLength, i) }
                            onClick={ this.makeActive.bind(this, i) }
                            onMouseEnter={ this.showSubMenu.bind(this, nav) }
                            onMouseLeave={ this.hideSubMenu.bind(this, nav) }>

                            <a href={nav.link}>{nav.text}</a>

                            { megaNav && !mobileNavLength && this.listTemplate(megaNav) }
                        </li>
                        );
                    })
                }
              
                { !this.hideSearch ?
                    (
                        <li className="search">
                            { /*<search-bar></search-bar> */}
                        </li>
                    ) : (
                        <li className="quick-menu">
                            { this.hideGetInTouchCta() &&
                                <span className="red-item">
                                    <a onClick={this.navigateUserTo(rightMenuItem.ctaLink)}>
                                        {rightMenuItem.ctaText}</a>
                                </span>

                            }
                            { this.utm &&
                                <span className="red-item">
                                    <a href={`${rightMenuItem.ctaLink}${this.utm}`}>
                                        {rightMenuItem.ctaText}
                                    </a>
                                </span>
                            }
                        </li>
                    )
                }
                </ul>
            </nav>
        );
    };
}

export default MainNav
