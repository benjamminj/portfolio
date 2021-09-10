export {}
describe('Home page', () => {
  it('should display the home page', () => {
    cy.visit('/')
    cy.contains('Benjamin Johnson').should('exist')

    const navigationLinks = [
      ['github', 'https://github.com/benjamminj'],
      ['writing', '/writing'],
      ['contact', 'mailto:benjamin.d.johnson@icloud.com'],
    ]

    cy.wrap(navigationLinks).each(($link: string[]) => {
      const [$name, $url] = $link
      cy.contains($name).should('have.attr', 'href', $url)
    })
  })
})
