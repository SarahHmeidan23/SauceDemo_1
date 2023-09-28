/// <reference types= "cypress" />
Cypress.Commands.add("login", (username, password) => {
  cy.visit("https://www.saucedemo.com/");
  cy.get('[placeholder="Username"]').type(username);
  cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();
});
Cypress.Commands.add("addToCartRandomly", (count) => {
  for (let i = 0; i < count; i++) {
    // console.log("sarah")
    cy.get(".btn").eq(i).click();
  }
}); 
Cypress.Commands.add("addToCartRandomly", (count) => {
  cy.get(".inventory_item").then(($items) => {
    const itemIndices = [];
    for (let i = 0; i < $items.length; i++) {
      itemIndices.push(i);
    }
    for (let i = itemIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [itemIndices[i], itemIndices[j]] = [itemIndices[j], itemIndices[i]];
    }
    for (let i = 0; i < count; i++) {
      cy.get(".btn_small").eq(itemIndices[i]).click();
    }
  });
});
describe("test the saucedemo ", () => {
  it.skip("add all items to the cart", () => {
    cy.login("standard_user", "secret_sauce");
    // cy.login("problem_user","secret_sauce")
    // cy.login("performance_glitch_user","secret_sauce")
    //  cy.get('.btn').click({ multiple: true })
    cy.addToCart(2);
    //assertion
    cy.get(".shopping_cart_badge").invoke("text").should("include", "2");
  });
  it.skip("test the checkout", () => {
    cy.login("standard_user", "secret_sauce");
    cy.get(".btn").click({ multiple: true });
    cy.addToCart(2);
    //checkout
    cy.get(".shopping_cart_link").click();
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type("sarah");
    cy.get('[data-test="lastName"]').type("hmeidan");
    cy.get('[data-test="postalCode"]').type("1234");
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="finish"]').click();
    //assertion
    // cy.get('.complete-header').invoke("text").should("contain","!")
    cy.get(".complete-header")
      .invoke("text")
      .should("include", "Thank you for your order!");
  });
  it("add three items randomly", () => {
    cy.login("standard_user", "secret_sauce");
    cy.addToCartRandomly(3);
  });
});
