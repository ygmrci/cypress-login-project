/// <reference types="cypress" />

describe("Login Form Testleri", () => {
  it("Başarılı form doldurulduğunda success sayfası açılıyor", () => {
    cy.visit("/");
    cy.get('[data-cy="form-email"]').type("test@test.com");
    cy.get('[data-cy="form-password"]').type("Test1234");
    cy.get('[data-cy="form-terms"]').check();

    cy.get('[data-cy="form-submit"]').should("not.be.disabled").click();
    cy.url().should("include", "/success");
    cy.get('[data-cy="success-page"]').should("be.visible");
  });

  it("Email yanlış → 1 hata mesajı + doğru hata mesajı + buton disabled", () => {
    cy.visit("/");
    cy.get('[data-cy="form-email"]').type("yanlisemail");
    cy.get('[data-cy="form-password"]').type("Test1234");
    cy.get('[data-cy="form-terms"]').check();

    cy.get('[data-cy="error-email"]').should("be.visible");
    cy.get(".error").should("have.length", 1);
    cy.get('[data-cy="form-submit"]').should("be.disabled");
  });

  it("Email + password yanlış → 2 hata mesajı + password hatası görünmeli", () => {
    cy.visit("/");
    cy.get('[data-cy="form-email"]').type("yanlisemail");
    cy.get('[data-cy="form-password"]').type("abc");
    cy.get('[data-cy="form-terms"]').check();

    cy.get(".error").should("have.length", 2);
    cy.get('[data-cy="error-password"]').should("be.visible");
    cy.get('[data-cy="form-submit"]').should("be.disabled");
  });

  it("Email + password doğru ama terms işaretlenmeden → buton disabled", () => {
    cy.visit("/");
    cy.get('[data-cy="form-email"]').type("test@test.com");
    cy.get('[data-cy="form-password"]').type("Test1234");

    cy.get('[data-cy="form-submit"]').should("be.disabled");
  });
});
