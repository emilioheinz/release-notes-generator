const axios = require('axios')

const api = axios.create({
  headers: {
    Accept: [
      'application/vnd.github.inertia-preview+json',
      'application/vnd.github.v3+json',
    ],
  },
})

module.exports = api
