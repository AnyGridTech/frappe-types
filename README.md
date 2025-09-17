# @anygridtech/frappe-types

![npm version](https://img.shields.io/npm/v/%40anygridtech%2Ffrappe-types.svg)
![license](https://img.shields.io/badge/License-MIT-blue.svg)

> Comprehensive TypeScript definitions for the Frappe Framework’s client-side JavaScript API.

This package provides fully-typed global variables and functions commonly injected by Frappe in the browser — such as `frappe`, `cur_frm`, `__`, `msgprint`, and more — allowing you to write **modern, type-safe** custom scripts with confidence.

---

## 🚀 Why Use This Package?

The Frappe Framework offers a powerful client-side API — but it’s built around plain JavaScript, which comes with common issues:

- ❌ Typing mistakes (e.g. `frm.doc.customer_name` vs `frm.doc.customer_nam`)
- ❌ No clarity on the shape of API responses
- ❌ Fragile code during refactors
- ❌ Poor autocomplete and inline documentation

With `@anygridtech/frappe-types`, you get:

✅ Accurate autocompletion  
✅ Compile-time error checking  
✅ Inline documentation support  
✅ Improved code maintainability and developer experience

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

Install as a development dependency:

```bash
# Using npm
npm install --save-dev @anygridtech/frappe-types

# Using yarn
yarn add --dev @anygridtech/frappe-types

# Using pnpm
pnpm add -D @anygridtech/frappe-types
```

⚙️ Setup
✅ Option 1: Explicit Import (Recommended)

This is the cleanest and most modern setup — no need to mess with tsconfig.json.

In your main entry file (e.g. src/index.ts or a custom globals.d.ts), simply import the types:

// src/index.ts or globals.d.ts
import '@anygridtech/frappe-types';


This doesn’t bundle any extra code — it's a compiler hint to TypeScript.

Why this approach?

🔍 Clear and explicit origin of global types

❌ No messing with tsconfig.json’s types array

✅ Common practice in modern libraries (like vite/client, jest-dom, etc.)

⚙️ Option 2: tsconfig.json Configuration

Alternatively, you can configure TypeScript to load the types automatically:

// tsconfig.json
{
  "compilerOptions": {
    "types": [
      "node", // 👈 Keep other required global types
      "@anygridtech/frappe-types"
    ]
  },
  "include": [
    "src/**/*"
  ]
}


⚠️ Important: When using the types array, you must explicitly include all global type packages your project uses (e.g., "node", "jest"). Missing one can cause mysterious errors like Cannot find name 'process'.

🧪 Usage Example

Once configured, you can write fully typed client scripts:

// example.ts

// frappe.ui.form.on now provides full autocomplete
frappe.ui.form.on('Sales Invoice', {
  refresh(frm) {
    if (!frm.is_new()) {
      frm.set_intro(__("Invoice for {0}", [frm.doc.customer]));

      frm.add_custom_button(__('Check Status'), () => {
        frappe.call({
          method: 'myapp.api.check_invoice_status',
          args: { invoice_name: frm.doc.name },
          callback(response) {
            frappe.msgprint(`Status: ${response.message}`);
          },
        });
      });
    }
  },
});

// Typed usage of cur_frm
function set_first_item_rate(new_rate: number) {
  if (cur_frm?.doc.items?.length > 0) {
    cur_frm.doc.items[0].rate = new_rate;
    cur_frm.refresh_field('items');
  }
}

🤝 Contributing

This project is community-driven — contributions are very welcome!

Found a missing or incorrect type? Want to add more definitions?
Feel free to open an issue
 or submit a pull request.

📝 License

MIT © Anygrid Technologies
