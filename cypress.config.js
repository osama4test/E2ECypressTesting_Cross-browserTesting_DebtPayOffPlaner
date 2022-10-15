const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "8y33qn",
  e2e: {
    setupNodeEvents(on, config) {

      // implement node event listeners here

      const getCompareSnapshotsPlugin = require("cypress-image-diff-js/dist/plugin");

      getCompareSnapshotsPlugin(on, config);
    },
    // baseUrl: 'http://54.39.177.218:8080/#/public/sign-in',
    specPattern: 'cypress/e2e/*.cy.ts'

  },
  video: false
});
