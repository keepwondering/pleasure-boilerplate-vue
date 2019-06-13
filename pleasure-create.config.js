const path = require('path')
const empty = v => {
  return /^[\s]*$/.test(v)
}

const kebabCase = str => {
  return str
    .normalize('NFD')
    // remove diacritics
    .replace(/[\u0300-\u036f]/g, '')
    // split string
    .replace(/([A-Z][a-z]+)/g, '-$1-')
    .toLowerCase()
    .replace(/[^a-z0-9-]+/ig, '-')
    .replace(/-{2,}/g, '-')
     // trim
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}
module.exports = {
  // see `inquirer.prompt` in https://github.com/SBoudrias/Inquirer.js/
  savePreset: ['author'],
  prompts (dest) {
    return [
      {
        name: 'author',
        message: 'Author name'
      },
      {
        name: 'projectName',
        message: 'Project name',
        default: path.basename(dest),
        validate (n) {
          return empty(n) ? 'Enter a valid project name' : true
        },
        filter: kebabCase,
        transformer (v) {
          return kebabCase(v)
        }
      },
      {
        name: 'iifeName',
        message: 'iife module name'
      }
    ]
  },
  transform (data) {
    data.year = new Date().getFullYear()
    return data
  }
}
