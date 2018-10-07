const mkdirp = require('mkdirp');
const { writeFileSync, readFileSync } = require('fs');
const ncp = require('ncp').ncp;

const publish = async (name, body) => {
    saveFile(name, body);
    await moveContent();
}

const src = `${__dirname}/../content`;
const dest = `${__dirname}/../../content/modified/com/templates`;

const moveContent = () => {
    return new Promise((resolve) => {
        ncp(src, dest, (err) => {
            if (err) {
              return console.error(err);
            }
            resolve();
        });
    });
}

const saveFile = (name, body) => {
    const dirPath = `${__dirname}/../content/${name}`
    mkdirp(dirPath);
    writeFileSync(`${dirPath}/${name}.json`,
        JSON.stringify(body));
}

const getTemplate = (name) => {
    return readFileSync(`${__dirname}/../content/${name}/${name}.json`);
}

module.exports = { publish, moveContent, getTemplate };