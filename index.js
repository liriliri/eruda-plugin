const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs-extra');

const util = require('./util'); 

const prompt = async questions => inquirer.prompt(questions);
const ensureDir = async dir => fs.ensureDir(dir);
const readdir = async dir => fs.readdir(dir);
const readFile = async path => fs.readFile(path, 'utf-8');
const writeFile = async (path, data) => fs.writeFile(path, data, 'utf-8');

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

    let {type, name} = answers;

    if (name.trim() === '') return console.log('Please enter a plugin name!');
    name = name.toLowerCase();
    
    let dist = path.resolve(process.cwd(), `./eruda-${name}`),
        src = path.resolve(__dirname, `./${type}`);

    await ensureDir(dist);

    let ignoreList = await readFile(path.resolve(src, './.gitignore'));
    ignoreList = ignoreList.split(/\n/g)
                           .map(p => util.trim(p.trim(), '/').replace(/\//g, path.sep))
                           .filter(p => p !== '');
    
    let files = await readdir(src);

    await files.forEach(async (file) => 
    {
        let srcPath = path.resolve(src, file),
            distPath = path.resolve(dist, file.replace('plugin', name));
        
        for (let ignorePath of ignoreList) 
        {
            if (srcPath.indexOf(ignorePath) > -1) return;
        }

        let data = await readFile(srcPath);
        data = data.replace(/(eruda-)plugin/ig, `$1${name}`)
                   .replace(/\bPlugin\b/g, util.upperFirst(name))
                   .replace(/erudaPlugin/g, `eruda${util.upperFirst(name)}`)
                   .replace(/'plugin'/g, `'${name}'`);

        await writeFile(distPath, data);
    });

    console.log(`cd eruda-${name} && npm i;`);
})();