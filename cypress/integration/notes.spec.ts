export {}

describe('Notes list page', () => {
  it('should show the list of blog articles', () => {
    Cypress.on('window:before:load', win => {
      cy.spy(win.console, 'error')
    })

    cy.visit('/notes')

    cy.contains('Benjamin Johnson').should('exist')
    cy.get('[href^="/notes/"]').should('have.length.gt', 0)
    cy.window().then(win => {
      expect(win.console.error).to.have.callCount(0)
    })
  })

  it('should be blocked from search enginge indexing', () => {
    cy.visit('/notes')
    cy.get('meta[name="robots"]').should('have.attr', 'content', 'noindex')
  })
})
