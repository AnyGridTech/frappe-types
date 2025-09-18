// frappe/ui/ControlData.d.ts

/**
 * Represents the ControlData class in Frappe.
 */
export interface ControlDataInstance {
  /**
   * Creates the input element.
   */
  make_input(): void;

  /**
   * Sets up attributes for the input field.
   */
  set_input_attributes(): void;

  /**
   * Sets the input value.
   * @param value - The value to set.
   */
  set_input(value: string): void;

  /**
   * Retrieves the input value.
   * @returns The input value.
   */
  get_input_value(): string;

  /**
   * Sets up URL-specific input behaviors.
   */
  setup_url_field(): void;

  /**
   * Sets up a copy button for the input field.
   */
  setup_copy_button(): void;

  /**
   * Sets up barcode-specific input behaviors.
   */
  setup_barcode_field(): void;

  /**
   * Sets up the auto-name validation for the field.
   */
  setup_autoname_check(): void;

  /**
   * Binds the change event to the input field.
   */
  bind_change_event(): void;

  /**
   * Validates the input value based on the field options.
   * @param value - The value to validate.
   * @returns The validated value.
   */
  validate(value: string): string;

  /**
   * Toggles scroll behavior for the container.
   * @param el_class - The container element class.
   * @param scroll_class - The scroll class to toggle.
   * @param add - Whether to add or remove the class.
   */
  toggle_container_scroll(el_class: string, scroll_class: string, add?: boolean): void;

  /**
   * Determines if the input is within a grid.
   * @returns `true` if in a grid, otherwise `false`.
   */
  in_grid(): boolean;

  /**
   * Formats the value for input display.
   * @param value - The value to format.
   * @returns The formatted value.
   */
  format_for_input(value: any): string;

  /**
   * Sets the formatted input value.
   * @param value - The value to set.
   */
  set_formatted_input(value: string): void;

  /**
   * Represents the jQuery input element.
   */
  $input: JQuery<HTMLElement>;

  /**
   * Flag indicating whether input is initialized.
   */
  has_input: boolean;

  /**
   * Represents the input DOM element.
   */
  input: HTMLElement;
}

/**
 * Constructor for ControlData class.
 */
export interface ControlData {
  /**
   * HTML element for the control input.
   */
  html_element: string;

  /**
   * Input type for the control.
   */
  input_type: string;

  /**
   * Determines if change is triggered on the input event.
   */
  trigger_change_on_input_event: boolean;

  /**
   * Creates a new instance of ControlData.
   */
  new(options: ControlOptions): ControlDataInstance;
}


/**
 * Configuration options for ControlData.
 */
export interface ControlOptions {
  /**
   * Represents the parent element for the control.
   */
  doctype?: string;
  /**
   * Fieldname for the control.
   */
  fieldname?: string;
  /**
   * Form instance for the control.
   */
  frm?: any; // Represents the form instance.
  /**
   * Grid related to the control
   */
  grid?: any;
  /**
   * Represents the dialog field for the control.
   */
  df?: {
    fieldtype: string;
    fieldname: string;
    length?: number;
    options?: string;
    placeholder?: string;
    input_css?: Record<string, any>;
    input_class?: string;
    with_copy_button?: boolean;
  };
}
