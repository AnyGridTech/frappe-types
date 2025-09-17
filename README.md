@anygridtech/frappe-types
![alt text](https://img.shields.io/npm/v/%40anygridtech%2Ffrappe-types.svg)

![alt text](https://img.shields.io/badge/License-MIT-blue.svg)
A comprehensive set of TypeScript type definitions for the Frappe Framework's client-side JavaScript environment.
This package provides types for the global variables and functions that Frappe injects into the browser, such as frappe, cur_frm, __, msgprint, and many others. It empowers you to write modern, type-safe custom scripts for your Frappe applications with confidence.
Why use this package?
The Frappe Framework provides a powerful client-side API, but it's traditionally used with plain JavaScript. This leads to common issues:
Typographical errors in object properties (frm.doc.customer_name vs frm.doc.customer_nam).
Uncertainty about the shape of API responses or function parameters.
Difficulty in refactoring code without breaking things.
Poor editor support for autocompletion and documentation.
@anygridtech/frappe-types solves these problems by enabling static type-checking. Your editor and the TypeScript compiler can now:
✅ Provide intelligent autocompletion for frappe objects, form methods, and more.
✅ Catch errors at compile-time, before your code ever runs in the browser.
✅ Serve as inline documentation, making the API easier to discover and use.
✅ Improve code quality and maintainability for complex client scripts.
What's Included?
This package provides types for the most commonly used global objects, including:
frappe: The main Frappe API object, including frappe.call, frappe.db, frappe.ui.form, frappe.msgprint, etc.
cur_frm: The current form object, with typed access to cur_frm.doc, cur_frm.set_value, cur_frm.refresh_field, etc.
__: The translation function.
Utility functions like msgprint, cstr, flt, and more.
...and the list is continuously expanding!
Installation
As this is a development-only package, install it as a devDependency.
code
Bash
# Using npm
npm install --save-dev @anygridtech/frappe-types

# Using yarn
yarn add --dev @anygridtech/frappe-types

# Using pnpm
pnpm add -D @anygridtech/frappe-types
Setup
After installation, you need to tell TypeScript how to find and use these global type definitions. There are two primary ways to do this.
Option 1: Explicit Import (Recommended)
This is the modern, recommended approach. It is explicit, safe, and doesn't require complex tsconfig.json modifications.
Simply add the following import statement to a central file in your project, such as an entry point (index.ts, main.ts) or a dedicated type definition file (globals.d.ts).
code
TypeScript
// in src/index.ts or another entry file

import '@anygridtech/frappe-types';
That's it! This line doesn't add any code to your final JavaScript bundle; it's a signal used exclusively by the TypeScript compiler to load the global types. Once this line is present, all types will be available globally across your entire project.
Why is this method recommended?
Explicit is Better than Implicit: It makes it crystal clear where the global types for Frappe are coming from.
No tsconfig.json Magic: You don't have to manage the delicate types array in your tsconfig.json, which can be a common source of errors.
Industry Standard: This pattern is used by many modern libraries (like vite/client or @testing-library/jest-dom) to augment the global scope.
Option 2: Modifying tsconfig.json
This method involves configuring TypeScript to automatically load the types by editing your tsconfig.json file. It works well but requires careful configuration.
Add @anygridtech/frappe-types to the compilerOptions.types array in your tsconfig.json.
code
JSON
// tsconfig.json
{
  "compilerOptions": {
    // ...your other options...
    "types": [
      "node", // 👈 IMPORTANT: Keep other essential types like "node"!
      "@anygridtech/frappe-types"
    ]
  },
  "include": [
    "src/**/*"
  ]
}
⚠️ Important: When you define the types property, TypeScript stops automatically scanning for types in node_modules/@types. You must explicitly list all global type packages your project needs (like "node", "jest", etc.). Forgetting to do so is a common cause of "Cannot find name 'process'" or similar errors.
Usage Example
Once configured, you can enjoy full TypeScript support in your Frappe client scripts.
code
TypeScript
// example.ts

// The Frappe types are now globally available.

// Autocompletion on `frappe.ui.form.on`
frappe.ui.form.on('Sales Invoice', {
  // `frm` is automatically typed as `Frappe.Form` for the 'Sales Invoice' DocType.
  // Note: For generic DocTypes, you might use `Frappe.Form<MyDocType>`
  refresh(frm) {
    if (!frm.is_new()) {
      // Autocomplete for form methods and properties.
      frm.set_intro(__("Invoice for {0}", [frm.doc.customer]));
      frm.add_custom_button(__('Check Status'), () => {
        // Autocomplete on frappe.call
        frappe.call({
          method: 'myapp.api.check_invoice_status',
          args: { invoice_name: frm.doc.name },
          callback(response) {
            // `response.message` can be typed in your API function!
            frappe.msgprint(`Status: ${response.message}`);
          },
        });
      });
    }
  },
});

// Using the global `cur_frm` object with type safety
function set_first_item_rate(new_rate: number) {
  if (cur_frm && cur_frm.doc.items?.length > 0) {
    // Type-safe access to child table fields
    cur_frm.doc.items[0].rate = new_rate;
    cur_frm.refresh_field('items');
  }
}
Contributing
This project is a community effort. Contributions are highly welcome! If you find a missing or incorrect type, or want to expand the definitions, please feel free to open an issue or submit a pull request.
License
This project is licensed under the MIT License.
