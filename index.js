#!/usr/bin/env node
import chalk from 'chalk'
import gradient from 'gradient-string'
import chalkAnimation from 'chalk-animation'
import figlet from 'figlet'
import path from 'path'
import { fileURLToPath } from 'url'
import inquirer from 'inquirer'
import {
  dirValidate,
  mongoConectionValidate,
  CreateModel,
  ReadElements,
  SaveElements
} from './services/index.js'
import Model from './model/model.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rainbow = chalkAnimation.rainbow('Created by: alejogonza <3 \n')

figlet('JSON-MONGOSER', (_err, data) => {
  console.log(gradient.pastel.multiline(data) + '\n')
  console.log(chalk.bgGreen('Version:') + ' 2.0.0\n')
  rainbow.start()
})

const start = async () => {
  try {
    const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms))
    await sleep().then(() => {
      rainbow.stop()
      console.clear()
    })
    if (process.argv.includes('-h')) {
      console.log(chalk.bgBlueBright('OPTIONS:\n'))
      console.log(chalk.green('-h:') + ' get help\n')
      console.log(chalk.green('-v:') + ' get version\n')
      console.log(chalk.green('-d:') + ' path to JSON files directory\n')
      console.log(chalk.green('-c:') + ' url to connect mongoDB and create the collections\n')
      console.log(chalk.green('-m:') + ' directory path to add your mongoose model\n')
      console.log(chalk.bgCyanBright('USAGE:\n'))
      console.log(chalk.bold('set model:') + ' json-mongoser -m YOUR_PATH\n')
      console.log(chalk.bold('save data:') + ' json-mongoser -d YOUR_PATH -c MONGOURL_CONNECTION\n')
      console.log(chalk.bgYellowBright('README:') + ' https://github.com/alejogonza/json-mongoser/blob/main/README.md\n')
      process.exit(0)
    }
    if (process.argv.includes('-v')) {
      console.log(chalk.bgGreen('Version:') + ' 2.0.0\n')
      process.exit(0)
    }
    if (process.argv.includes('-m')) {
      const getModelArg = process.argv[process.argv.findIndex(item => item === '-m') + 1]
      if (!dirValidate(getModelArg)) {
        console.log(chalk.red('ERROR:'), '-m argument is an invalid path or no exist.\n')
      } else {
        await CreateModel(getModelArg)
        chalkAnimation.karaoke('model saved successfully :)')
        await sleep(3000).then(() => {
          process.exit(0)
        })
      }
    } else {
      if (process.argv.includes('-d') && process.argv.includes('-c')) {
        const getFilesArg = process.argv[process.argv.findIndex(item => item === '-d') + 1]
        const getConnectArg = process.argv[process.argv.findIndex(item => item === '-c') + 1]

        if (!dirValidate(getFilesArg)) console.log(chalk.red('ERROR:'), '-d argument is an invalid path or no exist.\n')
        if (!mongoConectionValidate(getConnectArg)) console.log(chalk.red('ERROR:'), '-c argument is not a valid url for mongoDB connection.\n')

        if (!dirValidate(getFilesArg) || !mongoConectionValidate(getConnectArg)) {
          process.exit(0)
        } else {
          if (Model() !== 'model') {
            const modelPath = path.join(__dirname, '../') + 'model/model.js'
            const answers = await inquirer.prompt({
              name: 'model',
              type: 'list',
              message: `it looks like you already have a model loaded\n you can see it here: ${modelPath}\n ¿do you want to use it?\n`,
              choices: [
                'yes',
                'no'
              ]
            })
            if (answers.model === 'yes') {
              console.clear()
              const data = await ReadElements(getFilesArg)
              const saved = await SaveElements(getConnectArg, data)
              if (saved) {
                chalkAnimation.karaoke('All json files saved successfully :)')
                await sleep(3000).then(() => {
                  process.exit(0)
                })
              }
            } else {
              const pathRequest = await inquirer.prompt({
                name: 'path',
                type: 'input',
                message: 'enter the model path:'
              })
              if (dirValidate(pathRequest.path)) {
                console.clear()
                await CreateModel(pathRequest.path)
                const messageModel = chalkAnimation.karaoke('model saved successfully :)')
                await sleep(3000).then(() => {
                  messageModel.stop()
                  console.clear()
                })
                const data = await ReadElements(getFilesArg)
                const saved = await SaveElements(getConnectArg, data)
                if (saved) {
                  chalkAnimation.karaoke('All json files saved successfully :)')
                  await sleep(3000).then(() => {
                    process.exit(0)
                  })
                }
              } else {
                console.log(chalk.red('ERROR:'), 'model no exist. Use -h for help.\n')
              }
            }
          } else {
            console.log(chalk.red('ERROR:'), 'model no exist. Use -h for help.\n')
          }
        }
      } else {
        if (!process.argv.includes('-d')) console.log(chalk.red('ERROR:'), '-d argument is missing. Use -h for help.\n')
        if (!process.argv.includes('-c')) console.log(chalk.red('ERROR:'), '-c argument is missing. Use -h for help.\n')
        process.exit(0)
      }
    }
  } catch (error) {
    console.error(error)
  }
}

start()
