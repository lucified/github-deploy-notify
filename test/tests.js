
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */

// The tests assume that they are run from
// the project root folder

const chai = require('chai');
const chaiFiles = require('chai-files');
const spawn = require('child_process').spawn;
const path = require('path');

chai.use(chaiFiles);


describe('works via command line', () => {
  function followProcessAndCheck(p, done) {
    p.on('close', (code) => {
      if (code > 0) return done(new Error(`Command exited with code ${code}`));
      return done();
    });
  }

  it('works with options object file', done => {
    const p = spawn(path.resolve('./lib/main-cli.js'),
      ['--verbose'], { cwd: __dirname, stdio: 'inherit' });
    followProcessAndCheck(p, done);
  });
});

