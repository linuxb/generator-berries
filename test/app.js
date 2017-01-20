'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-berries:app', () => {
  before(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'reol',
        installTools: ['npm', 'bower'],
        isInit: false,
        license: 'MIT'
      })
      .toPromise();
  });

  it('creates files', () => {
    assert.file([
      'reol/src/components/index.js'
    ]);
  });

  it('check the "handle" template', () => {
    assert.fileContent('reol/src/components/index.js', /.*=.?0/);
  });

  it('init via package.json', () => {
    assert.file([
      'reol/package.json'
    ]);
  });

  it('finish template in package.json', () => {
    assert.fileContent('reol/package.json', /.*reol/g);
  });
});
