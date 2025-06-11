import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import stylistic from "@stylistic/eslint-plugin";
import pluginImportSort from "eslint-plugin-simple-import-sort";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "@stylistic": stylistic,
      "simple-import-sort": pluginImportSort
    },
    rules: {
      "@stylistic/indent": ["error", 2],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/array-bracket-spacing": ["error", "never"],
      "@stylistic/block-spacing": "error",
      "@stylistic/arrow-spacing": "error",
      "@stylistic/lines-around-comment": ["error", { "beforeBlockComment": true }],
      "@stylistic/comma-dangle": ["error", "never"],
      "@stylistic/eol-last": ["error", "always"],
      "@stylistic/no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
      "@stylistic/no-confusing-arrow": "error",
      "arrow-body-style": ["error", "as-needed"],
      "object-curly-spacing": ["error", "always"],
      "comma-spacing": ["error", { "before": false, "after": true }],
      "no-console": ["warn", { "allow": ["warn", "error"] }],
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // 1. Side effect imports
            ["^\\u0000"],
            // 2. Built-in Node.js modules
            ["^node:", `^(${[
              "assert", "buffer", "child_process", "cluster", "console", "constants", "crypto", "dgram",
              "dns", "domain", "events", "fs", "http", "https", "module", "net", "os", "path", "perf_hooks",
              "process", "punycode", "querystring", "readline", "repl", "stream", "string_decoder",
              "timers", "tls", "tty", "url", "util", "v8", "vm", "zlib"
            ].join("|")})(/|$)`],
            // 3. Third-party packages (npm)
            ["^react", "^@?\\w"],
            // 4. Aliases como @meet/*
            ["^@dentist(/.*|$)"],
            // 5. Internos relativos
            ["^\\."]
          ]
        }
      ],
      "simple-import-sort/exports": "error"
    }
  }
];

export default eslintConfig;
