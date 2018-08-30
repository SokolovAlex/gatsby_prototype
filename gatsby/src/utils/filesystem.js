const fs = require('fs');

const createFolder = (path) => {
    if (!fs.existsSync(path)){
        fs.mkdirSync(path);
    }
};

const saveFile = (path, content) => {
    fs.writeFileSync(path, content, 'utf8');
};

module.exports = { createFolder, saveFile };
