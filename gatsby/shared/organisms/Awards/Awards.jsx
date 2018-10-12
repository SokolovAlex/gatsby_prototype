/* eslint-disable */
import React from 'react';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';

import { content } from '@services/url';
import { Link } from '@at/Link/Link';
import { Button } from '@at/Button/Button';

import styles from './Awards.module.scss';

const rootClasses = (sectionClass) => {
  return classNames({
    [styles.host]: true,
    [sectionClass ? sectionClass : styles.greyBackground]: true,
  });
}

const rootStyles = (background) => {
  return background
    ? { backgroundImage: `url(${background})` } 
    : {};
}

const mockAwardsData = () => ({
  "sectionHeader": "La plus testée. La plus récompensée.",
  "description": "Depuis plus de 20 ans, nous sommes reconnus en tant qu’experts de la lutte contre les programmes malveillants et les cybermenaces. En 2017, les produits Kaspersky Lab ont fait l\u0027objet de 86 tests et études indépendants. Ils ont terminé 72 fois en première position et 78 fois parmi les trois premiers. Pour plus d’informations, consultez \u003ca href=\"/top3\" xmlns=\"http://www.w3.org/1999/xhtml\"\u003ehttps://www.kaspersky.fr/top3\u003c/a\u003e.",
  "awards": [{
    "link": "http://www.av-comparatives.org/wp-content/uploads/2016/01/avc_sum_201512_en.pdf",
    "image": "https://www.kaspersky.fr/content/fr-fr/images/b2c/awards/icon-awards-av-comparative.png",
    "alt": "AV-Comparatives Award: Product of the Year"
  }, {
    "link": "https://www.av-test.org/en/award/2015/best-usability-kaspersky-lab/",
    "image": "https://www.kaspersky.fr/content/fr-fr/images/b2c/awards/AV-Test-–-Best-Performance-2015.png",
    "alt": "AV-Test Award: Best Performance 2015"
  }, {
    "link": "https://www.mrg-effitas.com/media-room/award/",
    "image": "https://www.kaspersky.fr/content/fr-fr/images/b2c/awards/icon-awards-mrg.png",
    "alt": "MRG Award: Online Banking Browser Security"
  }],
  "awardsText": "RÉCOMPENSES",
  "awardsLink": "/about/awards",
  "freeScan": "Protection gratuite",
  "freeScanDescription": "Une protection de base contre les programmes malveillants qui s\u0027adapte à vos activités pour vous protéger.",
  "freeScanButtonText": "GRATUIT",
  "freeScanButtonLink": "/free-cloud-antivirus"
});

const Awards = ({ data }) => {
  data = mockAwardsData();
  return (
    <React.Fragment>
      <section className={ rootClasses(data.sectionClass) } style={rootStyles(data.bg)}>
        <div className={ styles.container }>
          <Grid container spacing={16}>
            <Grid item xs={8}>
              <div className={ styles.awards }>
                <h4 dangerouslySetInnerHTML={{ __html: data.sectionHeader }} />
                <p dangerouslySetInnerHTML={{ __html: data.description }} />
                <ul className={styles.awardsList}>
                  { data.awards.map((award, i) => (
                    <li key={i} className={styles.awardItem}>
                      <Link href={ award.link } isBlank>
                        <img src={ award.image } alt={ award.alt }/>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Button href={ data.awardsLink }>
                  { data.awardsText }
                </Button>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className={ styles.promo }>
                <h4 className={ styles.promoTitle } dangerouslySetInnerHTML={{ __html: data.freeScan }} />
                <p className={ styles.promoDescription } dangerouslySetInnerHTML={{ __html: data.freeScanDescription }} />
                <Button href={data.freeScanButtonLink}>
                  { data.freeScanButtonText }
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </section>
    </React.Fragment>
  );
}

export { Awards };
