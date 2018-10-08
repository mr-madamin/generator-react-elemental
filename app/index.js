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
        default: kebabCase(this.appname),
      },
    ];

    return this.prompt(prompts).then((props) => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('**/!(package.json)'),
      this.destinationPath(), { globOptions: { dot: true } }
    );

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
