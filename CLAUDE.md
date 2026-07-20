# CLAUDE.md — vuetify-stepper-form

## Project Overview

`@wdns/vuetify-stepper-form` is a Vue 3 + TypeScript + Vuetify component plugin that provides a structured, customizable multi-step form. It renders a stepper layout that guides users through sequential steps with per-step form validation (vee-validate + yup/zod), conditional fields/pages, summary/review pages, and slot-based customization.

## Tech Stack

- **Framework**: Vue 3 (Composition API, `<script setup>`)
- **UI Library**: Vuetify 4
- **Language**: TypeScript (strict mode)
- **Validation**: vee-validate with yup and zod adapters
- **Package Manager**: pnpm
- **Build Tool**: Vite + Rollup
- **Testing**: Vitest (build-gate / unit) + Cypress (component + e2e)
- **Linting**: ESLint (`@wdns/eslint-config-wdns`), Stylelint (`@wdns/stylelint-config-wdns`)
- **Git Hooks**: Husky + lint-staged
- **Releases**: release-it (`.release-it.json`)
- **Node**: pinned to 24.18.0 (`.nvmrc`, `.npmrc`)

## Key File Locations

```
src/plugin/
  index.ts                    # Plugin entry — createVStepperForm() and exports
  VStepperForm.vue            # Root component
  types/index.ts              # All TypeScript types/interfaces (exported from dist)
  utils/
    globals.ts                # pluginOptionsInjectionKey
    props.ts                  # AllProps — default prop values
    emits.ts                  # emit names
  composables/
    helpers.ts                # useDeepMerge, etc.
    classes.ts                # useColumnClasses and class helpers
    bindings.ts               # prop/attr binding helpers
    navigation.ts             # step navigation logic
    validation.ts             # validation helpers
  components/
    shared/
      PageContainer.vue       # Renders a page's fields; getComponent() maps field type -> component
      PageReviewContainer.vue # Summary/review page
      FieldLabel.vue
    fields/                   # Wrappers for field types Vuetify doesn't cover 1:1
      CommonField/ VSFButtonField/ VSFCheckbox/ VSFCustom/ VSFRadio/ VSFSwitch/
  styles/
    main.scss                 # Plugin stylesheet (also copied to dist/scss)

src/plugins/                  # Docs/dev app Vuetify setup (NOT shipped in the package)
  vuetify.ts                  # createVuetify config
  theme.ts                    # dark/light theme palettes
src/stores/                   # Pinia stores for the docs app
src/documentation/            # Documentation site (App.vue, sections, examples)
src/playground/               # Playground app
```

## Field Type Resolution

`PageContainer.vue > getComponent(fieldType)` maps a field's `type` string to the underlying
component (`VTextField`, `VSelect`, `VDateInput`, `VColorInput`, the `VSF*` wrappers, etc.).
When adding a new field type, update this switch, the `types/index.ts` field-type union, and the
docs (`PropsSection.vue`).

## Build Process

```bash
pnpm build
# Runs: tsc -p tsconfig.build.json && pnpm test:build && vite build --config vite.build.config.mts
```

- `tsconfig.build.json` type-checks the shippable plugin source.
- `pnpm test:build` runs Vitest once with `--bail 1` as a pre-build gate.
- `vite.build.config.mts` builds ES + CJS formats and generates `.d.ts` via `vite-plugin-dts`.
- Types entry: `dist/plugin/types/index.d.ts` (matches `"types"` in `package.json`).
- Vuetify is marked **external** in the Rollup config (`/^vuetify($|\/.+)/`) — it is a peer, not bundled.
- CSS is injected by JS (`vite-plugin-css-injected-by-js`); `src/plugin/styles/*` is also copied to `dist/scss`.

## Testing

```bash
pnpm test:all            # Vitest, run once
pnpm test:dev            # Vitest, watch mode
pnpm test:build          # Vitest run with --bail 1 (used inside build)
pnpm cy:run              # Cypress e2e + component (headless)
pnpm cy:run:component    # Component tests only
pnpm cy:open             # Open Cypress (Chrome)
```

Tests live in `src/plugin/__tests__/` (component `*.cy.ts`, incl. `navigation/` and `slots/`),
`src/plugin/components/**/__tests__/`, and `src/plugin/composables/__tests__/`.

## Linting

```bash
pnpm lint            # ESLint (max 20 warnings)
```

- ESLint config: `eslint.config.mjs` — `@wdns/eslint-config-wdns` + typescript-eslint
- Stylelint config: `stylelint.config.js` — extends `@wdns/stylelint-config-wdns`
- Prettier config: `.prettierrc.js`

## Development & Docs

```bash
pnpm dev            # Dev server (documentation app)
pnpm play           # Playground mode
pnpm build:docs     # Build docs site into ./docs (gitignored build output)
pnpm deploy         # gh-pages -d docs  (publishes the docs site)
```

Note: `docs/` is the Vite `outDir` for the docs site and is **gitignored** — do not commit files there.

## Git / Commits

- Husky pre-commit runs lint-staged (`pnpm lint` on staged `.js/.ts/.vue`).
- Always source nvm before committing (Husky requires Node):
  `export NVM_DIR="$HOME/.nvm" && source "$NVM_DIR/nvm.sh" && nvm use`
- Conventional commit style.

## Publishing

```bash
pnpm prepublishOnly    # Runs the full build before publish
```

- Repository: GitHub — `https://github.com/webdevnerdstuff/vuetify-stepper-form`
- Homepage/docs: `https://webdevnerdstuff.github.io/vuetify-stepper-form/`

## Vuetify 4 Migration (in progress on `vuetify-v4` branch)

Target state this branch
is moving toward: Vuetify 4 (mandatory CSS layers, system default theme, MD3 typography/elevation,
non-uppercase buttons), Node 24.18.0, and the color field backed by Vuetify's native `VColorInput`
in place of the removed `@wdns/vuetify-color-field` dependency. Until the branch merges, the
`main` line still ships Vuetify 3.
