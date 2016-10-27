const chalk = require('chalk');
const path = require('path');
const Promise = require('bluebird');
const AWS = require('aws-sdk');

const ECS = new Promise.promisifyAll(new AWS.ECS({ region: 'eu-west-1' }));

const load = (source) => {
    try {
        return require(path.resolve(source));
    } catch (e) {
        return e;
    }
};

module.exports = function deploy(argv) {
    const source = argv._[0] || 'task.json';
    const task = load(source);

    if (task instanceof Error) {
        console.log(chalk.red(task.message));
        return;
    }

    console.log(chalk.cyan(`Registrating new task definition from:
        File: ${path.resolve(source)}`));

    ECS.registerTaskDefinitionAsync(task)
        .then(response => {
            taskDefinition = response.taskDefinition;
            console.log(chalk.cyan(`Registrated new task definition:
                Task: ${taskDefinition.taskDefinitionArn}
                Family: ${taskDefinition.family}
                Revision: ${taskDefinition.revision}`));
            return taskDefinition;
        })
        .then(taskDefinition => {
            if (!argv.service) {
                console.log(chalk.cyan('No service to update'));
                return;
            }

            if (!argv.cluster) {
                console.log(chalk.red('Missing cluster to update'));
                return;
            }

            console.log(chalk.cyan(`Updating:
                Task: ${taskDefinition.taskDefinitionArn}
                Service: ${argv.service}
                Cluster: ${argv.cluster}`));
        })
        .then(() => {
            console.log(chalk.cyan('ALL DONE!'));
        })
        .catch(error => {
            console.log(chalk.red(error.cause));
        });
};
