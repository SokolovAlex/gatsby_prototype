const ncp = require('ncp');

ncp('./shared', './editor', (err, res) => {
  console.log(err, res);
});

ncp('./shared', './pages', (err, res) => {
  console.log(err, res);
});