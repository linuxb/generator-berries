const path = require('path');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('name', {
      required: true,
      type: String,
      description: 'App Name'
    });
  }

	// in run loop, this method runs after the 'write' method in main generator
  writing() {
    this.fs.copy(
      this.templatePath('.'),
      this.destinationPath('.')
    );
    this.fs.copy(
      this.templatePath('.babelrc'), 
      this.destinationPath('.babelrc')
    );
    this.fs.copy(
      this.templatePath('.editorconfig'), 
      this.destinationPath('.editorconfig')
    );
    this.fs.copy(
      this.templatePath('.eslintrc'), 
      this.destinationPath('.eslintrc')
    );
    this.fs.copy(
      this.templatePath('.gitignore'), 
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('.travis.yml'), 
      this.destinationPath('.travis.yml')
    );
  }
};
