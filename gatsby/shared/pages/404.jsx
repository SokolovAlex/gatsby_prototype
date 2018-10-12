import React from 'react';

import Loader from 'react-loaders';
import Layout from '../layouts/common/common';

const NotFoundPage = () => (
  <Layout>
    <section>
      <div className="container error-404 h1" style={{ marginTop: 30, marginBottom: 100 }}>
        <div className="container divider" style={{ textAlign: 'center' }}>
          <div>
            <h1>PAGE INTROUVABLE</h1>
            <h2>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <span>La page que vous recherchez n'existe pas.</span>
            </h2>
          </div>
          <div>
            <p>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Veuillez retourner à la <a href="/">page d'accueil</a> ou choisir l'une des pages existantes ci-dessous.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="content">
            <Loader type="square-spin" />
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default NotFoundPage;
