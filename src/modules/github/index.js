const { cardFactory } = require('../../factories')
const GithubApi = require('../../services/api')
const { filters } = require('../../utils')

module.exports = args => {
  const {
    organizationName,
    projectNumber,
    token,
    label,
    column,
    isSorted,
    repository,
    milestone,
  } = args

  const api = new GithubApi(token)

  function sortCardsByIssueNumber(cardsInfo) {
    return cardsInfo.sort((a, b) => parseFloat(a.number) - parseFloat(b.number))
  }

  function filterCards(cards) {
    return cards
      ?.filter(card => filters.byRepository(card, repository))
      .filter(card => filters.byLabel(card, label))
      .filter(card => filters.byMilestone(card, milestone))
  }

  function renderCard({ number, title }) {
    console.log(`${number} ${title}`)
  }

  function renderCards(cardsInfo) {
    let cards = filterCards(cardsInfo)

    if (isSorted) {
      cards = sortCardsByIssueNumber(cards)
    }

    cards.forEach(card => {
      renderCard(card)
    })
  }

  function getCardsInfo(cards) {
    return Promise.all(
      cards.map(async card => {
        const cardInfo = await api.getCardInfo(card.content_url)
        const { name: repoName } = await api.getCardRepositoryInfo(
          cardInfo.repository_url
        )

        return {
          ...cardFactory(cardInfo),
          repository: repoName,
        }
      })
    )
  }

  async function loadReleaseNotes() {
    const orgProjects = await api.getOrganizationProjects(organizationName)
    const filteredProject = orgProjects?.find(p => p.number === projectNumber)
    const columns = await api.getProjectColumns(filteredProject?.id)

    const filteredColumn = columns?.find(col => col.name === column)

    if (filteredColumn) {
      const { cards_url: cardsUrl } = filteredColumn
      const columnCards = await api.getColumnCards(cardsUrl)
      const cards = await getCardsInfo(columnCards)

      renderCards(cards)
    }
  }

  loadReleaseNotes()
}
