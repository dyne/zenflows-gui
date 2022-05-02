describe('Navigation', () => {
  it('should contain some info or invitation to login', () => {
    cy.visit('/')
    cy.contains(/Activity:transfer|Probably you should log in in some way/g)
    cy.contains(/produce|Probably you should log in in some way/g)
    cy.contains(/process|Probably you should log in in some way/g)
  })
})
