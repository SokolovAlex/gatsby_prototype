import React from 'react';
import Layout from '../../components/organisms/Layout/Layout';
import { BuyBlock } from '../../components/organisms/BuyBlock/BuyBlock';
import { PromoSection } from '../../components/organisms/PromoSection/PromoSection';
import { Carousel } from '../../components/organisms/Carousel/Carousel';
import { HelpMeChoose } from '../../components/organisms/HelpMeChoose/HelpMeChoose';
import { CompareTable } from '../../components/organisms/CompareTable/CompareTable';

const HomeSecurity = () => {
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
      <Carousel />
      <HelpMeChoose />
      <CompareTable />
    </Layout>
  );
};

export default HomeSecurity;
