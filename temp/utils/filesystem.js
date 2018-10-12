const fs = require('fs');

const createFolder = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};

const saveFile = (path, content) => {
  fs.writeFileSync(path, content, 'utf8');
};

const readJson = (path) => {
  const content = fs.readFileSync(path);
  let json;
  try {
    json = JSON.parse(content);
  } catch (ex) {
    console.log(`parse error: \n ${ex} \n File: ${path}`);
  }
  return json;
};

module.exports = { createFolder, saveFile, readJson };
