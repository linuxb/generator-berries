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
      'src/common/index.js',
      'src/configs/index.js',
      'src/configs/server.js',
      'src/configs/webpack.js',
      'src/proxy/index.js',
      'src/public/actions/index.js',
      'src/public/components/App/index.js',
      'src/public/components/App/App.js',
      'src/public/components/App/App.css',
      'src/public/containers/index.js',
      'src/public/reducers/index.js',
      'src/public/stores/index.js',
      'src/public/index.html',
      'src/public/main.js',
      'src/router/index.js',
      'webpack/conf.dev.js',
      '.babelrc',
      '.editorconfig',
      '.eslintrc',
      '.gitignore',
      '.travis.yml',
      'app.js',
      'index.js',
      'server.js',
      'package.json',
      'README.md'
    ];
    assert.file(expected);
  });

  it('populate package.json with correct infomation', () => {
    assert.JSONFileContent('package.json', {
      name: 'reol',
      dependencies: {
        react: '^15.4.2',
        redux: '^3.6.0',
        'react-router': '^3.0.2',
        'react-redux': '^5.0.2',
        webpack: '^1.14.0',
        'webpack-dev-server': '^1.16.2',
        'babel-register': '^6.22.0',
        'babel-polyfill': '^6.22.0',
        'react-dom': '^15.4.2'
      },
      devDependencies: {
        'babel-cli': '^6.22.2',
        'babel-cli': '^6.22.2',
        'babel-core': '^6.22.0',
        'babel-loader': '^6.2.10',
        'babel-plugin-transform-async-to-generator': '^6.22.0',
        'babel-plugin-transform-react-jsx': '^6.22.0',
        'babel-preset-es2015': '^6.22.0',
        'babel-preset-react': '^6.22.0',
        'babel-eslint': '^7.1.0',
        'css-loader': '^0.26.1',
        eslint: '^3.0.0',
        'eslint-config-airbnb': '^13.0.0',
        'eslint-loader': '^1.3.0',
        'eslint-plugin-import': '^2.2.0',
        'eslint-plugin-jsx-a11y': '^2.2.0',
        'eslint-plugin-react': '^6.0.0',
        isparta: '^4.0.0',
        istanbul: '^0.4.5',
        mocha: '^3.2.0',
        'style-loader': '^0.13.1',
        'webpack-hot-middleware': '^2.15.0',
        'pm2': '^2.4.0'
      },
      keywords: ['react', 'node.js']
    });
  });

  it('populate README.md with correct data', () => {
    assert.fileContent('README.md', '# reol');
    assert.fileContent('README.md', 'My first Web App');
    assert.fileContent('README.md', 'MIT');
    assert.fileContent('README.md', 'linuxb');
  });
});
