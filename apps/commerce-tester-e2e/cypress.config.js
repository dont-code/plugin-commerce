const { defineConfig } = require('cypress')

module.exports = defineConfig({
  "fileServerFolder": ".",
  "fixturesFolder": "./src/fixtures",
  "modifyObstructiveCode": false,
  "video": true,
  "videosFolder": "../../dist/cypress/apps/commerce-tester-e2e/videos",
  "screenshotsFolder": "../../dist/cypress/apps/commerce-tester-e2e/screenshots",
  "chromeWebSecurity": false,
  "defaultCommandTimeout": 10000,
  e2e: {
    setupNodeEvents(on, config) {},
    specPattern: './src/integration/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: './src/support/index.ts'
  },
})
