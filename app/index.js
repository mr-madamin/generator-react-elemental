/**
 * @file        Yeoman generator main file of React Elemental
 * @author      Daler Madaminov
 * @license     MIT
 */

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const kebabCase = require('lodash.kebabcase');

module.exports = class extends Generator {
  prompting() {
    this.log(yosay(`Welcome to the ${chalk.green('React Elemental')} Generator!`));

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your app name',
        default: kebabCase(this.appname)
      },
    ];

    return this.prompt(prompts).then((props) => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('**/!(.gitignore|.npmignore|package.json)'),
      this.destinationPath(), { globOptions: { dot: true } }
    );

    if (this.fs.exists(this.templatePath('.npmignore'))) {
      this.fs.copy(
        this.templatePath('.npmignore'),
        this.destinationPath('.gitignore')
      );
    } else {
      this.fs.copy(
        this.templatePath('.gitignore'),
        this.destinationPath('.gitignore')
      );
    }

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      { name: kebabCase(this.props.name) }
    );
  }

  install() {
    this.npmInstall();
  }
}
