describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'testName2',
      username: 'testUsername2',
      password: 'test1234'
    }

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
  })

  it('login form can be opened', function() {
    cy.contains('log in').click()
  })
   
  /*it('user can login', function () {
    cy.contains('log in').click()
    cy.get('#username').type('testUsername')
    cy.get('#password').type('test1234')
    cy.get('#login-button').click()

    cy.contains('testName logged in')
  })*/

  it('login fails with wrong password', function (){
    cy.contains('log in').click()
    cy.get('#username').type('testUsername')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    //cy.get('.error').contains('wrong credentials')
    cy.get('.error').should('contain', 'Wrong credentials')
    .and('have.css', 'color', 'rgb(255, 0, 0)')
    .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'testName logged in')
  })

  describe('when logged in', function (){
    /*beforeEach(function() {
      cy.login({ username: 'testUsername', password: 'test1234'})
    })

    it('a new note can be created', function(){
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })
    */
    describe('and several notes exist', function () {

      beforeEach( function () {
        cy.createNote({ content: 'first note', important: false})
        cy.createNote({ content: 'second note', important: false})
        cy.createNote({ content: 'third note', important: false})
      })

      it('one of those can be made important', function () {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })
    })

    describe('and a note exists', function(){

      beforeEach(function () {
        cy.createNote({
          content: 'another note cypress',
          important: true
        })
      })

      it('it can be made not important', function () {
        cy.contains('another note cypress')
        .contains('make not important')
        .click()

        cy.contains('another note cypress')
        .contains('make important')
      })
    })

  })
})