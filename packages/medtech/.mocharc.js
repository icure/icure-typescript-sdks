'use strict'

// This is a JavaScript-based config file containing every Mocha option plus others.
// If you need conditional logic, you might want to use this type of config,
// e.g. set options via environment variables 'process.env'.
// Otherwise, JSON or YAML is recommended.

module.exports = {
    ignore: '**/*.test.ts', // Ignore tests already converted to jest
    recursive: true,
    require: ['ts-node/register', 'source-map-support/register'],
    timeout: '60000',
}
