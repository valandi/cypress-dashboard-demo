const { defineConfig } = require('cypress')

module.exports = defineConfig({
  fixturesFolder: false,
  chromeWebSecurity: false,
  numTestsKeptInMemory: 0,
  projectId: "icn4xp",
  
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
    },
  },
})

require('@applitools/eyes-cypress')(module)
