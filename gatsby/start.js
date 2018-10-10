const { exec } = require('child_process');
const { argv } = require('yargs');

const commands = {
  build: 'node scripts/build.js',
  start: 'node scripts/start.js',

  dev: 'gatsby develop', //node start --cmd dev
  'build-gatsby': 'gatsby build',
};

const start = () => {
  const cwd = 'ory' in argv ? 'editor' : 'pages';
  const command = argv.cmd && commands[argv.cmd];

  const thread = exec(command, { cwd }, (err, out) => {
    console.info('ERROR...');
    console.info(err);
    console.info('----------------');
    console.info(out);
  });

  thread.stderr.on('data', console.info);
  thread.stdout.on('data', console.info);
}

start();