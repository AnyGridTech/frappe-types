// frappe/ui/ScriptManager.d.ts

/**
 * ScriptManager for handling form-level scripts and event triggers.
 * @see {@link https://frappeframework.com/docs/user/en/api/form ScriptManager Documentation}
 */
export interface ScriptManager {
  /**
   * Creates a new ScriptManager instance.
   * @param opts - ScriptManager configuration options.
   */
  new (opts: ScriptManagerConfiguration): ScriptManagerInstance;
}

/**
 * Configuration object for initializing a ScriptManager.
 */
export interface ScriptManagerConfiguration {
  /**
   * The form object (frm) associated with the ScriptManager.
   */
  frm: any;
}

/**
 * Represents an instance of ScriptManager.
 * Handles the lifecycle of form scripts and event triggers.
 */
export interface ScriptManagerInstance {
  /**
   * Initializes the ScriptManager with a given controller class.
   * @param ControllerClass - The controller class to initialize.
   */
  make(ControllerClass: any): void;

  /**
   * Triggers a specified event for a form, optionally specifying a doctype and name.
   * @param event_name - The name of the event to trigger.
   * @param doctype - Optional: The doctype for the event.
   * @param name - Optional: The name of the document for the event.
   * @returns A promise resolving when all event handlers are executed.
   */
  trigger(event_name: string, doctype?: string, name?: string): Promise<void>;

  /**
   * Checks if handlers are available for a given event and doctype.
   * @param event_name - The event name to check.
   * @param doctype - The doctype to check.
   * @returns True if handlers are available, otherwise false.
   */
  has_handlers(event_name: string, doctype: string): boolean;

  /**
   * Retrieves handlers for a given event and doctype.
   * @param event_name - The event name to get handlers for.
   * @param doctype - The doctype to get handlers for.
   * @returns An object with `old_style` and `new_style` handlers.
   */
  get_handlers(
    event_name: string,
    doctype: string
  ): {
    old_style: string[];
    new_style: ((frm: any, doctype: string, name: string) => Promise<void>)[];
  };

  /**
   * Sets up the form, including custom scripts, CSS, and event handlers.
   */
  setup(): void;

  /**
   * Logs errors in client scripts to the console.
   * @param caller - The caller method or function name.
   * @param e - The error object.
   */
  log_error(caller: string, e: Error): void;

  /**
   * Copies values from the first row of a child table to the current row.
   * @param parentfield - The child table fieldname.
   * @param current_row - The current row object.
   * @param fieldnames - The fieldnames to copy, as a string or array of strings.
   */
  copy_from_first_row(
    parentfield: string,
    current_row: { doctype: string; name: string },
    fieldnames: string | string[]
  ): void;
}
