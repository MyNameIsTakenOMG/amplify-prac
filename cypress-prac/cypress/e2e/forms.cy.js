describe('forms tests', () => {
  beforeEach(() => {
    cy.visit('/forms');
  });

  it('test subscribe form', () => {
    cy.contains(/testing forms/i);
    cy.getDataTest('subscribe-form').find('input').as('subscribe-input');
    cy.get('@subscribe-input').type('test@test.com');
    cy.getDataTest('subscribe-button').click();
    cy.contains(/^successfully subbed:/i).should('exist');
    cy.wait(3000);
    cy.contains(/^successfully subbed:/i).should('not.exist');

    cy.get('@subscribe-input').type('test@test.io');
    cy.contains(/invalid email/i).should('not.exist');
    cy.getDataTest('subscribe-button').click();
    cy.contains(/invalid email/i).should('exist');
    cy.wait(3000);

    cy.getDataTest('subscribe-button').click();
    cy.contains(/fail/i).should('exist');
  });
});
