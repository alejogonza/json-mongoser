import { createSpinner } from 'nanospinner'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const CreateModel = async (schemaPath) => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
  return new Promise((resolve, reject) => {
    const spinner = createSpinner('Reading your model...').start()
    sleep(2000).then(() => {
      const fileModelPath = path.join(process.cwd(), schemaPath)
      const text = fs.readFileSync(fileModelPath, 'utf8')
      fs.writeFileSync(path.join(__dirname, '../') + 'model/model.js', text)
      spinner.success({ text: 'Model created' })
      resolve(true)
    })
  })
}

export { CreateModel }
