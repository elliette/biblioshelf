const { resolve } = require('path');
const pkg = require('./package.json');
const debug = require('debug')(`${pkg.name}:boot`);

// This will load a secrets file from
//
//      ~/.your_app_name.env.js
//   or ~/.your_app_name.env.json
//
// and add it to the environment.
// Note that this needs to be in your home directory, not the project's root directory
const env = process.env;
const secretsFile = resolve(require('homedir')(), `.${pkg.name}.env`);

try {
  Object.assign(env, require(secretsFile));
} catch (error) {
  debug('%s: %s', secretsFile, error.message);
  debug('%s: env file not found or invalid, moving on', secretsFile);
}

module.exports = {
    package: pkg,
    env: env
};
