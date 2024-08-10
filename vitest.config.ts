/// <reference types="vitest" />

// Configure Vitest (https://vitest.dev/config/)

import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        /* Uses global to avoid globals imports (describe, test, expect): */
        globals: true,
    },
});
