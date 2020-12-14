describe('Tags page', () => {
  it('should show the writings associated with a tag', () => {
    const tag = 'javascript'
    cy.visit(`/tags/${tag}`)
    cy.contains('Benjamin Johnson').should('exist')

    cy.get('*:not(a)')
      .contains(`#${tag}`)
      .should('have.length', 1)

    cy.get('[href^="/blog/"]').then($blogLinks => {
      expect($blogLinks).to.have.length.greaterThan(0)

      cy.findAllByRole('link', { name: `#${tag}` }).then($tagLinks => {
        expect($tagLinks.length).to.eq($blogLinks.length)
      })
    })
  })
})
