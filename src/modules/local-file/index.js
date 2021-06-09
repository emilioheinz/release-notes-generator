const utils = require('../../utils')

const VERSIONS_DIVISOR = '---'

module.exports = args => {
  const { file } = args

  function loadReleaseNotes() {
    console.log(utils.file.read(file)?.split(VERSIONS_DIVISOR)?.[0]?.trim?.())
  }

  loadReleaseNotes()
}
