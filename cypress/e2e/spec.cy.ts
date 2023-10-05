// // Passing test
// describe('My First Test', () => {
//   it('Does not do much!', () => {
//     expect(true).to.equal(true)
//   })
// })

// // Failing test
// describe('My First Test', () => {
//   it('Does not do much!', () => {
//     expect(true).to.equal(false)
//   })
// })

describe('Landing Page', () => {
  it('should visit the landing page and fill out the questionnaire', function() {
    cy.intercept('GET', 'http://localhost:4000/api/yelp/*', {
      fixture: 'losangeles-yelp.json'
    }).as('getYelp');
    
    cy.visit('/');
    cy.contains('Get ready to plan your next adventure');
    cy.contains('Get Started').click();
    cy.url().should('eq', 'http://localhost:3000/questionnaire');

    cy.get('input:visible').type('2'); 
    cy.contains('Submit').click(); 

    cy.wait(500);
    cy.contains('Submit').scrollIntoView();

    cy.get('select[name="budget"]').select('$$');
    cy.contains('Submit').click(); 

    cy.wait(500);
    cy.contains('Submit').scrollIntoView();

    cy.get('input[placeholder="Enter location"]').type('Los Angeles, CA, USA'); 
    cy.contains('Submit').click();

    cy.wait(500);
    cy.contains('Submit').scrollIntoView();

    cy.get('input[type="date"]').first().type('2023-10-09');
    cy.contains('Submit').click();

    cy.wait(500);
    cy.contains('Submit').scrollIntoView();

    cy.get('input[type="date"]').eq(1).type('2023-10-11');
    // cy.contains('Submit').click()
    // cy.wait('@getYelp');
  });
});