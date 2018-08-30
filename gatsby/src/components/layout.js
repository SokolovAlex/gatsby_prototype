import React from 'react'
import Helmet from 'react-helmet'
import { injectIntl } from 'react-intl'

const Layout = ({ children, data, intl }) => (
  <div>
    <Helmet
      title={ "wadawd" }
      meta={[
        { name: 'description', content: intl.formatMessage({ id: 'welcome' }) },
        {
          name: 'keywords',
          content: 'gatsby,k i18n, react-intl, multi language, localization',
        },
      ]}
    >
        <link rel="stylesheet" href="https://www.kaspersky.ru/resources/template/css/main.min.css" />
        <link rel="stylesheet" href="https://www.kaspersky.ru/resources/template/css/b2c.min.css" />
    </Helmet>

    <site-header site-top-height="76">
        <header id="site-header" className="site-header">
            <div className="container">
                <a href="" className="menu-toggle"></a>
                <div className="site-title">
                <a href="/" title="Kaspersky Lab" rel="home">Kaspersky 
                <i className="kaspersky-logo"></i></a>
                </div>
                <ul className="menu-utility" >
                    <li className="cart">
                        <a href="https://allsoft.kaspersky.ru/basket">
                            <i className="font-icons icon-cart"></i>
                            </a></li>
                            <li className="my-kaspersky dropdown">
                            <a href="https://my.kaspersky.com/" target="_blank">My Kaspersky</a>
                            <ul>
                            <li>
                            <a href="https://my.kaspersky.com/MyDevices" target="_blank">
                            <i className="font-icons icon-devices"></i>Устройства</a></li>
                            <li><a href="https://my.kaspersky.com/MyLicenses" target="_blank"><i className="font-icons icon-subscriptions"></i>
                            Продукты / Лицензии</a></li><li>
                            <a href="https://my.kaspersky.com/MyAccount/OrdersHistory" target="_blank"><i className="font-icons icon-card"></i>Заказы</a></li></ul></li></ul>
                </div>
        </header>
      </site-header>

    {children}

  </div>
)

export default injectIntl(Layout)
