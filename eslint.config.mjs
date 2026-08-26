import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // The design handover, committed verbatim as the reference this app was
    // ported from. It is browser-Babel prototype code and a prebuilt bundle,
    // and it is not ours to lint or to fix.
    "design-system/**",
  ]),
]);

export default eslintConfig;
