describe('Blog list page', () => {
  it('should show the list of blog articles', () => {
    Cypress.on('window:before:load', win => {
      cy.spy(win.console, 'error')
    })

    cy.visit('/blog')

    cy.contains('benjaminjohnson.me').should('exist')
    cy.get('[href^="/blog/"]').should('have.length.gt', 0)
    cy.window().then(win => {
      expect(win.console.error).to.have.callCount(0)
    })
  })
})
