const vuedoc = require('@vuedoc/md')
const path = require('path')
const options = {
  filename: path.join(__dirname, '../src/components/hello-world.vue')
}

vuedoc.md(options)
  .then((document) => console.log(document))
  .catch((err) => console.error(err))
