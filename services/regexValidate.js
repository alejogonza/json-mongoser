import fs from 'fs'
import path from 'path'

const dirValidate = (dir) => {
  const fileModelPath = path.join(process.cwd(), dir)
  return fs.existsSync(fileModelPath)
}

const mongoConectionValidate = (mongoConection) => {
  const patern = /^mongodb:\/\/(?:(?:(\w+)?:(\w+)?@)|:?@?)((?:[\w.-])+)(?::(\d+))?(?:\/([\w-]+))?(?:\?([\w-]+=[\w-]+(?:&[\w-]+=[\w-]+)*)?)?$/

  const regex = patern.test(mongoConection)
  return regex
}

export { dirValidate, mongoConectionValidate }
