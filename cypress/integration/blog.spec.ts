export {}

describe('Blog list page', () => {
  it('should show the list of articles', () => {
    Cypress.on('window:before:load', win => {
      cy.spy(win.console, 'error')
    })

    cy.visit('/writing')

    cy.contains('Benjamin Johnson').should('exist')

    cy.get('[data-testid="PostListItem__title"]').should('have.length.gt', 0)
    cy.window().then(win => {
      expect(win.console.error).to.have.callCount(0)
    })
  })
})
