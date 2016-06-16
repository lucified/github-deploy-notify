
/* eslint-disable no-console */

const chalk = require('chalk');
const projectName = require('project-name');

// return true if there are no errors
function validateOptions(opts) {
  let errors = false;

  if (!opts.org) {
    console.log(`${chalk.red('Error:')} 'org' is not defined.`);
    errors = true;
  }

  if (!opts.body) {
    console.log(`${chalk.red('Error:')} 'body' is not defined.`);
    errors = true;
  }

  if (!opts.githubToken) {
    console.log(`${chalk.red('Error:')} 'githubToken' is not defined.`);
  }

  if (!opts.project && !projectName()) {
    console.log(`${chalk.red('Error:')} 'project' is not defined.`);
  }

  return !errors;
}


function prepareOptions(options) {
  const opts = Object.assign({}, options);
  opts.project = opts.project || projectName();

  return opts;
}


module.exports.validateOptions = validateOptions;
module.exports.prepareOptions = prepareOptions;
