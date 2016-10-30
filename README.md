# ecs-deploy-cli

`ecs-deploy-cli` is a simple and easy way to deploy tasks and update services in AWS ECS.

Just write your task definition in `task.json` and upload them straight to AWS using `ecs-deploy-cli`.

## Install

```sh
$ npm install -g ecs-deploy-cli
```

To be able to deploy to AWS you need to have installed the `aws-cli` and configured it to use the the account you wish to upload the function to.

## Configuration

To upload automatically to AWS you need to configure your task functions in the file `task.json`.

### Example task

```json
{
    "family": "node-task",
    "containerDefinitions": [
        {
            "memory": 300,
            "essential": true,
            "name": "node",
            "image": "node",
            "logConfiguration": {
                "logDriver": "awslogs",
                "options": {
                    "awslogs-group": "node-task",
                    "awslogs-region": "eu-west-1"
                }
            },
            "cpu": 200
        }
    ],
}
```

For a more detailed task definition see the DOCS for the [AWS CLI](http://docs.aws.amazon.com/cli/latest/reference/ecs/register-task-definition.html).

## Examples


### Create a new task

```sh
$ ecs-deploy-cli
```

or

```sh
$ ecs-deploy-cli production.task.json
```


### Create a new task and update an existing service

```sh
$ ecs-deploy-cli --service node-service --cluster ecs-cluster
```


## License

(The MIT License)

Copyright (c) 2015 Kristoffer K Larsen <kristoffer@larsen.so>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
