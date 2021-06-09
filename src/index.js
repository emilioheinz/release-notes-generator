#!/usr/bin/env node
/* eslint-disable no-unused-expressions */
const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')
const { OPTIONS_CONFIG } = require('./constants')
const loadReleaseNotesFromGitHub = require('./modules/github')
const loadReleaseNotesFromFile = require('./modules/local-file')

yargs(hideBin(process.argv))
  .command(
    'withGitHub',
    'Generates release notes from GitHub',
    _yargs => {
      _yargs
        .option('organizationName', OPTIONS_CONFIG.ORGANIZATION_NAME)
        .option('projectNumber', OPTIONS_CONFIG.PROJECT_NUMBER)
        .option('token', OPTIONS_CONFIG.TOKEN)
        .option('label', OPTIONS_CONFIG.LABEL)
        .option('isSorted', OPTIONS_CONFIG.IS_SORTED)
        .option('column', OPTIONS_CONFIG.COLUMN)
        .option('repository', OPTIONS_CONFIG.REPOSITORY)
        .option('milestone', OPTIONS_CONFIG.MILESTONE)
        .help().argv
    },
    loadReleaseNotesFromGitHub
  )
  .command(
    'withLocalFile',
    'Generates release notes from a local file',
    _yargs => {
      _yargs.option('file', OPTIONS_CONFIG.FILE).help().argv
    },
    loadReleaseNotesFromFile
  )
  .usage('Usage: rng <command> [options]')
  .help().argv
