const inquirer = require('inquirer');

async function prompt(questions) {
    return inquirer.prompt(questions);
}

(async () => {
    let answers = await prompt([
        {
            type: 'list',
            name: 'type',
            message: 'Which template?',
            choices: [
                'simple',
                'webpack'
            ]
        },
        {
            name: 'name',
            message: 'Plugin name:'
        }
    ]);

    console.log(answers);
})();