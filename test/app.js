'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fs = require('fs-extra');

describe('generator-berries:app', () => {
  before(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'reol',
        installTools: ['npm', 'bower'],
        license: 'MIT',
        author: 'linuxb',
        description: 'My first Web App'
      })
      .toPromise();
  });

  it('creates files', () => {
    const expected = [
      'reol/src/components/index.js',
      'reol/webpack.conf.js',
      'reol/index.js',
      'reol/package.json',
      'reol/README.md'
    ];
    assert.file(expected);
  });

  it('populate package.json with correct infomation', () => {
    assert.JSONFileContent('reol/package.json', {
      name: 'reol',
      dependencies: {
        react: '^15.4.2',
        redux: '^3.6.0',
        'react-router': '^3.0.2',
        'react-redux': '^5.0.2'
      },
      devDependencies: {
        webpack: '^1.14.0',
        'webpack-dev-server': '^1.16.2',
        mocha: '^3.2.0',
        istanbul: '^0.4.5',
        isparta: '^4.0.0',
        'babel-node': '^6.5.2',
        'babel-core': '^6.22.0',
        'babel-register': '^6.22.0',
        'babel-polyfill': '^6.22.0',
        'babel-plugin-react-transform': '^2.0.2',
        'babel-plugin-transform-async-to-generator': '^6.22.0'
      },
      keywords: ['react', 'node.js']
    });
  });

  it('populate README.md with correct data', () => {
    assert.fileContent('reol/README.md', '# reol');
    assert.fileContent('reol/README.md', 'My first Web App');
    assert.fileContent('reol/README.md', 'MIT');
    assert.fileContent('reol/README.md', 'linuxb');
  });
});
