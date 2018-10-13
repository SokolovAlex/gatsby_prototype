const mkdirp = require('mkdirp');
const { writeFileSync, readFileSync, existsSync } = require('fs');
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
  writeFileSync(`${dirPath}/${name}.json`, JSON.stringify(body));
}

const startBuild = () => {
  const thread = exec('yarn clear && yarn build', { cwd: `${__dirname}/../../` }, (error, stdout) => {
    console.log('error: ', error);
    console.log('stdout: ', stdout);
  });

  thread.stdout.on('data', console.info);
  thread.stderr.on('data', console.error);
}

const getTemplate = (template) => {
  const filePath = `${__dirname}/../content/${template}/${template}.json`;
  if (!existsSync(filePath)) {
    return { template, content: null };
  }
  return readFileSync(filePath);
}

module.exports = { publish, moveContent, getTemplate, startBuild };