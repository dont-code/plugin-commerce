export const getPriceFormWithName = (name:string ) =>
  cy.contains( 'label', name).parent();
