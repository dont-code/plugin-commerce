import {
  checkValueOfInputWithName,
  clickAutoComplete, getButtonWithName, getButtonWithText,
  getContentArea, getDivWithId,
  getDropdownListItemWithName,
  getDropdownWithName,
  getInputWithName, getListRowWithText,
  getSendButton,
  getSubMenuWithText, getValueOfInputWithName,
  selectPopupChoiceWithText,
} from '../support/app.po';

describe('Commerce test', () => {
  beforeEach(() => cy.visit('/'));

  /*
  it('should display Price', () => {
    cy.clearDbCollection("Online Shop").then (() => {
      cy.clearDbCollection("Product"). then (() => {

        cy.intercept('GET', '/assets/dev/templates.json').as('LoadTemplate');
        cy.intercept({hostname:'corsproxy.io'}, {
          body:
            {
              "results": [
                {
                  "hits": [
                    {
                      "name": "Détoxifiant Hépatique Desmodium, Chardon Marie 20 Ampoules Arkofluides Arkopharma",
                      "url": "https://www.easypara.fr/arkofluides-detoxifiant-hepatique-20-ampoules.html",
                      "image_url": "https://www.easypara.fr/media/catalog/product/cache/500698179a37c83eaf5d7bed656e45f3/9/1/91293.jpg",
                      "ean_code": 3578835500752,
                      "price": {
                        "EUR": {
                          "default": 10.99,
                        }
                      }
                    },
                    {
                      "name": "Chardon Marie 60 Gelules Naturactive",
                      "url": "https://www.easypara.fr/naturactive-chardon-marie-60-gelules.html",
                      "image_url": "https://www.easypara.fr/media/catalog/product/cache/500698179a37c83eaf5d7bed656e45f3/3/8/38135.jpg",
                      "ean_code": 3700026996703,
                      "price": {
                        "EUR": {
                          "default": 9.8,
                        }
                      }
                    }
                  ]
                }
              ]

            }
        }).as('LoadPrice');

        getSubMenuWithText('Dev').click(); // Move to dev page

        cy.wait('@LoadTemplate');

        clickAutoComplete('template');
        selectPopupChoiceWithText('Online Shop');
        getSendButton().click();

        clickAutoComplete('template');
        selectPopupChoiceWithText('Product Price');
        getSendButton().click();

        getSubMenuWithText('Online Shop').click();
        getButtonWithName("new").click();
        getInputWithName('Shop').type("Shop 1");
        getDropdownWithName('Type').click("right");
        getDropdownListItemWithName('GreenWeez').click();
        getButtonWithName("save").click();
        cy.get('th[id="header-Shop"]');

        getButtonWithName("new").click();
        getInputWithName('Shop').type("Shop 2");
        getDropdownWithName('Type').click("right");
        getDropdownListItemWithName('EasyParapharmacie').click();
        getButtonWithName("save").click();

        cy.get('th[id="header-Shop"]');
        getSubMenuWithText('Dev').click(); // Move to dev page
        getSubMenuWithText('Online Shop').click();
        cy.get('th[id="header-Shop"]');
        getSubMenuWithText('Product').click();

        getButtonWithName("new").click();
        getInputWithName('Name').type("Product 1");
        getInputWithName('productName').type("Product 1 Name");
        getDropdownWithName('shop').click('right');
        getDropdownListItemWithName('Shop 2').click();
        getButtonWithName('FetchPrice').click();
        cy.wait('@LoadPrice');

        getDivWithId('Price-select').find('Button').first().click();
        checkValueOfInputWithName('cost', Intl.NumberFormat(navigator.language).format(10.99));

        getDropdownWithName('currencyCode').click('right');
        getDropdownListItemWithName('Pound Sterling - GBP').click();

        getButtonWithName("save").click();

        getListRowWithText(FormatUtils.generateMoney(10.99, "GBP") + ' (Shop 2)');
      });

    });
  });*/

});

export class FormatUtils {
  public static generateMoney(amount: number, currencyCode: string): string {
    let ret = Intl.NumberFormat(navigator.language, {style: 'currency', currency: currencyCode}).format(amount);

    // Replace nbsps with space
    ret = ret.replace("\u00a0", " ");
    ret = ret.replace("\u202F", " ");
    /*   const chars=[];
       for (let i=0;i<ret.length;i++) {
         chars.push(ret.charCodeAt(i));
       }
       console.log("Checked:",ret, ...chars);*/
    return ret;
  }
}
