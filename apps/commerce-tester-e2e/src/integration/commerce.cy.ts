import {
  checkValueOfInputWithName,
  clickAutoComplete,
  getButtonWithName,
  getButtonWithText,
  getDropdownListItemWithName,
  getDropdownWithName,
  getInputWithName,
  getListRowWithText,
  getRelativeButtonWithName,
  getRelativeDropdownWithName,
  getRelativeInputWithName,
  getSendButton,
  getSubMenuWithText,
  selectPopupChoiceWithText,
} from '../support/app.po';
import {getPriceFormWithName} from "../support/commerce.po";

describe('Commerce test', () => {
  beforeEach(() => cy.visit('/'));


  it('should display Price', () => {
    cy.clearDbCollection("Online Shop").then (() => {
      cy.clearDbCollection("Product"). then (() => {

        cy.intercept('GET', '/assets/dev/templates.json').as('LoadTemplate');
        cy.intercept({hostname:'corsproxy.io'}, {
          body: RESULT_QUERY

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

        getSubMenuWithText('Online Shop').click();  // Click again as it seems sometimes the new button is not working.
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
        getInputWithName('nameInShop').type("Product 1 Name");
        getDropdownWithName('shop').click('right');
        getDropdownListItemWithName('Shop 2').click();
        getButtonWithName('FetchPrice').click();
        cy.wait('@LoadPrice');

        getButtonWithText('Select').first().click();
        checkValueOfInputWithName('cost', Intl.NumberFormat(navigator.language).format(10.99));

        getDropdownWithName('currencyCode').click('right');
        getDropdownListItemWithName('Pound Sterling - GBP').click();

        getButtonWithName("save").click();

        getListRowWithText(FormatUtils.generateMoney(10.99, "GBP"));
      });

    });
  });

/*  it('should be easy to use', () => {
    cy.clearDbCollection("Online Shop").then (() => {
      cy.clearDbCollection("Multi Product"). then (() => {
        cy.intercept('GET', '/assets/dev/templates.json', MULTI_PRODUCT_TEMPLATE
        ).as('LoadMultiTemplate');
        cy.intercept({hostname:'corsproxy.io'}, {
          body: RESULT_QUERY
        }).as('LoadPrice');

        getSubMenuWithText('Dev').click(); // Move to dev page

        cy.wait('@LoadMultiTemplate');

        clickAutoComplete('template');
        selectPopupChoiceWithText('Online Shop');
        getSendButton().click();

        clickAutoComplete('template');
        selectPopupChoiceWithText('Multi Product');
        getSendButton().click();

        getSubMenuWithText('Online Shop').click();
        getButtonWithName("new").click();
        getInputWithName('Shop').type("Shop GW");
        getDropdownWithName('Type').click("right");
        getDropdownListItemWithName('GreenWeez').click();
        getButtonWithName("save").click();
        cy.get('th[id="header-Shop"]');

        getSubMenuWithText('Online Shop').click();  // Click again as it seems sometimes the new button is not working.
        getButtonWithName("new").click();
        getInputWithName('Shop').type("Shop EP");
        getDropdownWithName('Type').click("right");
        getDropdownListItemWithName('EasyParapharmacie').click();
        getButtonWithName("save").click();

        cy.get('th[id="header-Shop"]');
        getSubMenuWithText('Dev').click(); // Move to dev page
        getSubMenuWithText('Online Shop').click();
        cy.get('th[id="header-Shop"]');
        getSubMenuWithText('Multi Product').click();

        getButtonWithName("new", 10000).click();

        const curShop = getPriceFormWithName ("Shop EP");

        getRelativeInputWithName(curShop, 'nameInShop').type("Product EP");
        getRelativeDropdownWithName (curShop, 'shop').should("have.value", 'Shop EP');
        getRelativeButtonWithName(curShop, 'FetchPrice').click();
        cy.wait('@LoadPrice');

        getButtonWithText('Select').first().click();
        checkValueOfInputWithName('cost', Intl.NumberFormat(navigator.language).format(10.99));

        getDropdownWithName('currencyCode').click('right');
        getDropdownListItemWithName('Pound Sterling - GBP').click();

        getButtonWithName("save").click();

        getListRowWithText(FormatUtils.generateMoney(10.99, "GBP"));
      });

    });
  });
*/
});

const RESULT_QUERY= {
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

};

const MULTI_PRODUCT_TEMPLATE=          [
  {
    "name": "Online Shops",
    "sequence": [
      {
        "position": "creation/entities/a",
        "type": "ADD",
        "value": {
          "name": "Online Shop"
        }
      },
      {
        "position": "creation/entities/a/fields",
        "type": "ADD",
        "value": {
          "aa": {
            "name": "Shop",
            "type": "Text"
          },
          "ab": {
            "name": "Type",
            "type": "Shop type"
          }
        }
      }
    ]
  },
  {
    "name": "Multi Product",
    "sequence": [
      {
        "position": "creation/entities/b",
        "type": "ADD",
        "value": {
          "name": "Multi Product"
        }
      },
      {
        "position": "creation/entities/b/fields",
        "type": "ADD",
        "value": {
          "aa": {
            "name": "Name",
            "type": "Text"
          },
          "ab": {
            "name": "Shop EP",
            "type": "Price"
          },
          "ac": {
            "name": "Shop GW",
            "type": "Price"
          }
        }
      }
    ]
  }
];
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
