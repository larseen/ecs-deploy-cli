import yargs from 'yargs';
import pkg from '../package.json';

const config = yargs
    .config('config')
    .usage('$0 [options] <source>')
    .options({
        task: {
            alias: 't',
            description: 'Set port',
            default: './task.json'
        },
        service: {
            alias: 's',
            description: 'Set host'
        },
        cluster: {
            alias: 'c',
            description: 'Watch file(s)'
        },
        family: {
            alias: 'f',
            description: 'Path to routes file'
        }
    })
    .help('help')
        .alias('help', 'h')
    .version(pkg.version)
        .alias('version', 'v')
    .example('$0 db.json', '')
    .example('$0 file.js', '')
    .example('$0 http://example.com/db.json', '')
    .epilog('https://github.com/larseen/deploy-ecs')
    .require(1, 'Missing <source> argument');
