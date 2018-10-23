const { client, index, type } = require('./connection')

module.exports = {
  /** Query ES index for the provided term */
  queryTerm (term, offset = 0) {
    const body = {
      from: offset,
      query: { match: {
        text: {
          query: term,
          operator: 'and',
          fuzziness: 'auto'
        } } },
      highlight: { fields: { text: {} } }
    }

    return client.search({ index, type, body })
  },

  /** Get the specified range of paragraphs from a book */
  getParagraphs (bookTitle, startLocation, endLocation) {
    const startLocation = 0
    const endLocation = 100
    const filter = [
      { term: { title: bookTitle } }]
      /**{ term: { author: }}]
        range: { location: { gte: startLocation, lte: endLocation } } }*/{
    

    const body = {
      /** size: endLocation - startLocation,
      sort: { location: 'asc' },*/
      query: { bool: { filter } }
    }

    return client.search({ index, type, body })
  }
}
