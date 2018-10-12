import { region } from '@config';

const images = [
  `content/${region}/images/repository/fall-back/01.jpg`,
  `content/${region}/images/repository/fall-back/02.jpg`,
  `content/${region}/images/repository/fall-back/03.jpg`,
  `content/${region}/images/repository/fall-back/04.jpg`,
  `content/${region}/images/repository/fall-back/05.jpg`,
  `content/${region}/images/repository/fall-back/06.jpg`,
  `content/${region}/images/repository/fall-back/07.jpg`,
  `content/${region}/images/repository/fall-back/08.jpg`,
  `content/${region}/images/repository/fall-back/09.jpg`,
  `content/${region}/images/repository/fall-back/10.jpg`,
];

const fallbackImage = images[0];

const getFallbackImage = () => {
  const index = Math.floor(Math.random() * images.length) + 1;
  return images[index];
};

export { getFallbackImage, fallbackImage };
