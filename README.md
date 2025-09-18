# @anygridtech/frappe-types

![npm version](https://img.shields.io/npm/v/%40anygridtech%2Ffrappe-types.svg)
![license](https://img.shields.io/badge/License-MIT-blue.svg)

> Comprehensive TypeScript definitions for the Frappe Framework’s client-side JavaScript API.

This package provides fully-typed global variables and functions commonly injected by Frappe in the browser such as `frappe`, `cur_frm`, `__`, `msgprint`, and much more, allowing you to write **modern, type-safe** custom frappe apps with confidence.

---

## 🚀 Why Use This Package?

The Frappe Framework offers a powerful client-side API — but it’s built around plain JavaScript, which comes with common issues:

- ❌ Typing mistakes (e.g. `frm.doc.customer_name` vs `frm.doc.customer_nam`)
- ❌ No clarity on the shape of API responses
- ❌ Fragile code during refactors
- ❌ Poor autocomplete and inline documentation

With `@anygridtech/frappe-types`, you get:

- ✅ Accurate autocompletion  
- ✅ Compile-time error checking  
- ✅ Inline documentation support  
- ✅ Improved code maintainability and developer experience

---

## 📦 What’s Included?

This package includes type definitions for commonly used global objects:

- `frappe`: Includes `frappe.call`, `frappe.db`, `frappe.ui.form`, `frappe.msgprint`, and more
- `cur_frm`: The current form object, including `cur_frm.doc`, `cur_frm.set_value`, `cur_frm.refresh_field`, etc.
- `__`: The translation function
- Utility functions like `msgprint`, `cstr`, `flt`, and more

> 🧩 The list is continuously expanding as new globals and patterns are added.

---

## 📥 Installation

Before installing @anygridtech/frappe-types, make sure your project is already configured for TypeScript:

Install TypeScript (if not already installed):

```bash
npm install typescript
```

It is also recommended to install jQuery types as Frappe makes use of it very often.

```bash
npm install @types/jquery
```

Initialize a tsconfig.json in your project root (if you don’t have one yet):

```bash
npx tsc --init
```

This will generate a tsconfig.json file with sensible defaults. 

> One recommended tsconfig.json file would be as below, feel free to copy it.

```json
{
  "compilerOptions": {
    "rootDir": "./ts",
    "outDir": "./js",
    "module": "ES2020",
    "target": "ES2020",
    "moduleResolution": "Node10",
    "verbatimModuleSyntax": true,
    "types": ["jquery", "@anygridtech/frappe-types"],
    "sourceMap": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noImplicitOverride": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noPropertyAccessFromIndexSignature": true,
    "removeComments": true,
    "esModuleInterop": true,
    "strict": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
  },
  "include": ["ts/**/*.ts"],
  "exclude": ["node_modules"]
}
```

> ⚠️ Important: In case typescript still can't find the global `frappe` namespace and other related entities after copying the `tsconfig.json` file, please try closing and reopening your code editor.

Install as a development dependency:

```bash
# Using npm
npm install --save-dev @anygridtech/frappe-types

# Using yarn
yarn add --dev @anygridtech/frappe-types

# Using pnpm
pnpm add -D @anygridtech/frappe-types
```

## ⚙️ Setup

> If you copied the `tsconfig.json` file provided above, you can skip the Setup part.

After installation, you need to tell TypeScript how to find and use these global type definitions. There are two primary ways to do this:

### ✅ Option 1: Explicit Import

Simply add the following import statement to a central file in your project, such as an entry point (`index.ts`, `main.ts`) or a dedicated type definition file (`globals.d.ts`):

```ts
import '@anygridtech/frappe-types';
```

### ✅ Option 2: Modifying your project's tsconfig.json file

Add `@anygridtech/frappe-types` to the `compilerOptions.types` array in your `tsconfig.json`.

```json
{
  "compilerOptions": {
    "types": [ "@anygridtech/frappe-types" ]
  }
}
```

> ⚠️ Important: When you define the types property, TypeScript stops automatically scanning for types in node_modules/@types. You must explicitly list all global type packages your project needs (like "node", "jest", "jquery", etc.). Forgetting to do so is a common cause of "Cannot find name 'process'" or similar errors.

> ⚠️ Important: In case typescript still can't find the global `frappe` namespace and other related entities after adding the `@anygridtech/frappe-types` into the `types` array, please try closing and reopening your code editor.

## 🤝 Contributing

This project is a community effort. Contributions are highly welcome!
If you find a missing or incorrect type, or want to expand the definitions, please feel free to open an issue or submit a pull request.

## 📝 License

This project is licensed under the MIT License.
