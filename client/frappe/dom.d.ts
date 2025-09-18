// frappe/dom.d.ts

/**
 * Represents the DOM manipulation utilities provided by Frappe.
 */
export interface dom {
  /**
         * Activates an element by adding an "active" class.
         * @param element - The element to activate.
         * @param selector - Optional: Selector to identify the element.
         * @param activeClass - Optional: Class to mark as active (default: "active").
         */
  activate(element: HTMLElement, selector?: string, activeClass?: string): void;

  /**
   * Adds an element to a parent element.
   * @param element - The element to add.
   * @param parent - The parent element.
   * @param options - Additional options like classes or attributes.
   */
  add(
    element: HTMLElement,
    parent: HTMLElement,
    options?: { [key: string]: any }
  ): void;

  /**
   * Finds an element by its ID.
   * @param id - The ID of the element.
   * @returns The found element or null if not found.
   */
  by_id(id: string): HTMLElement | null;

  /**
   * Applies CSS styles to an element.
   * @param element - The target element.
   * @param styles - An object containing CSS properties and values.
   */
  css(element: HTMLElement, styles: { [property: string]: string }): void;

  /**
   * Evaluates and executes a script.
   * @param script - The script to execute.
   */
  eval(script: string): void;

  /**
   * Converts a file to a Base64 string.
   * @param file - The file to convert.
   * @returns A promise that resolves with the Base64 string.
   */
  file_to_base64(file: File): Promise<string>;

  /**
   * Freezes the UI with an optional message.
   * @param message - The freeze message.
   * @param options - Additional options like background style.
   */
  freeze(message?: string, options?: { [key: string]: any }): void;

  /**
   * Gets a unique ID for an element.
   * @returns A unique ID string.
   */
  get_unique_id(): string;

  /**
   * Handles broken images in a container by replacing them with placeholders.
   * @param container - The container element to search for broken images.
   */
  handle_broken_images(container: HTMLElement): void;

  /**
   * Checks if an element is inside a modal.
   * @param element - The target element.
   * @returns True if the element is inside a modal, false otherwise.
   */
  is_element_in_modal(element: HTMLElement): boolean;

  /**
   * Checks if an element is visible in the viewport.
   * @param element - The target element.
   * @param offset - Optional: Offset from the viewport edge (default: 0).
   * @returns True if the element is in the viewport, false otherwise.
   */
  is_element_in_viewport(element: HTMLElement, offset?: number): boolean;

  /**
   * Checks if the device is a touchscreen.
   * @returns True if the device is a touchscreen, false otherwise.
   */
  is_touchscreen(): boolean;

  /**
   * Converts pixels to inches.
   * @param pixels - The pixel value to convert.
   * @returns The converted inch value.
   */
  pixel_to_inches(pixels: number): number;

  /**
   * Removes script and style tags from HTML.
   * @param html - The HTML string to clean.
   * @returns The sanitized HTML string.
   */
  remove_script_and_style(html: string): string;

  /**
   * Restores a previously saved text selection.
   * @param selection - The saved selection range.
   */
  restore_selection(selection: Range): void;

  /**
   * Saves the current text selection.
   * @returns The saved selection range.
   */
  save_selection(): Range | null;

  /**
   * Scrolls an element to the bottom.
   * @param element - The element to scroll.
   */
  scroll_to_bottom(element: HTMLElement): void;

  /**
   * Scrolls to a specific section in the document.
   * @param section - The section to scroll to.
   */
  scroll_to_section(section: string): void;

  /**
   * Sets CSS styles dynamically in the document.
   * @param styles - The CSS string to set.
   * @param id - Optional: The ID for the style tag.
   */
  set_style(styles: string, id?: string): void;

  /**
   * Assigns a unique ID to an element.
   * @param element - The target element.
   */
  set_unique_id(element: HTMLElement): void;

  /**
   * Unfreezes the UI.
   */
  unfreeze(): void;
}