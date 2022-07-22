

describe('Navigation', () => {
  it('Should render a login Form. Should render index after login', () => {
    cy.visit('/')
    cy.get('form input:first').type(Cypress.env('user_name'))
    cy.get('form input[placeholder="Type your password"]').type(Cypress.env('user_password'))
    cy.get('form button').click()
    cy.contains('Process')
  })

  it('should render a basic layout', () => {
    cy.visit('/')
    cy.get('form input:first').type(Cypress.env('user_name'))
    cy.get('form input[placeholder="Type your password"]').type(Cypress.env('user_password'))
    cy.get('form button').click()
    cy.get('.navbar')
    cy.get('.drawer').contains('Processes')
  })

   it('should open a popup to produce some resource inside a process starting navigates from home', () => {
     cy.viewport('macbook-13')
     cy.visit('/')
     cy.get('form input:first').type(Cypress.env('user_name'))
     cy.get('form input[placeholder="Type your password"]').type(Cypress.env('user_password'))
     cy.get('form button').click()
     cy.contains('Processes').click()
     cy.url().should('include', '/processes')
     cy.get('.flex.flex-row.items-center.w-full.pl-3.text-left').contains('Process').click()
     cy.url().should('include', '/processes')
     cy.wait(12000)
     cy.get('th>a').first().click()
     cy.url().should('include', '/processes/')
     cy.get('.btn.modal-button.text-normal.font-medium.normal-case').first().click()
     cy.get('form>h2').contains('Produce a resource')
  })

  it('should render resource page', () => {
    cy.viewport('macbook-13')
    cy.visit('/')
    cy.get('form input:first').type(Cypress.env('user_name'))
    cy.get('form input[placeholder="Type your password"]').type(Cypress.env('user_password'))
    cy.get('form button').click()
    cy.contains('Resources').click()
    cy.url().should('include', '/my_inventory')
    cy.get('td').eq(1).click()
    cy.url().should('include', '/resource/')
    cy.get('.drawer-content').contains('Material passport')
  })

})
