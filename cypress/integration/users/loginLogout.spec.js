// Initialise empty object to store attributes on object
let fixtures = {}

// Setting every test to start from Home Page on Mobile Device
beforeEach(() => {
    // set viewport size
    cy.viewport(1024, 768)
    // Start tests from home page
    cy.visit("/")
    // adding fixture registeredUser
    cy.fixture('registeredUser.json').then((user) => {
        console.log('data from fixture:', user)
        fixtures.registeredUser = user
    })
})

// Testing to see if user can log in
describe('Test login', () => {
    it('Should go to the login page', () => {
        cy.get('[data-cy=login]').click()
        cy.url().should('include', '/login')
    })
    it('should render SignIn component', () => {
        cy.visit('/login')
        cy.get("[data-cy=loginForm]").should("be.visible")
    })
    it('can login', () => {
        cy.visit("/login")
        cy.get("[data-cy=username]").type(fixtures.registeredUser.username)
        cy.get("[data-cy=password]").type(fixtures.registeredUser.password)
        cy.get("[data-cy=loginButton]").click()
        cy.url().should("include", "/")
    })
})

// Testing to see if user can log out
describe('Logout', () => {
    it('should logout user', () => {
        cy.get("[data-cy=login]").click()
        cy.get("[data-cy=username]").type(fixtures.registeredUser.username)
        cy.get("[data-cy=password]").type(fixtures.registeredUser.password)
        cy.get("[data-cy=loginButton]").click()
        cy.get('[data-cy=logout]').click()
        cy.url().should("include", "/")
    })
})