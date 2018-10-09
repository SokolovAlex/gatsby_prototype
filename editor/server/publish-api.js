const mkdirp = require('mkdirp');
const { writeFileSync, readFileSync } = require('fs');
const ncp = require('ncp').ncp;
const exec = require('child_process').exec;

const publish = async (name, body) => {
  saveFile(name, body);
  await moveContent();

  startBuild();
}

const src = `${__dirname}/../content`;
const dest = `${__dirname}/../../content/modified/fr/templates`;

const moveContent = () => {
  mkdirp(dest);
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

const startBuild = () => {
  const thread = exec('yarn clear && gatsby build', { cwd: `${__dirname}/../../pages` }, (error, stdout) => {
    console.log('error: ', error);
    console.log('stdout: ', stdout);
  });

  thread.stdout.on('data', console.info);
  thread.stderr.on('data', console.error);
}

const getTemplate = (name) => {
  return readFileSync(`${__dirname}/../content/${name}/${name}.json`);
}

module.exports = { publish, moveContent, getTemplate, startBuild };