describe('Note page', () => {
  it('should display the post', () => {
    cy.visit('/notes/code-comments')

    cy.contains('Benjamin Johnson').should('exist')

    const pageContent = {
      title: 'Code comments',
    }

    cy.contains(pageContent.title).should('exist')
    cy.get('[data-testid="SlugPage__footer"')
      .contains('2021-01-01')
      .should('exist')
    cy.get('[data-testid="SlugPage__footer"')
      .contains('Last updated')
      .should('exist')

    const tags = ['documentation', 'tech-debt', 'philosophy', 'clean-code']

    cy.wrap(tags).each($tag => {
      cy.contains(`#${$tag}`).should('exist')
    })
  })
})
