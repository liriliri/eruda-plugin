const inquirer = require('inquirer').default
const path = require('path')
const fs = require('fs-extra')
const { glob } = require('glob')
const trim = require('licia/trim')
const concat = require('licia/concat')
const upperFirst = require('licia/upperFirst')

const prompt = async (questions) => inquirer.prompt(questions)
const ensureDir = async (dir) => fs.ensureDir(dir)
const readdir = async (dir) =>
  await glob('**/*', { cwd: dir, dot: true, nodir: true })
const readFile = async (path) => fs.readFile(path, 'utf-8')
const writeFile = async (path, data) => fs.writeFile(path, data, 'utf-8')
;(async () => {
  let answers = await prompt([
    {
      type: 'list',
      name: 'type',
      message: 'Which template?',
      choices: ['simple', 'webpack'],
    },
    {
      name: 'name',
      message: 'Plugin name:',
    },
  ])

  let { type, name } = answers

  if (name.trim() === '') return console.log('Please enter a plugin name!')
  name = name.toLowerCase()

  let dist = path.resolve(process.cwd(), `./eruda-${name}`),
    src = path.resolve(__dirname, `./${type}`)

  await ensureDir(dist)

  let ignoreList = await readFile(path.resolve(src, './plugin.gitignore'))
  ignoreList = ignoreList
    .split(/\n/g)
    .map((p) => trim(p.trim(), '/').replace(/\//g, path.sep))
    .filter((p) => p !== '' && p !== 'node_modules')

  let files = await readdir(src)

  for (let i = 0, len = files.length; i < len; i++) {
    let file = files[i]
    let srcPath = path.resolve(src, file)

    // Make sure gitignore and npmignore aren't taking effect when published.
    file = file
      .replace('plugin.gitignore', '.gitignore')
      .replace('plugin.npmignore', '.npmignore')
    let distPath = path.resolve(dist, file.replace('plugin', name))

    for (let ignorePath of ignoreList) {
      if (srcPath.indexOf(ignorePath) > -1) return
    }

    let data = await readFile(srcPath)
    data = data
      .replace(/(eruda-)plugin/gi, `$1${name}`)
      .replace(/\bPlugin\b/g, upperFirst(name))
      .replace(/erudaPlugin/g, `eruda${upperFirst(name)}`)
      .replace(/'plugin'/g, `'${name}'`)
      .replace(/\.plugin {/g, `.${name} {`)

    await ensureDir(path.dirname(distPath))
    await writeFile(distPath, data)
  }

  console.log(`cd eruda-${name} && npm i;`)
})()
