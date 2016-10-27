const yargs = require('yargs');
const pkg = require('../package.json');
const deploy = require('./deploy');

module.exports = function configuration() {
    const argv = yargs
        .usage('$0 [options] <source>')
        .options({
            service: {
                alias: 's',
                description: 'Name of service to deploy task to'
            },
            family: {
                alias: 'f',
                description: 'Name of task family to add the revision to'
            },
            cluster: {
                alias: 'c',
                description: 'Name of cluster where service is located'
            }
        })
        .help('help')
        .alias('help', 'h')
        .version(pkg.version)
        .alias('version', 'v')
        .example('$0 production.task.json', '')
        .example('$0 -s ecs-service -c ecs-cluster', '')
        .epilog('https://github.com/larseen/deploy-ecs')
        .argv;

    deploy(argv);
};
