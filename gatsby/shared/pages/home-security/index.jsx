import React from 'react';
import { graphql } from 'gatsby';
import { ProductPromo } from '@org/ProductPromo/ProductPromo';
import Layout from '~/layouts/Layout/Layout';
import { BuyBlock } from '../../components/organisms/BuyBlock/BuyBlock';
import { PromoSection } from '../../components/organisms/PromoSection/PromoSection';
import { Carousel } from '../../components/organisms/Carousel/Carousel';
import { HelpMeChoose } from '../../components/organisms/HelpMeChoose/HelpMeChoose';
import { CompareTable } from '../../components/organisms/CompareTable/CompareTable';
import { Awards } from '../../components/organisms/Awards/Awards';

const HomeSecurity = ({ data }) => {
  /* eslint-disable-next-line no-underscore-dangle */
  const meta = {
    title: 'Protection antivirus et solutions de sécurité pour les particuliers | Kaspersky Lab FR',
    description:
      'Comparez les antivirus Kaspersky Lab : nous proposons plusieurs niveaux de protection pour vos appareils afin de les protéger contre les virus informatiques et les cybermenaces.',
  };
  return (
    <Layout title={meta.title} description={meta.description}>
      <BuyBlock />
      <PromoSection />
      <ProductPromo data={data.middleProductPromo._fields} />
      <Carousel />
      <HelpMeChoose />
      <CompareTable />
      <ProductPromo data={data.bottomProductPromo._fields} />
      <Awards />
    </Layout>
  );
};

export default HomeSecurity;

/* eslint-disable */
export const query = graphql`
  query HomeSecurityQuery {
    middleProductPromo: productPromoJson(id: { eq: "tcm:286-476587" }) {
      ...productPromoFragment
    }
    bottomProductPromo: productPromoJson(id: { eq: "tcm:286-476588" }) {
      ...productPromoFragment
    }
  }
`;
