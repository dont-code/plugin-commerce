import {
  clickAutoComplete,
  getContentArea,
  getDropdownListItemWithName,
  getDropdownWithName,
  getInputWithName,
  getSendButton,
  getSubMenuWithText,
  selectPopupChoiceWithText,
} from '../support/app.po';

describe('Commerce test', () => {
  beforeEach(() => cy.visit('/'));

  it('should display Price', () => {
    cy.intercept('GET', '/assets/dev/templates.json').as('LoadTemplate');
    getSubMenuWithText('Dev').click(); // Move to dev page

    cy.wait('@LoadTemplate');
    clickAutoComplete('template');
    selectPopupChoiceWithText('Test Price');
    getSendButton().click();
    getSubMenuWithText('Product').click();

    getInputWithName('Name').type("Product 1");
    getInputWithName('Price').type("123");

    getDropdownWithName('currencyCode').click();
    getDropdownListItemWithName('Pound Sterling GBP').click();

  });

});
