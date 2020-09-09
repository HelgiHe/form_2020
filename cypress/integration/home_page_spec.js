describe("The Home Page", () => {
  it("successfully loads", () => {
    cy.visit("/")
  })
})

describe("The Home Page", () => {
  it("has a carousel with clickable navigational buttons", () => {
    cy.visit("/")
    cy.get(".slick-slider").should("exist")

    cy.get(".slick-next").click()
    cy.wait(300)
    cy.get(".slick-prev").click()
  })
})
