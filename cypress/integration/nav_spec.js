describe("Navigation", () => {
  it("has clickable navigation links", () => {
    cy.visit("/")

    cy.get("nav a").contains("Verk").click()
    cy.url().should("include", "/projects")

    cy.visit("/")

    cy.get("nav a").contains("Fréttir").click()
    cy.url().should("include", "/news")

    cy.visit("/")

    cy.get("nav a").contains("Stofan").click()
    cy.url().should("include", "/about")
  })
})
