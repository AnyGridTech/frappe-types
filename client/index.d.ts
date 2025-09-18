import { Frappe } from "./frappe";
import { FrappeForm } from "./frappe/core";

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

export { };