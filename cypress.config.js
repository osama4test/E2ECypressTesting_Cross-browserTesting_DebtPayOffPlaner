const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://54.39.177.218:8080/#/public/sign-in',
    specPattern: 'cypress/e2e/*.cy.ts'

  },
});
