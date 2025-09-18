// frappe/ui/Dialog.d.ts
import { DocField } from "../core";

/**
 * Dialog box constructor.
 * @see {@link https://frappeframework.com/docs/user/en/api/dialog}
 */
export interface Dialog {
  /**
   * Creates a new dialog box.
   * @param opts - Dialog configuration options.
   * @see {@link https://frappeframework.com/docs/user/en/api/dialog#create-dialog}
   */
  new (opts: DialogConfiguration): DialogInstance;
}

/**
 * @see {@link https://frappeframework.com/docs/user/en/api/dialog#create-dialog Frappe Create Dialog Documentation}
 *
 * Configuration object for creating a Frappe Dialog.
 */
export interface DialogConfiguration {
  /**
   * The title of the dialog.
   */
  title: string;

  /**
   * An array of field definitions to be displayed in the dialog.
   */
  fields: DialogField[];

  /**
   * The primary action executed when the primary button is clicked.
   * The `data` parameter contains the values of all fields in the dialog.
   */
  primary_action?: (data: Record<string, any>) => void;

  /**
   * The label for the primary action button.
   */
  primary_action_label?: string;

  /**
   * The secondary action executed when the secondary button is clicked.
   */
  secondary_action?: () => void;

  /**
   * The label for the secondary action button.
   */
  secondary_action_label?: string;

  /**
   * If `true`, the dialog can be minimized.
   */
  minimizable?: boolean;

  /**
   * Sets a custom width for the dialog (e.g., "600px").
   */
  width?: string;

  /**
   * Event handler triggered when the dialog is shown.
   */
  on_page_show?: () => void;

  /**
   * Specifies the size of the dialog: "small", "large", or "extra-large".
   */
  size?: 'small' | 'large' | 'extra-large';

/**
* Prevents the dialog from being closed via close icon, pressing ESC or clicking away.
* @default false
*/
static?: boolean;

/**
* If true, allows the dialog to be draggable.
* @default true
*/
draggable?: boolean;

 /**
 * If true, prevents the user from closing via ESC or clicking outside.
 * Completely independent of `static`.
 * @default false
 */
lockClose?: boolean;
/**
 * If true, the dialog will be displayed in fullscreen mode on mobile devices.
 * @default false
 */
mobileSupport?: boolean;  
}

/**
 * @see {@link https://frappeframework.com/docs/user/en/api/dialog#dialog-methods Frappe Dialog Methods Documentation}
 *
 * Represents an instance of a Frappe Dialog.
 */
export interface DialogInstance<T = Record<string, any>> {
  [x: string]: any;

  /**
   * The title of the dialog.
   */
  title: string;

  /**
   * Displays the dialog to the user.
   */
  show(): void;

  /**
   * Hides the dialog.
   */
  hide(): void;

  /**
   * Dynamically sets the title of the dialog.
   * @param title - The new title for the dialog.
   */
  set_title(title: string): void;

  /**
   * Updates the primary action button's label and action.
   * @param label - The new label for the button.
   * @param action - The new function executed on button click.
   */
  set_primary_action(label: string, action?: () => void): JQuery<HTMLElement>;

  /**
   * Updates the secondary action function.
   * @param action - The new function executed on button click.
   */
  set_secondary_action(action: () => void): JQuery<HTMLElement>;

  /**
   * Updates the secondary action button's label.
   */
  set_secondary_action_label(label: string): JQuery<HTMLElement>;

  /**
   * Retrieves a field object by its fieldname.
   * @param fieldname - The internal name of the field.
   * @returns The field object.
   */
  get_field(fieldname: string): DialogField;

  /**
   * Retrieves all values entered into the dialog as a dictionary.
   * @returns An object containing field values, keyed by fieldname.
   */
  get_values(): T;

  /**
   * Clears all values entered into the dialog fields.
   */
  clear(): void;
}

/**
 * Represents fields used in a Frappe Dialog.
 * Extends the base DocField structure and adds Dialog-specific properties.
 * @see {@link https://frappeframework.com/docs/user/en/api/dialog#create-fields Frappe Dialog Field Documentation}
 */
export interface DialogField extends DocField {
  /**
   * The default value for the field.
   */
  default?: any;

  /**
   * Event handler triggered when the value of the field changes.
   */
  onchange?: (e: JQuery.ChangeEvent) => void;

  /**
   * Event handler triggered when the field is clicked.
   * Generally used for buttons.
   */
  click?: (e: JQuery.ClickEvent) => void;

  /**
   * Sets the precision for numeric fields like "Float" or "Currency".
   */
  precision?: number;

  /**
   * Adds placeholder text in fields like "Data" or "Text".
   */
  placeholder?: string;

  /**
   * (For "Select") Allows only predefined options.
   */
  only_select?: boolean;

  /**
   * Specifies the column span in layouts.
   */
  columns?: number;

  /**
   * A condition (string or function) to show/hide the field dynamically.
   */
  depends_on?: string | (() => boolean);

  /**
   * A condition to make the field required dynamically.
   */
  mandatory_depends_on?: string | (() => boolean);

  /**
   * A condition to make the field read-only dynamically.
   */
  read_only_depends_on?: string | (() => boolean);

  /**
   * A short description displayed under the field for additional context.
   */
  description?: string;
}

export interface EnhancedDialog extends Dialog {
  /**
   * Override frappe.ui.Dialog to support per-dialog lockClose & draggable flags.
   * Call once at app startup.
   */
    EnhancedDialog: () => void;
}