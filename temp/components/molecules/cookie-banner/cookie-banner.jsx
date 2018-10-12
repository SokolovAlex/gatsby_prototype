import React from 'react';

const CookieBanner = ({ btnText, desc, onAcceptBanner }) => {
  const onClickHandler = (e) => {
    e.preventDefault();
    onAcceptBanner();
  };
  return (
    <section className="notification-bar transparent dark bottom">
      <div className="container">
        <div className="description-left">
          {/* eslint-disable-next-line react/no-danger */}
          <p dangerouslySetInnerHTML={{ __html: desc }} />
        </div>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="" onClick={(e) => onClickHandler(e)} className="button green close">
          {btnText}
        </a>
      </div>
    </section>
  );
};

export default CookieBanner;
