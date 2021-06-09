const CONSTANTS = {
  NONE: '__NONE__',
  OPTIONS_CONFIG: {
    ORGANIZATION_NAME: {
      alias: 'o',
      type: 'string',
      description:
        'The name of the organization in which the project is stored.',
      demandOption: 'Please provide a valid organizationName.',
    },
    PROJECT_NUMBER: {
      alias: 'p',
      type: 'number',
      description: 'You can find the project number in the URL on Github',
      demandOption: 'Please provide a valid projectNumber.',
    },
    TOKEN: {
      alias: 't',
      type: 'string',
      description: 'A personal GitHub token with access to the project.',
      demandOption: 'Please provide a valid Github personal token.',
    },
    LABEL: {
      alias: 'l',
      type: 'string',
      description: 'Define label to filter cards',
    },
    IS_SORTED: {
      alias: 's',
      type: 'boolean',
      description: 'Sort by issue number.',
    },
    COLUMN: {
      alias: 'c',
      type: 'string',
      description: 'Column name from where cards will be taken.',
      demandOption: 'Please provide a valid Github project Column.',
    },
    REPOSITORY: {
      alias: 'r',
      type: 'string',
      description: 'Filter cards by the associated repository.',
    },
    MILESTONE: {
      alias: 'm',
      type: 'string',
      description: 'Define a milestone to filter cards.',
    },
    FILE: {
      alias: 'f',
      type: 'string',
      description: 'The path to the file where the changelog is located.',
      demandOption: 'Please provide a valid path.',
      default: 'CHANGELOG.md',
    },
  },
}

module.exports = CONSTANTS
