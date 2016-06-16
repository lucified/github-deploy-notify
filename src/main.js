
/* eslint-disable no-console */

const request = require('request');
const utils = require('./utils');


function githubDeploy(project, org, body, user, githubToken) {
  const options = {
    url: `https://api.github.com/repos/${org}/${project}/deployments`,
    method: 'POST',
    auth: {
      user,
      pass: githubToken,
    },
    headers: {
      'User-Agent': org,
    },
    json: true,
    body,
  };
  request(options, (error, res, resBody) => {
    if (error) {
      console.log(error);
    }

    const STATUS = res.statusCode;
    const HEADERS = res.headers;
    const BODY = resBody;

    if (STATUS < 200 || STATUS >= 300) {
      console.log(`STATUS: ${STATUS}`);
      console.log(`HEADERS: ${JSON.stringify(HEADERS)}`);
      console.log(`BODY: ${JSON.stringify(BODY)}`);
      const err = new Error(`Received status ${STATUS}`);
      err.options = options;
      return;
    }
  });
}


function notify(opts, cb) {
  if (!utils.validateOptions(opts)) {
    cb(true);
  }
  const preparedOpts = utils.prepareOptions(opts);
  githubDeploy(preparedOpts.project,
    preparedOpts.org,
    preparedOpts.body,
    preparedOpts.user,
    preparedOpts.githubToken,
    cb);
}


module.exports = notify;
