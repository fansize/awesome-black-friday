import { defineConfig } from "cf/config";

export default defineConfig({
  accountId: "1b274046e2cd493b06953fe9fafe1fc2",
  worker: {
    name: "blackfriday-deals",
    compatibilityDate: "2026-10-29",
    workersDev: true,
    domains: ["blackfriday.langtangs.com"],
    assets: { notFoundHandling: "404-page" },
  },
});
