'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const extend = require('deep-extend');
const _ = require('lodash');

/*
* main generator for the package.json and README.md
* which needs templates populated
*/

module.exports = Generator.extend({

  initializing: function () {
    // only in test enviroment
    // reset destination path, or it will look for a path at /var/folders/**
    if (process.env.NODE_ENV === 'dev') {
      let fakeBasePath = path.join(__dirname, '../../../fake-yo-dir');
      this.destinationRoot(fakeBasePath);
      this.contextRoot = fakeBasePath;
      this.appname = '';
    }
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
        type: 'input',
        name: 'author',
        message: 'Your Name ?(as the author of your app)',
        default: '',
        store: true
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description of your web app',
        default: 'Nothing yet'
      },
      {
        type: 'checkbox',
        name: 'installTools',
        message: 'Choose your dependencies Package Manager Tools',
        choices: [
          {name: 'npm', value: 'npm', checked: true},
          {name: 'bower', value: 'bower'},
          {name: 'yarn', value: 'yarn'}
        ],
        store: true
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

    return this.prompt(prompts).then(function (props) {
      // To access users configs later use this.props;
      this.props = props;
    }.bind(this));
  },

  default: function () {
    this.composeWith(require.resolve('../subgen'), {
      arguments: [this.props.name]
    });
  },

  writing: function () {
    const targetPath = path.join(this.destinationPath('.'), `.`);
    //if you have no package.json yet, it will return {}
    let pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    let genPkg = require(this.templatePath('extra/package.json'));
    extend(pkg, {
      name: this.props.name,
      license: this.props.license,
      description: this.props.description,
      author: this.props.author,
      scripts: genPkg.scripts,
      dependencies: {
        react: genPkg.dependencies.react,
        'react-dom': genPkg.dependencies['react-dom'],
        redux: genPkg.dependencies.redux,
        'react-redux': genPkg.dependencies['react-redux'],
        'react-router': genPkg.dependencies['react-router'],
        express: genPkg.dependencies.express,
        'babel-polyfill': genPkg.dependencies['babel-polyfill'],
        'babel-register': genPkg.dependencies['babel-register'],
        webpack: genPkg.dependencies.webpack,
        'webpack-dev-server': genPkg.dependencies['webpack-dev-server']

      },
      devDependencies: {
        mocha: genPkg.devDependencies.mocha,
        istanbul: genPkg.devDependencies.istanbul,
        isparta: genPkg.devDependencies.isparta,
        'babel-cli': genPkg.devDependencies['babel-cli'],
        'babel-core': genPkg.devDependencies['babel-core'],
        'babel-loader': genPkg.devDependencies['babel-loader'],
        'babel-plugin-react-transform': genPkg.devDependencies['babel-plugin-react-transform'],
        'babel-plugin-transform-async-to-generator': genPkg.devDependencies['babel-plugin-transform-async-to-generator'],
        'babel-plugin-transform-react-jsx': genPkg.devDependencies['babel-plugin-transform-react-jsx'],
        'babel-preset-react': genPkg.devDependencies['babel-preset-react'],
        'babel-eslint': genPkg.devDependencies['babel-eslint'],
        'css-loader': genPkg.devDependencies['css-loader'],
        'babel-preset-es2015': genPkg.devDependencies['babel-preset-es2015'],
        eslint: genPkg.devDependencies.eslint,
        'eslint-config-airbnb': genPkg.devDependencies['eslint-config-airbnb'],
        'eslint-loader': genPkg.devDependencies['eslint-loader'],
        'eslint-plugin-import': genPkg.devDependencies['eslint-plugin-import'],
        'eslint-plugin-jsx-a11y': genPkg.devDependencies['eslint-plugin-jsx-a11y'],
        'eslint-plugin-react': genPkg.devDependencies['eslint-plugin-react'],
        'style-loader': genPkg.devDependencies['style-loader'],
        'webpack-hot-middleware': genPkg.devDependencies['webpack-hot-middleware'],
        'pm2': genPkg.devDependencies['pm2']
      }
    });
    pkg.keywords = pkg.keywords || [];
    pkg.keywords.push('react');
    pkg.keywords.push('node.js');
    this.fs.writeJSON(path.join(targetPath, 'package.json'), pkg);
    // generate README.md
    this.fs.copyTpl(
      this.templatePath('base/README.md'),
      path.join(targetPath, 'README.md'),
      {
        name: this.props.name,
        author: this.props.author,
        description: this.props.description,
        license: this.props.license
      }
    );
  },

  install: function () {
    let noBower = (this.props.installTools.indexOf('bower') === -1);
    let noYarn = (this.props.installTools.indexOf('yarn') === -1);
    // if you choose yarn to install dependencies, your choice using npm will lose
    this.installDependencies({npm: noYarn, bower: !noBower, yarn: !noYarn});
  }
});
