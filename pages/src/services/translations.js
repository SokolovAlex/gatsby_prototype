let translations = { }

const fill = (source) => {
    translations = source;
    return translations;
}

const getTranslation = (key) => {
    return translations[key];
}

export { fill, getTranslation }