

describe('Navigation', () => {
  it('Should render a login Form. Should render index after login', () => {
    cy.visit('/')
    cy.get('form input:first').type(Cypress.env('user_name'))
    cy.get('form input:nth-child(2)').type(Cypress.env('user_password'))
    cy.get('form button').click()
    cy.contains('Process')
  })

  it('should render a basic layout', () => {
    cy.visit('/')
    cy.get('form input:first').type(Cypress.env('user_name'))
    cy.get('form input:nth-child(2)').type(Cypress.env('user_password'))
    cy.get('form button').click()
    cy.get('.navbar').contains('ReflowApp')
    cy.get('.drawer').contains('Processes')
  })

   it('should open a popup to produce some resource inside a process starting navigates from home', () => {
     cy.viewport('macbook-13')
     cy.visit('/')
     cy.get('form input:first').type(Cypress.env('user_name'))
     cy.get('form input:nth-child(2)').type(Cypress.env('user_password'))
     cy.get('form button').click()
     cy.contains('Processes').click()
     cy.url().should('include', '/processes')
     cy.get('.drawer-content>ul>li>a').first().click()
     cy.url().should('include', '/processes/')
     cy.get('.drawer-content>ul>li>label').contains('produce').click()
     cy.get('.modal-box>form>select').first().contains(/(?=.*rice)(?=.*Gown)(?=.*Soap)/).select('rice')
     cy.get('.modal-box>form>select').eq(1).select(3)
  })

  it('should render resource page', () => {
    cy.viewport('macbook-13')
    cy.visit('/')
    cy.get('form input:first').type(Cypress.env('user_name'))
    cy.get('form input:nth-child(2)').type(Cypress.env('user_password'))
    cy.get('form button').click()
    cy.contains('Resources').click()
    cy.url().should('include', '/my_inventory')
    cy.get('.drawer-content>ul>li>a').first().click()
    cy.url().should('include', '/resource/')
    cy.get('.drawer-content').contains('economicResource')
  })
})
