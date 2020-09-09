describe("Navigation", () => {
  it("has clickable navigation links", () => {
    cy.visit("/")

    cy.findByTestId("project_nav").click()
    cy.url().should("include", "/projects")

    cy.visit("/")
    cy.findByTestId("news_nav").click()
    cy.url().should("include", "/news")

    cy.visit("/")
    cy.findByTestId("about_nav").click()
    cy.url().should("include", "/about")

    cy.visit("/")
  })
})
