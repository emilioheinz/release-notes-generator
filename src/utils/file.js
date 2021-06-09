const fs = require('fs')

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
}

function read(file) {
  if (fs.existsSync(file)) {
    const fileData = fs.readFileSync(file, 'utf8', () => {
      console.log(
        colors.red,
        `An error ocurred while reading ${file}.`,
        colors.reset
      )
      return process.exit(1)
    })

    return fileData
  }

  console.log(colors.red, `File "${file}" not found.`, colors.reset)
  return process.exit(1)
}

module.exports = {
  read,
}
