import { createSpinner } from 'nanospinner'
import fs from 'fs'
import path from 'path'
import Model from '../model/model.js'
import mongoose from 'mongoose'

const ReadElements = async (Path) => {
  try {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
    return new Promise((resolve, reject) => {
      const spinner = createSpinner('Reading your JSON files...').start()
      sleep(2000).then(() => {
        const dataList = []
        const filePath = path.join(process.cwd(), Path)
        fs.readdir(filePath, (_err, file) => {
          file.forEach((element) => {
            const dataBuffer = fs.readFileSync(filePath + '/' + element)
            const dataFormated = JSON.parse(dataBuffer)
            dataList.push(dataFormated)
            spinner.success({ text: 'JSON files ready' })
            resolve(dataList)
          })
        })
      })
    })
  } catch (error) {
    console.error(error)
  }
}

const SaveElements = async (url, data) => {
  try {
    return new Promise((resolve, reject) => {
      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
      const spinner = createSpinner('Conecting to mongoDB...').start()
      sleep(2000).then(() => {
        mongoose.connect(url, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }).then(db => spinner.success({ text: 'Database connected' }))
          .catch(_err => {
            spinner.error({ text: 'there was an error connecting to the database' })
            process.exit(1)
          })
        const dataSpinner = createSpinner('Adding and saving data...').start()
        sleep(2000).then(() => {
          data.forEach(element => {
            const dataSet = new Model(element)
            dataSet.save()
          })
          dataSpinner.success({ text: 'Data saved' })
          resolve(true)
        })
      })
    })
  } catch (error) {
    console.error(error)
  }
}

export { ReadElements, SaveElements }
