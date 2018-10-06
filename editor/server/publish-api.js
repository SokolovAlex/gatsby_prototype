const mkdirp = require('mkdirp');
const { writeFileSync } = require('fs');
const ncp = require('ncp').ncp;

const publish = async (body) => {
    saveFile(body);
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

const saveFile = (body) => {
    const dirPath = `${__dirname}/../content/banner`
    mkdirp(dirPath);
    writeFileSync(`${dirPath}/banner.json`,
        JSON.stringify(body));
}

module.exports = { publish, moveContent };