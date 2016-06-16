#! /usr/bin/env node

/* eslint-disable no-console */

const fileExists = require('file-exists');
const minimist = require('minimist');
const githubDeployNotify = require('./main');
const chalk = require('chalk');
const path = require('path');
const Table = require('cli-table2');
const _ = require('lodash');

const args = minimist(process.argv.slice(2));
const configFile = args.config || 'github-deploy-notify.config.js';
const utils = require('./utils');

const hrstart = process.hrtime();

// merge options from possible config file with command line arguments
let opts = {};
if (fileExists(configFile)) {
  const resolvedPath = path.resolve(configFile);
  if (args.verbose) {
    console.log(`Using config from ${chalk.blue(resolvedPath)}`);
  }
  opts = require(resolvedPath);
} else {
  console.log(`[Error] ${configFile} does not exist`);
  process.exit(1);
}
opts = Object.assign(opts, args);
delete opts._;

if (!opts.githubToken) {
  console.log('No github token defined, not notifying deployment API');
  process.exit(0);
}

// check that options are valid
if (!utils.validateOptions(opts)) {
  process.exit(1);
}

if (opts.skip) {
  console.log('Skipping sending of notification to deployment API');
  process.exit(0);
}

if (!args.silent) {
  console.log(`${chalk.cyan('▶')} Sending notification to GitHub deployment API`);
}

const preparedOpts = utils.prepareOptions(opts);
if (args.verbose) {
  const table = new Table();
  _.forOwn(preparedOpts, (value, key) => {
    let val = value;
    if (key === 'githubToken' && value && value.length > 4) {
      val = Array(value.length - 3).join('*') + value.substring(value.length - 4);
    }
    if (key === 'body') {
      val = JSON.stringify(val);
    }
    table.push({ [key]: val });
  });
  console.log(table.toString());
}

githubDeployNotify(preparedOpts, err => {
  if (err) {
    process.exit(1);
  }
  if (!args.silent) {
    console.log(`${chalk.green('✓')} ` // eslint-disable-line
      + 'Finished sending notification to GitHub deployment API in '
      + chalk.magenta(`${(process.hrtime(hrstart)[1] / 1000000).toFixed(2)} ms`));
  }
});

