let translations = {};

const fill = (source) => {
  translations = source;
  return translations;
};

const getTranslation = (key) => translations[key];

export { fill, getTranslation };
