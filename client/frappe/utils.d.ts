// frappe/utils.d.ts

/**
 * Represents utility functions provided by Frappe.
 */
export interface utils {
  /**
   * 
   * @returns The current date in YYYY-MM-DD format.
   */
  nowdate: () => string; // Returns the current date in YYYY-MM-DD format.
  /**
   * 
   * @returns The current time in HH:MM:SS format.
   */
  today: () => string; // Returns today's date.
  /**
   * 
   * @returns Returns a random string based on the length provided.
   * @param length - The length of the random string.
   */
  get_random: (length: number) => string;
  /**
   * 
   * @param type - The type of the icon.
   * @param size - The size of the icon.
   * @returns The icon as a string.
   */
  icon(type: string, size: "sm" | "md" | "lg"): string; // Returns an icon.
  /**
   * Evaluates a JavaScript expression within a given context.
   * 
   * @param code - The JavaScript expression to evaluate.
   * @param context - An object containing variables to inject into the evaluation context.
   * @returns The result of the evaluated expression.
   * @throws An error if the evaluation fails.
   */
  eval: (code: string, context?: Record<string, unknown>) => unknown;

}