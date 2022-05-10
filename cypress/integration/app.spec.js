describe('Navigation', () => {
  it('should contain some info or login form', () => {
    cy.visit('/')
    cy.contains(/Activity:transfer|Sign/g)
    cy.contains(/produce|Sign/g)
    cy.contains(/process|Sign/g)
  })

  it('should render a basic layout', () => {
    cy.visit('/')
    cy.get('.navbar').contains('ReflowApp')
    cy.get('.drawer').contains('processes')
  })

   it('should open a popup to produce some resource inside a process starting navigates from home', () => {
     cy.viewport('macbook-13')
    cy.visit('/')
    cy.contains('processes').click()
    cy.url().should('include', '/processes')
     cy.get('.drawer-content>ul>li>a').first().click()
     cy.url().should('include', '/processes/')
     cy.get('.drawer-content>ul>li>label').contains('Produce').click()
     cy.get('.modal-box>form>select').first().contains(/(?=.*rice)(?=.*Gown)(?=.*Soap)/).select('rice')
     cy.get('.modal-box>form>select').eq(1).select(3)
  })

})
