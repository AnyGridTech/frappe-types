<h1 align="center">
  🚀 Frappe Typescript
</h1>

<p align="center">
  <a href="" rel="noopener">
    <img width=200px height=200px src="LOGO.png" alt="Project logo">
  </a>
</p>

<h3 align="center">@anygridtech/frappe-types</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center">
Comprehensive TypeScript definitions for the Frappe Framework’s client-side JavaScript API.  
This package provides fully-typed global variables and functions commonly injected by Frappe in the browser such as <strong>frappe</strong>, <strong>cur_frm</strong>, <strong>__</strong>, <strong>msgprint</strong>, and much more, allowing you to write modern, type-safe custom Frappe apps with confidence.
<br>
</p>

---

## 📝 Table of Contents

- [About](#about)
- [What’s Included?](#whats_included)
- [Getting Started](#getting_started)
- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [Deployment](#deployment)
- [Built Using](#built_using)
- [Contributing](#contributing)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

---

## 🧐 About <a name = "about"></a>

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

## 📦 What’s Included? <a name = "whats_included"></a>

### Global Objects & Functions

- **`frappe`** – Core Frappe namespace with:
  - `frappe.call()` – Server-side RPC method calls
  - `frappe.db` – Database operations (get_list, get_value, insert, etc.)
  - `frappe.ui` – UI components (Dialog, Form, Scanner, ScriptManager)
  - `frappe.model` – Document model utilities
  - `frappe.utils` – Utility functions (nowdate, get_random, icon, eval, play_sound)
  - `frappe.boot` – Boot configuration and cached data
  - `frappe.datetime` – Date and time utilities
  - `frappe.dom` – DOM manipulation helpers
  - `frappe.msgprint()` – Display alert messages
  - `frappe.show_alert()` – Floating notification alerts
  - `frappe.confirm()` – Confirmation dialogs
  - `frappe.prompt()` – User input prompts
  - `frappe.throw()` – Error throwing with UI feedback
  - `frappe.get_doc()` – Fetch documents from local cache
  - `frappe.get_meta()` – Get DocType metadata
  - `frappe.new_doc()` – Create and navigate to new documents
  - `frappe.set_route()` / `frappe.get_route()` – Routing utilities
  - `frappe.require()` / `frappe.provide()` – Asset and namespace management
  - `frappe.session` – Current user session info

- **`cur_frm`** – Current form instance with:
  - `cur_frm.doc` – Document data
  - `cur_frm.set_value()` – Set field values
  - `cur_frm.get_field()` – Access field objects
  - `cur_frm.add_custom_button()` – Add form buttons
  - `cur_frm.refresh_field()` – Refresh specific fields
  - `cur_frm.save()` / `cur_frm.reload_doc()` – Form operations
  - Plus many more form methods and properties

- **`__`** – Translation/internationalization function

### TypeScript Interfaces

- **`FrappeDoc`** – Base document interface with standard fields
- **`FrappeForm<T>`** – Strongly-typed form interface
- **`DocMeta`** – DocType metadata structure
- **`DialogInstance`** – Dialog component types
- **UI Components**: Dialog, Form, Scanner, ScriptManager

### DocType Definitions

Pre-built type definitions for common DocTypes:
- **Frappe Core**: Company
- **ERPNext**: Item, PurchaseOrder, SalesOrder, SerialNo, Workflow

> 🧩 The list is continuously expanding as new globals and patterns are added.

---

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will help you set up the package in a TypeScript project.

### Prerequisites

Make sure your project is configured for TypeScript:

```bash
npm install typescript
npx tsc --init
```

---

## 📥 Installation <a name = "installation"></a>

Install as a dev dependency:

```bash
# npm
npm install --save-dev @anygridtech/frappe-types

# yarn
yarn add --dev @anygridtech/frappe-types

# pnpm
pnpm add -D @anygridtech/frappe-types
```

---

## ⚙️ Setup <a name = "setup"></a>

This package is designed to work with `@anygridtech/frappe-ts-tools`. You must set up `frappe-ts-tools` first:

👉 **[Follow @anygridtech/frappe-ts-tools Setup Instructions](https://github.com/AnyGridTech/frappe-ts-tools#configuration)**


The `frappe-ts-tools` package handles all TypeScript compilation and build configuration automatically.

---

## 🎈 Usage <a name="usage"></a>

After setup, you can use Frappe globals with full TypeScript support:

```ts
frappe.call({
  method: "frappe.client.get",
  args: {
    doctype: "Customer",
    name: "CUST-0001"
  },
  callback(r) {
    console.log(r.message);
  }
});
```

---

## 🚀 Deployment <a name = "deployment"></a>

This is a type-only package. Just include it in your dev dependencies — no runtime deployment required.

---

## ⛏️ Built Using <a name = "built_using"></a>

- [TypeScript](https://www.typescriptlang.org/)
- [Frappe](https://frappeframework.com/)

---

## 🤝 Contributing <a name = "contributing"></a>

This project is a community effort.  
Contributions are welcome! Open an issue or PR if you find missing or incorrect types.

---

## ✍️ Authors <a name = "authors"></a>

- [@anygridtech](https://github.com/anygridtech) – Maintainers  
- Inspired by [@kylelobo](https://github.com/kylelobo) – Initial template

---

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Frappe community for documentation and examples  
- Inspiration from open-source type definition projects
