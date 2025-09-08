import { db } from "./frappe/frappe-db";
import { ui } from "./frappe/frappe-ui";
import { utils } from "./frappe/frappe-utils";
import { model } from "./frappe/frappe-model";
import { boot } from "./frappe/frappe-boot";
import { datetime } from "./frappe/frappe-datetime";
import { FrappeExtendedFunctions, FrappeForm } from "./frappe/frappe-core";
import { dom } from "./frappe/frappe-dom";
/**
 * The global `frappe` namespace, bundling all related modules.
 */
export interface Frappe extends FrappeExtendedFunctions {
  user: any;
  defaults: any;
  frappe: any;
  ui: ui; // UI-related methods and components.
  db: db; // Database-related methods.
  utils: utils; // Utility functions.
  model: model; // Model-related methods.
  boot: boot; // Boot-related methods.
  dom: dom; // DOM-related methods.
  datetime: datetime; // Date and time-related methods.
}

// Declare the global `frappe` variable
declare global {
  /**
   * The global `frappe` namespace, bundling all related modules.
   */
  const frappe: Frappe; // `frappe` as a globally accessible object
  /**
   * The global current form object.
   */
  const cur_frm: FrappeForm;

  /**
   * Translates a string into the user's language or returns the string as is if no translation is found.
   * @param text - The string to be translated.
   * @param replacements - Optional dictionary for dynamic replacements within the string.
   * @returns The translated string or the original string if no translation is available.
   */
  function __(
    text: string,
    replacements?: Record<string, string | number>
  ): string;
}



export { }; // Ensure this file is treated as a module.
