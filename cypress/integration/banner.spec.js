/// <reference types="cypress" />

const waitOnAPIs = () => {
  cy.wait('@cluster-api');
};

describe('Banner', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.intercept(Cypress.env('VITE_API_HOST') + '/api/v1/cluster*', {
      fixture: 'cluster.json',
    }).as('cluster-api');
  });

  it('should show banner', () => {
    waitOnAPIs();

    cy.get('[data-cy=banner]').should('be.visible');
  });
});
