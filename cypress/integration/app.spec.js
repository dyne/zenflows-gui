
describe('Authentication', () => {
  it('At sign in Should render error if mail dosent exist', () => {
    cy.viewport('macbook-13')
    cy.visit('/')
    cy.get('button').first().click()
    cy.get('input:first').type('mailmoltoimprobabilechenessunoregistramai@tt.ii')
    cy.get('button').first().click()
    cy.contains('this email doesn\'t exist')
  })
  it('should get HMAC from the server at sign in', () => {
    cy.intercept({
      method: 'POST',
      url: 'http://65.109.11.42:8000/api',
    }).as('api')
    cy.viewport('macbook-13')
    cy.visit('/')
    cy.get('button').first().click()
    cy.get('input:first').type(Cypress.env('mail'))
    cy.get('button').first().click()
    cy.wait('@api').its('response.body.data.keypairoomServer').should('include', Cypress.env('HMAC'))
  })

  it('At sign in Should render error if passhprase is != 12 words', () => {
     cy.intercept({
      method: 'POST',
      url: 'http://65.109.11.42:8000/api',
    }).as('api')
    cy.viewport('macbook-13')
    cy.visit('/')
    cy.get('button').first().click()
    cy.get('input:first').type(Cypress.env('mail'))
    cy.get('button').first().click()
    cy.wait('@api')
    cy.get('input').eq(0).type('pupu pi')
    cy.contains('Invalid pass phrase')
  })

  it('Should render error if user answer less than 3 question', () => {
    cy.intercept({
      method: 'POST',
      url: 'http://65.109.11.42:8000/api',
    }).as('api')
    cy.viewport('macbook-13')
    cy.visit('/')
    cy.get('button').eq(1).click()
    cy.get('input:first').type(Cypress.env('mail'))
    cy.get('button').first().click()
    cy.wait('@api')
    cy.get('input').eq(0).type('pupu pi')
    cy.get('button').first().click()
    cy.contains('Fill at least 2 more answer')
    cy.get('input').eq(1).type('pupu pi')
    cy.contains('Fill at least 1 more answer')
  })

  it('Should save in local storage keys at sign in via question', () => {
    cy.intercept({
      method: 'POST',
      url: 'http://65.109.11.42:8000/api',
    }).as('api')
    cy.viewport('macbook-13')
    cy.visit('/')
    cy.get('button').eq(1).click()
    cy.get('input:first').type(Cypress.env('mail'))
    cy.get('button').first().click()
    cy.wait('@api')
    cy.get('input').eq(0).type(Cypress.env('answer1'))
    cy.get('input').eq(1).type(Cypress.env('answer2'))
    cy.get('input').eq(2).type(Cypress.env('answer3'))
    cy.get('button').first().click().should(() => {
      expect(localStorage.getItem('reflow')).to.eq(Cypress.env('reflow'))
      expect(localStorage.getItem('eddsa_public_key')).to.eq(Cypress.env('eddsa_public_key'))
      expect(localStorage.getItem('eddsa_key')).to.eq(Cypress.env('eddsa_key'))
      expect(localStorage.getItem('seed')).to.eq(Cypress.env('seed'))
      expect(localStorage.getItem('schnorr')).to.eq(Cypress.env('schnorr'))
      expect(localStorage.getItem('ethereum_address')).to.eq(Cypress.env('ethereum_address'))
      expect(localStorage.getItem('eddsa')).to.eq(Cypress.env('eddsa'))
    })
  })

  it('Should save in local storage keys at sign in via passphrase', () => {
     cy.intercept({
      method: 'POST',
      url: 'http://65.109.11.42:8000/api',
    }).as('api')
    cy.viewport('macbook-13')
    cy.visit('/')
    cy.get('button').first().click()
    cy.get('input:first').type(Cypress.env('mail'))
    cy.get('button').first().click()
    cy.wait('@api')
    cy.get('input').eq(0).type(Cypress.env('seed'))
     cy.get('button').first().click().should(() => {
      expect(localStorage.getItem('reflow')).to.eq(Cypress.env('reflow'))
      expect(localStorage.getItem('eddsa_public_key')).to.eq(Cypress.env('eddsa_public_key'))
      expect(localStorage.getItem('eddsa_key')).to.eq(Cypress.env('eddsa_key'))
      expect(localStorage.getItem('seed')).to.eq(Cypress.env('seed'))
      expect(localStorage.getItem('schnorr')).to.eq(Cypress.env('schnorr'))
      expect(localStorage.getItem('ethereum_address')).to.eq(Cypress.env('ethereum_address'))
      expect(localStorage.getItem('eddsa')).to.eq(Cypress.env('eddsa'))
    })
  })
  it('Should save in local storage keys at sign up', () => {
   cy.intercept({
      method: 'POST',
      url: 'http://65.109.11.42:8000/api',
    }).as('api')
    cy.viewport('macbook-13')
    cy.visit('/')
    cy.get('a').eq(0).click()
    cy.get('input:first').type('o@d.otg')
    cy.get('input').eq(1).type('name')
    cy.get('input').eq(2).type('user')
    cy.get('button').first().click()
    cy.get('input').eq(0).type('risposta1')
    cy.get('input').eq(1).type('risposta2')
    cy.get('input').eq(2).type('risposta3')
    cy.get('button').first().click().should(() => {
      expect(localStorage.getItem('reflow')).to.be.not.null
      expect(localStorage.getItem('eddsa_public_key')).to.be.not.null
      expect(localStorage.getItem('eddsa_key')).to.be.not.null
      expect(localStorage.getItem('seed')).to.be.not.null
      expect(localStorage.getItem('schnorr')).to.be.not.null
      expect(localStorage.getItem('ethereum_address')).to.be.not.null
      expect(localStorage.getItem('eddsa')).to.be.not.null
    })
  })
})
