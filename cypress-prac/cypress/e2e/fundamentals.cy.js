describe('template spec', () => {
  beforeEach(() => {
    cy.visit('/fundamentals');
  });

  it('passes', () => {
    // cy.get('[data-test="fundamentals-header"]').contains(
    //   /Testing fundamentals/i
    // );
    cy.getDataTest('fundamentals-header').contains(/Testing fundamentals/i);
    // cy.get('[data-test="fundamentals-header"]').should(
    //   'contain.text',
    //   'Testing Fundamentals'
    // );
    cy.getDataTest('fundamentals-header').should(
      'contain.text',
      'Testing Fundamentals'
    );
  });
  it('accordion works correctly', () => {
    cy.contains(/your tests will exist in a describe block/i).should(
      'not.be.visible'
    );
    cy.get('[data-test="accordion-item-1"] div[role="button"]').click();
    cy.contains(/your tests will exist in a describe block/i).should(
      'be.visible'
    );
    cy.get('[data-test="accordion-item-1"] div[role="button"]').click();
    cy.contains(/your tests will exist in a describe block/i).should(
      'not.be.visible'
    );
  });
});
