const chalk = require('chalk')
const log = console.log

const colorLog = {
    info: (string) => {
        log(chalk.bold.cyan(string));
    },
    succ: (string) => {
        log(chalk.bold.green(string));
    },
    err: (string) => {
        log(chalk.bold.red(string));
    },
    warning: (string) => {
        log(chalk.bold.yellow(string));
    }
}

module.exports = colorLog