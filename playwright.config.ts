import { PlaywrightTestConfig, devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  globalSetup: require.resolve("./integration_tests/global-setup"),
  use: {
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    storageState: "storageState.json",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  testDir: "integration_tests",
  webServer: {
    command: "yarn dev -p 4000",
    port: 4000,
  },
};

export default config;
