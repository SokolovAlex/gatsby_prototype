import React from 'react';
import classSet from 'classnames';

const listB2CTemplate = (megaNav, rootClass) => {
  const hasCustomSideBlok = megaNav.hasCustomHtmlSideBlock;
  return (
    <ul className={rootClass}>
      <li className="first">
        <ul className="featured featured-b2c section-col-l-3 no-gutter">
          {megaNav.product &&
            megaNav.product.map((productData, i) => {
              const product = productData.fields;
              const promoM = product.promoM.length ? product.promoM[0] : false;
              return (
                <li
                  /* eslint-disable-next-line react/no-array-index-key */
                  key={i}
                  className={classSet({
                    'promo-menu-item': promoM === 'True',
                  })}>
                  {promoM === 'True' && product.new && <span className="label red">{product.new}</span>}
                  <a href={product.prodPageLink}>
                    <span className="surtitle">{product.prodKasperskyTitle}</span>
                    {product.prodMainTitle}
                    <span className="subtitle">{product.prodAddTitle}</span>
                  </a>

                  <div className="desc">
                    <p>{product.overrideProdDescNav || product.shortDesc}</p>
                    <p>
                      <a href={product.learnMoreLink}>{product.learnMoreText}</a> /{' '}
                      <a href={product.freeTrialLink}>{product.freeTrialText}</a>
                    </p>
                  </div>
                </li>
              );
            })}
        </ul>
      </li>
      {hasCustomSideBlok !== 'true' && (
        <li>
          <ul className="regular">
            {megaNav.mega_menu_secondary_nav.secondary_nav_side_title && (
              <li className="title">
                <h6>{megaNav.mega_menu_secondary_nav.secondary_nav_side_title}</h6>
                {megaNav.mega_menu_secondary_nav.secondary_nav_side_subtitle && (
                  /* eslint-disable-next-line no-undef */
                  <p>{item.megaMenuItem.mega_menu_secondary_nav.secondary_nav_side_subtitle}</p>
                )}
              </li>
            )}
            {megaNav.mega_menu_secondary_nav.secondary_nav_side_links.map((item, i) => (
              /* eslint-disable-next-line react/no-array-index-key */
              <li key={i}>
                <a href={item.link}>
                  {item.text}
                  {item.new && <small className="tag">{item.new}</small>}
                </a>
              </li>
            ))}
          </ul>
        </li>
      )}
      {/* eslint-disable-next-line no-undef */}
      {hasCustomSideBlok === 'true' && <li>{item.megaMenuItem.megaSideBlock1}</li>}
    </ul>
  );
};

const listResTemplate = (megaNav, rootClass) => (
  <ul className={rootClass}>
    {megaNav.customLinks &&
      megaNav.customLinks.map((item, i) => (
        /* eslint-disable-next-line react/no-array-index-key */
        <li key={i}>
          <a href={item.link} target={item.isExternal === 'Yes' ? '_blank' : ''}>
            {item.text}
          </a>
        </li>
      ))}
  </ul>
);

export { listB2CTemplate, listResTemplate };
