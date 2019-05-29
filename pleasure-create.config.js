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
        type: 'checkbox',
        name: 'config',
        message: 'Distribute for',
        choices: [
          {
            name: 'cjs',
            value: 'cjs',
            checked: true
          },
          {
            name: 'esm',
            value: 'esm',
            checked: true
          },
          {
            name: 'iife',
            value: 'iife',
            checked: false
          }
        ]
      },
      {
        name: 'iifeName',
        message: 'iife module name',
        when (a) {
          return a.config.indexOf('iife') >= 0
        }
      }
    ]
  },
  transform (data) {
    const config = {}
    data.config.forEach(v => {
      config[v] = true
    })
    data.year = new Date().getFullYear()
    data.config = config
    return data
  }
}
