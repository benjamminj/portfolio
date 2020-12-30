describe('Post page', () => {
  it('should display the post', () => {
    cy.visit('/blog/mocking-fetch')

    cy.contains('Benjamin Johnson').should('exist')

    const pageContent = {
      title: 'Mocking the fetch API with Jest',
      description: `Why should we mock the network? We'll take a look at why it's important to mock window.fetch and a couple methods we can use in our test suites.`,
      imageAlt: `Abstract swirling colors of blue and red`,
    }

    // Validate metadata
    const metaContent = [
      ['name', 'author', 'Benjamin Johnson'],
      ['name', 'description', pageContent.description],
      ['name', 'twitter:card', 'summary'],
      ['name', 'twitter:site', '@benjamminj'],
      ['name', 'twitter:title', pageContent.title],
      ['name', 'twitter:creator', '@benjamminj'],
      ['property', 'og:title', pageContent.title],
      ['property', 'og:description', pageContent.description],
      ['name', 'twitter:image:alt', pageContent.imageAlt],
      ['property', 'og:image:alt', pageContent.imageAlt],
      ['property', 'og:type', 'website'],
    ]

    cy.wrap(metaContent).each(($meta: string[]) => {
      const [$key, $name, $content] = $meta
      cy.get(`meta[${$key}="${$name}"]`).should(
        'have.attr',
        'content',
        $content
      )
    })

    cy.contains(pageContent.title).should('exist')
    cy.get('[data-testid="SlugPage__footer"')
      .contains('2020-12-30')
      .should('exist')
    cy.get('[data-testid="SlugPage__footer"')
      .contains('Last updated')
      .should('exist')

    const tags = ['testing', 'javascript', 'jest']

    cy.wrap(tags).each($tag => {
      cy.contains(`#${$tag}`)
        .invoke('attr', 'href')
        .should('eq', `/tags/${$tag}`)
    })
  })
})
