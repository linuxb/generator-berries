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
    const targetPath = path.join(this.destinationPath('.'), this.options.name);
    this.fs.copy(
      this.templatePath('.'),
      targetPath
    );
  }
};
