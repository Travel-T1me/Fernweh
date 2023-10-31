import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    env: {
      API_URL: "http://localhost:4000", // Development API URL
      CYPRESS_ENV: "development", // Environment flag
    },
    baseUrl: "http://localhost:3000", // Development URL
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
  },
});