#!/usr/bin/env node
const api = require("./services/api/index.js");
const yargs = require("yargs");
const {hideBin} = require("yargs/helpers");

const {organizationName, projectNumber, token, label, column, isSorted} = yargs(
  hideBin(process.argv)
)
  .option("organizationName", {
    alias: "o",
    type: "string",
    description: "The name of the organization in which the project is stored.",
    demandOption: "Please provide a valid organizationName.",
  })
  .option("projectNumber", {
    alias: "p",
    type: "number",
    description: "You can find the project number in the URL on Github",
    demandOption: "Please provide a valid projectNumber.",
  })
  .option("token", {
    alias: "t",
    type: "string",
    description: "A personal GitHub token with access to the project.",
    demandOption: "Please provide a valid Github personal token.",
  })
  .option("label", {
    alias: "l",
    type: "string",
    description: "Define label to filter cards.",
  })
  .option("isSorted", {
    alias: "s",
    type: "boolean",
    description: "Sort by issue number.",
  })
  .option("column", {
    alias: "c",
    type: "string",
    description: "Column name from where cards will be taken.",
  }).argv;

const runtimeHeaders = {
  Authorization: `token ${token}`,
};

function sortCardsByIssueNumber(cardsInfo) {
  return cardsInfo.sort((a, b) => {
    if (a.number > b.number) {
      return 1;
    }
    if (a.number < b.number) {
      return -1;
    }
    return 0;
  });
}

function renderCardsInfo(cardsInfo) {
  let cards = cardsInfo;
  if (isSorted) {
    cards = sortCardsByIssueNumber(cards);
  }

  cards.forEach((card) => {
    renderCard(card);
  });
}

function renderCard({number, title}) {
  console.log(`#${number} ${title}`);
}

function getCardsInfo(cards) {
  return Promise.all(
    cards.map(async (card, i) => {
      const {data: cardInfo} = await api.get(card.content_url, {
        headers: runtimeHeaders,
      });

      if (!label) {
        return {number: cardInfo.number, title: cardInfo.title};
      }

      const hasLabel = cardInfo.labels.some(
        (e) => e.name.toLowerCase() === label.toLowerCase()
      );

      if (hasLabel) {
        return {number: cardInfo.number, title: cardInfo.title};
      }
    })
  );
}

async function loadReleaseNotes() {
  const {data: orgProjects} = await api.get(
    `https://api.github.com/orgs/${organizationName}/projects`,
    {
      headers: runtimeHeaders,
    }
  );

  const filteredProject = orgProjects.find((p) => p.number === projectNumber);

  const {data: columns} = await api.get(
    `https://api.github.com/projects/${filteredProject.id}/columns`,
    {
      headers: runtimeHeaders,
    }
  );

  const filteredColumn = columns.find((col) => col.name === column);

  const {cards_url} = column ? filteredColumn : columns[0];

  const {data: cards} = await api.get(`${cards_url}?per_page=100`, {
    headers: runtimeHeaders,
  });

  getCardsInfo(cards).then((cardsInfo) => {
    renderCardsInfo(cardsInfo);
  });
}

loadReleaseNotes();
