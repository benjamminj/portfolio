export {}

describe('Notes list page', () => {
  it('should show the list of notes', () => {
    cy.visit('/notes')

    cy.contains('Benjamin Johnson').should('exist')
    cy.get('[href^="/notes/"]').should('have.length.gt', 0)
  })

  it('should be blocked from search engine indexing', () => {
    cy.visit('/notes')
    cy.get('meta[name="robots"]').should('have.attr', 'content', 'noindex')
  })
})
