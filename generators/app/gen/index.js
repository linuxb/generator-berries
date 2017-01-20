'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');

const fakeBasePath = path.join(__dirname, '../../../../fake-yo-dir');

module.exports = Generator.extend({

  initializing: function () {
    // reset destination path, or it will look for a path at /var/folders/**
    this.destinationRoot(fakeBasePath);
    this.contextRoot = fakeBasePath;
    this.appname = '';
  },

  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the berries ' + chalk.red('generator-berries') + ' generator!'
    ));

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your App Name ?',
        default: this.appname
      },
      {
        type: 'checkbox',
        name: 'installTools',
        message: 'Choose your Package Manager Tools',
        choices: [
          {name: 'npm', value: 'npm', checked: true},
          {name: 'bower', value: 'bower', checked: true},
          {name: 'yarn', value: 'yarn'}
        ],
        store: true
      },
      {
        type: 'confirm',
        name: 'isInit',
        message: 'Have you created a package.json file?',
        default: false
      },
      {
        type: 'list',
        name: 'license',
        message: 'what kind of license are you using?',
        choices: ['BSD', 'MIT', 'Apache'],
        default: 'BSD',
        store: true
      }
    ];

    return this.prompt(prompts).then(function (answers) {
      // To access users configs later use this.answers.prop;
      this.answers = answers;
    }.bind(this));
  },

  writing: function () {
    const targetPath = `${this.answers.name}/`;
    this.fs.copyTpl(
      this.templatePath('base/'),
      this.destinationPath(targetPath),
      {handle: '0'}
    );
    // copy the package.json
    if (!this.answers.isInit) {
      this.fs.copyTpl(
        this.templatePath('extra/package.json'),
        this.destinationPath(`${targetPath}/package.json`),
        {
          name: this.answers.name,
          license: this.answers.license
        }
      );
    }
  },

  install: function () {
    console.log('install deps');
    this.installDependencies();
  }
});
