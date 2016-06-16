
# Send notification to GitHub deployment API on deployment

Simple utility for sending a notification to GitHub deployment API of a deployment. 

## Install

```shell
npm install github-deploy-notify -g
```

## Example usage

### Usage via command line

Create file `github-deploy-notify.config.js`
```js
module.exports = {
  githubToken: 'df89s7af89ds0a7daa',
  project: 'my-project-name',
  org: 'my-org-name',
  body: {
    // insert options according to 
    // https://developer.github.com/v3/repos/deployments/#create-a-deployment
  }
}
```

Then run
```shell
github-deploy-notify --verbose
```

The tool looks by default for a configuration object from `./github-deploy-notify.config.js`. You can also specify an alternative path for the configuration object with the `--config` option. 

### Usage via Javascript API

```js
var githubDeployNotify = require('github-deploy-notify');
deployNotify({
  githubToken: 'df89s7af89ds0a7daa',
  project: 'my-project-name',
  org: 'my-org-name',
  body: {
    // insert options according to 
    // https://developer.github.com/v3/repos/deployments/#create-a-deployment
  }
}, function(err) {
    if (err) {
      console.log('Failed to send notification to GitHub deployment API');
    } else {
      console.log('Notification delivered to GitHub deployment API');
    }
});
```

## Options

### Required

- `githubToken`: GitHub token. 
- `user`: Github user.
- `org`: Github organisation name.
- `project`: Github project name.
- `body`: Parameters according to <https://developer.github.com/v3/repos/deployments/#create-a-deployment>.

## Optional

- `skip`: Skip sending the notification.

### Only available via command line

- `config`: Alternative path for configuration object.
- `verbose`: Enable verbose output for command line.

## Test

Make sure you have the right node version
```
nvm use
```

As the tests are sending actual notifications to the Flowdock API, you will need have a `FLOW_TOKEN` environment variable defined for tests to work.

```
GITHUB_TOKEN=your_test_flow_token npm test
```
