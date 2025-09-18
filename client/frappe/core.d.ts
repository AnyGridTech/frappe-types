// frappe/core.d.ts

import { DialogField, DialogInstance } from "./ui/Dialog";
import { ScriptManagerInstance } from "./ui/ScriptManager";

/**
 * Represents a generic Frappe document (a database row).
 * 
 * @see {@link https://frappeframework.com/docs/user/en/api/document Frappe Document API Documentation}
 */
export interface FrappeDoc {
  /**
   * The current workflow state of the document.
   */
  workflow_state: string;

  /**
   * Unique identifier for the document.
   * Typically corresponds to the primary key in the database.
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/document#name}
   */
  name: string;

  /**
   * The type of the document, indicating its DocType (e.g., "Stock Entry").
   * Used to classify the document within the Frappe framework.
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/document#doctype}
   */
  doctype: string;

  /**
   * The user who created the document.
   * Optional; may not be present in some cases.
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/document#owner}
   */
  owner: string;

  /**
   * The user who last modified the document.
   * Optional; reflects the last user interaction with the document.
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/document#modified_by}
   */
  modified_by?: string;

  /**
   * The timestamp when the document was created.
   * Optional; in ISO 8601 format (e.g., "2024-11-28T12:34:56Z").
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/document#creation}
   */
  creation?: string;

  /**
   * The timestamp of the last modification to the document.
   * Optional; in ISO 8601 format (e.g., "2024-11-28T12:34:56Z").
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/document#modified}
   */
  modified?: string;

  /**
   * Index for ordering records in child tables.
   * Optional; used to maintain the sequence of rows in a table field.
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/document#idx}
   */
  idx?: number;

  /**
   * Parent reference for nested documents (e.g., child tables).
   * Optional; links the document to its parent.
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/document#parent}
   */
  parent?: string;

  /**
   * Fieldname in the parent document that links to this document.
   * Optional; used for child tables or nested records.
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/document#parentfield}
   */
  parentfield?: string;

  /**
   * The DocType of the parent document, if this is a child document.
   * Optional; relevant for nested documents.
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/document#parenttype}
   */
  parenttype?: string;

  /**
   * The workflow state of the document.
   * Optional; used to track the status of the document in a workflow.
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/document#workflow_state}
   */
  docstatus: number;

  /**
   * Whether the document has been saved to the database.
   * Optional; commonly used in client-side scripting to distinguish new documents.
   * 
   * Derived from runtime object; not explicitly documented.
   */
  __islocal?: boolean;

  /**
   * Indicates whether the document has unsaved changes.
   * Optional; used for tracking modifications in client-side scripting.
   * 
   * Derived from runtime object; not explicitly documented.
   */
  __unsaved?: boolean;

  /**
   * The current workflow field of the document.
   */
  state_fieldname: string;

  /**
   * The documents related to doctypes that are workflows
   */
  __workflow_docs: FrappeDoc[]

  /**
   * Custom fields or metadata added by the user.
   * Dynamically extends the document structure.
   * 
   * Derived from runtime object; not explicitly documented.
   */
  [key: string]: any;
}

/**
* Query options for filtering Link fields.
*/
interface QueryOptions {
  filters?: Record<string, any>; // Filters as key-value pairs
  query?: string; // Optional server-side query path
}

/**
* Query function type definition.
* Defines a function that returns a query object for filtering options.
*/
type QueryFunction = (doc: Record<string, any>, cdt?: string, cdn?: string) => QueryOptions;


/**
 * Represents a Frappe form object as observed in the runtime.
 * 
 * This interface strictly aligns with the runtime object provided.
 * 
 * @see {@link https://frappeframework.com/docs/user/en/api/form Frappe Form API Documentation}
 */
export interface FrappeForm<T = Record<string, any>> {
  call(arg0: string, arg1: { docname: any; workflow_state: any; ignore_workflow_validation: boolean; }): unknown;
  refresh(): any;
  /**
 * The document currently being edited in the form.
 * @see {@link https://frappeframework.com/docs/user/en/api/form#frm-doc}
 */
  doc: FrappeDoc & T;

  /**
   * The current status of the document.
   * 0 - Saved
   * 1 - Submitted
   * 2 - Cancelled
   */
  docstatus: number

  /**
 * Marks the document as unsaved and triggers a UI update.
 * 
 * The `dirty` method sets the `__unsaved` flag on the document, 
 * emits a `dirty` event on the form wrapper, and attaches 
 * a `beforeunload` event listener to warn users before navigating away.
 * 
 * This ensures that unsaved changes are detected and prompts the user 
 * before leaving the page if Frappe is not running in developer mode.
 * 
 * @returns void
 */
  dirty: () => void;


  /**
   * Reloads the current document.
   * 
   * The `reload_doc` method checks for a conflict in the document's Doctype, removes the document
   * from local storage if it exists, and fetches the document data again to refresh the UI.
   * 
   * @returns A promise that resolves when the document is successfully reloaded and refreshed.
   */
  reload_doc: () => Promise<void>;


  /**
   * Sets a query to filter options for a field dynamically.
   * 
   * The set_query method takes one of two formats: set_query(field_name, options_function()) 
   * for regular fields, or set_query(field_name, child_table_name, options_function()) for fields in child tables.
   *
   * @param fieldname - The fieldname of the field to apply the query.
   * @param opt1 - Either the parent fieldname (for child table queries) or the query object/function for the parent field.
   * @param opt2 - A query object/function for child table fields (only used if `opt1` specifies the parent fieldname).
   */
  set_query: (
    fieldname: string,
    opt1: string | QueryFunction | QueryOptions,
    opt2?: QueryFunction | QueryOptions
  ) => void;

  /**
   * Adds a child row to the specified child table in the current document.
   * 
   * @param fieldname - The fieldname of the child table in the parent document.
   * @param values - Optional key-value pairs to initialize the child row fields.
   * @returns The newly created child document as a Record.
   */
  add_child<T>(
    fieldname: string,
    values?: Record<string, any>
  ): T & Record<string, any>;

  /**
   * Refreshes a specific field in the current form.
   * 
   * @param fname - The fieldname of the field to be refreshed.
   */
  refresh_field(fname: string): void;

  /**
   * Name of the current document.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#frm-docname}
   */
  docname: string;

  /**
   * The DocType of the current document.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#frm-doctype}
   */
  doctype: string;

  /**
   * Whether the form is in read-only mode.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#frm-read_only}
   */
  read_only: boolean;

  /**
   * A dictionary of all fields in the form.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#frm-fields_record}
   */
  fields_dict: FieldsDict;

  /**
   * Array of all fields in the form.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#frm-fields}
   */
  fields: any[];

  /**
   * Dashboard object for managing progress, heatmaps, and charts.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#frm-dashboard}
   */
  dashboard: {
    /**
     * Parent container for the dashboard.
     */
    parent: HTMLElement;

    /**
     * Reference to the current form.
     */
    frm: FrappeForm<T>;

    /**
     * Progress area element for the dashboard.
     */
    progress_area: HTMLElement;

    /**
     * Heatmap area element for the dashboard.
     */
    heatmap_area: HTMLElement;

    /**
     * Chart area element for the dashboard.
     */
    chart_area: HTMLElement;
  };

  /**
   * Sidebar object for managing form comments, user actions, and related elements.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#frm-sidebar}
   */
  sidebar: {
    /**
     * Reference to the current form.
     */
    frm: FrappeForm<T>;

    /**
     * Page container for the sidebar.
     */
    page: any;

    /**
     * Sidebar container element.
     */
    sidebar: HTMLElement;

    /**
     * Comments section within the sidebar.
     */
    comments: HTMLElement;

    /**
     * User actions area in the sidebar.
     */
    user_actions: HTMLElement;
  };

  /**
   * Toolbar object containing actions for the form.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#frm-toolbar}
   */
  toolbar: {
    /**
     * Reference to the current form.
     */
    frm: FrappeForm<T>;

    /**
     * Page container for the toolbar.
     */
    page: any;

    /**
     * Print icon element in the toolbar.
     */
    print_icon: HTMLElement;

    /**
     * Indicates if the form has a workflow.
     */
    _has_workflow: boolean;

    /**
     * Current status of the toolbar.
     */
    current_status: string;
  };

  /**
   * Undo manager for tracking undo and redo actions.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#frm-undo_manager}
   */
  undo_manager: {
    /**
     * Reference to the current form.
     */
    frm: FrappeForm<T>;

    /**
     * Stack of undoable actions.
     */
    undo_stack: any[];

    /**
     * Stack of redoable actions.
     */
    redo_stack: any[];
  };

  /**
   * Attachments manager for handling file uploads and downloads.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#frm-attachments}
   */
  attachments: {
    /**
     * Parent container for attachments.
     */
    parent: HTMLElement;

    /**
     * Reference to the current form.
     */
    frm: FrappeForm<T>;

    /**
     * Number of attachments to display per page.
     */
    attachments_page_length: number;

    /**
     * Whether to display all attachments.
     */
    show_all_attachments: boolean;

    /**
     * Wrapper element for adding attachments.
     */
    add_attachment_wrapper: HTMLElement;
  };

  /**
   * Object representing custom form events.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#frm-events}
   */
  events: Record<string, (...args: any[]) => void>;

  /**
   * State indicating whether the form setup is complete.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#frm-setup_done}
   */
  setup_done: boolean;

  /**
   * Refresh interval (in seconds) for stale data.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#frm-refresh_if_stale_for}
   */
  refresh_if_stale_for: number;

  /**
   * State field name for the form.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#frm-state_fieldname}
   */
  state_fieldname: string | null;

  /**
  * Indicates the possible states for the document
  * Used for tracking the document state in a workflow.
  * Example: Get the next state for the document when the
  * state transition action is triggered
  * 
  */
  states: {
    frm: FrappeForm_WorkflowAction_Extension;
    state_fieldname: string;
    update_fields: string[];
  }

  /**
   * Sets a value in the form. Triggers the field change event.
   * 
   * @param fieldname - The field to update or an object containing multiple field-value pairs.
   * @param value - The value to set (if setting a single field).
   * @returns A promise that resolves when the value is set.
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/form#frm-set_value}
   */
  set_value: (
    fieldname: keyof T | string | Record<string, any>,
    value?: any
  ) => Promise<void>;

  /**
   * Adds a custom button to the form's toolbar.
   * 
   * @param label - The label of the button.
   * @param action - The function to execute when the button is clicked.
   * @param group - Optional group to place the button in.
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/form#frm-add_custom_button}
   */
  add_custom_button: (
    label: string,
    action: () => void,
    group?: string
  ) => void;

  /**
   * Updates a property of a DocField and refreshes the field.
   * 
   * @param fieldname - The field to update.
   * @param property - The property to set (e.g., "read_only").
   * @param value - The value to set for the property.
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/form#frm-set_df_property}
   */
  set_df_property: (
    fieldname: keyof T | string,
    property: string,
    value: any,
    docname?: string,
    table_field?: string,
    table_row_name?: string
  ) => void;

  /**
  * 
  * This method saves changes to an existing document. This will check for
  * user permissions and execute validate before updating and on_update 
  * after updating values.
  * @param ignore_permissions - If true, will ignore user permissions.
  * @param ignore_version - If true, will ignore version check.
  * @returns void.
  */
  save: (ignore_permissions?: boolean, ignore_version?: boolean) => Promise<void>;

  /**
  * Permanently submits the document after validation, confirmation, 
  * and running before_submit and on_submit triggers.
  * 
  * @param btn - Optional button element used to display loading states.
  * @param callback - Function to execute after successfully submitting the document.
  * @param on_error - Function to execute in case of a validation or save failure.
  * @returns Promise<this> - Resolves with the current instance of the document handler.
  */
  savesubmit: (
    btn?: HTMLElement,
    callback?: () => void,
    on_error?: () => void
  ) => Promise<this>;


  /**
  * A map of form actions to their corresponding permission types.
  * 
  * Derived from runtime object; not explicitly documented.
  */
  action_perm_type_map: Record<string, string>;

  /**
   * A map of active tabs within the form.
   * 
   * Derived from runtime object; not explicitly documented.
   */
  active_tab_map: Record<string, any>;

  /**
   * HTML body container for the form layout.
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/form#frm-wrapper}
   */
  body: HTMLElement;

  /**
   * Custom scripts attached to the form, specific to the current DocType.
   * 
   * Derived from runtime object; not explicitly documented.
   */
  cscript: Record<string, any>;

  /**
   * Footer container for the form, typically holding status indicators or actions.
   * 
   * Derived from runtime object; not explicitly documented.
   */
  footer: {
    frm: FrappeForm<T>;
    parent: HTMLElement;
    wrapper: HTMLElement;
  };

  /**
   * Wrapper container for the form itself.
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/form#frm-wrapper}
   */
  form_wrapper: HTMLElement;

  /**
   * Tracks open documents in the form.
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/form#frm-opendocs}
   */
  opendocs: Record<string, boolean>;

  /**
   * A wrapper for the entire form.
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/form#frm-wrapper}
   */
  $wrapper: HTMLElement;

  /**
   * Represents the current grid view in the form.
   */
  cur_grid?: CurGrid;

  /**
   * The Meta object for the current DocType.
   */
  meta: {
    name: string; // The name of the Doctype
    module: string; // The module where the Doctype resides
    doctype: string; // Always "DocType" for meta objects
    autoname?: string; // Autonaming rule for the Doctype
    naming_rule?: string; // Rule used for naming
    creation: string; // Timestamp of creation
    modified: string; // Timestamp of last modification
    modified_by: string; // The user who last modified the Doctype
    owner: string; // The owner of the Doctype
    idx: number; // Index number
    fields: DialogField[]; // List of fields in the Doctype
    actions?: any[]; // Actions available for the Doctype
    links?: any[]; // Links associated with the Doctype
    states?: FrappeForm<T>["states"]; // Workflow states
    beta: boolean; // Indicates if the Doctype is in beta
    custom: boolean; // Indicates if the Doctype is custom
    issingle: boolean; // Indicates if the Doctype is a single document
    istable: boolean; // Indicates if the Doctype is a child table
    is_tree: boolean; // Indicates if the Doctype is a tree structure
    is_virtual: boolean; // Indicates if the Doctype is virtual
    is_submittable: boolean; // Indicates if the Doctype is submittable
    track_changes: boolean; // Tracks changes in the document
    track_seen: boolean; // Tracks if the document has been seen
    track_views: boolean; // Tracks views on the document
    queue_in_background: boolean; // Indicates if the document processing is queued
    allow_auto_repeat: boolean; // Indicates if auto-repeat is allowed
    allow_import: boolean; // Indicates if import is allowed
    allow_rename: boolean; // Indicates if renaming is allowed
    allow_copy: boolean; // Indicates if copying is allowed
    allow_events_in_timeline: boolean; // Indicates if events are shown in the timeline
    allow_guest_to_view: boolean; // Indicates if guest users can view the document
    allow_export: boolean; // Indicates if export is allowed
    editable_grid: boolean; // Indicates if the Doctype supports editable grids
    max_attachments: number; // Maximum allowed attachments
    make_attachments_public: boolean; // If true, attachments are public
    has_web_view: boolean; // Indicates if a web view is available
    show_name_in_global_search: boolean; // Indicates if the name appears in global search
    section_style?: string; // Style of sections in the form
    sort_field?: string; // Default sort field
    sort_order?: string; // Default sort order
    hide_toolbar: boolean; // Indicates if the toolbar is hidden
    quick_entry: boolean; // Indicates if quick entry is enabled
    read_only: boolean; // Indicates if the Doctype is read-only
    in_create: boolean; // Indicates if the Doctype is in create mode
    email_append_to: boolean; // Indicates if emails can be appended
    force_re_route_to_default_view: boolean; // Forces redirection to the default view
    index_web_pages_for_search: boolean; // Indicates if web pages are indexed for search
    translated_doctype: boolean; // Indicates if the Doctype is translated
    is_calendar_and_gantt: boolean; // Indicates if the Doctype supports calendar and Gantt views
    engine?: string; // Database engine used for the Doctype
    document_type?: string; // Document type (e.g., "Master", "Transaction")
    show_preview_popup: boolean; // Indicates if a preview popup is shown
    show_title_field_in_link: boolean; // Indicates if the title field is shown in links
    __assets_loaded: boolean; // Indicates if assets are loaded
    __custom_js?: string; // Custom JavaScript for the Doctype
    __custom_list_js?: string; // Custom List View JavaScript
    __dashboard?: any; // Dashboard configurations
    __kanban_column_fields?: string[]; // Kanban column fields
    __linked_with?: any; // Linked documents
    __listview_template?: string; // Listview template
    __map_js?: string; // JavaScript for maps
    __tree_js?: string; // JavaScript for tree structures
    __calendar_js?: string; // JavaScript for calendar
    __css?: string; // Custom CSS for the Doctype
    __messages?: string; // Messages for the Doctype
    __templates?: string; // Templates for the Doctype
    __print_formats?: any[]; // Print formats for the Doctype
    __last_sync_on?: Date; // Timestamp of the last sync
    __form_grid_templates?: any; // Grid templates for the form
  }

}

export interface FrappeForm_WorkflowAction_Extension extends FrappeForm {
  /**
    * The next workflow that the action is taking to.
  */
  selected_workflow_action?: string | null;

  /**
   * The script manager loaded into the workflow action
   */
  script_manager: ScriptManagerInstance

  /**
   * Refreshes the form of the docname passed.
   * It will refresh the current form if no docname is passed.
   * @param docname - The name of the document to refresh.
   */
  refresh: (docname?: string) => void;
}

type FieldDict = {
  /**
   * The field's label name.
   */
  __label?: string;
  /**
   * Metadata of the field (DocField structure)
   */
  df: DocField;
  /**
   * The doctype the field belongs to
   */
  doctype: string;
  /**
   * The specific document the field is part of
   */
  docname?: string;
  /**
   * The form instance, still needs proper typings.
   */
  frm: any;
  /**
   * The parent form or section
   */
  parent: any;
  /**
   * Whether the field is rendered
   */
  render_input: boolean;
  /**
   * The field's value
   */
  value?: string | number | null;
  /**
   * Returns if the field has a value
   */
  guardian_has_value?: boolean;
  /**
   * The field's last known value
   */
  last_value?: any;
  /**
   * The field's label area
   */
  label_area?: HTMLLabelElement; // Label element
  /**
   * The field's label span
   */
  label_span?: HTMLLabelElement; // Label's span element
  /**
   * The field's input HTML Element
   */
  input?: HTMLInputElement | HTMLTextAreaElement; // Input DOM element
  /**
   * The field's input area
   */
  input_area?: HTMLElement; // Input container
  /**
   * The field's JQuery input
   */
  $input?: JQuery<HTMLElement>; // jQuery reference to input element
  /**
   * The field's input area JQuery wrapper
   */
  $input_area?: JQuery<HTMLElement>; // jQuery reference to input container
  /**
   * The field's JQuery input wrapper
   */
  $input_wrapper?: JQuery<HTMLElement>; // Wrapper for the input area
  /**
   * The field's wrapper JQuery element
   */
  $wrapper?: JQuery<HTMLElement>; // Wrapper for the entire field
  /**
   * The field's display area
   */
  disp_area?: HTMLElement; // Display area
  /**
   * The field's status input
   * @example "Write", "Read"
   */
  disp_status?: string;
  /**
   * The field's tooltip JQuery element
   */
  tooltip?: JQuery<HTMLElement>; // Tooltip element
  /**
   * Reference to the layout object
   */
  layout?: any; // Reference to the layout object
  /**
   * The field's section
   */
  section?: any; // Parent section object
  /**
   * The field's awesomeplete instance
   */
  awesomplete?: any; // Autocomplete handler (if applicable)
  /**
   * The field's datepicker instance
   */
  datepicker?: any; // Datepicker instance (for date fields)
  /**
   * The field's datepicker options
   */
  datepicker_options?: Record<string, any>; // Datepicker configuration options
  /**
   * Whether to translate the values
   */
  translate_values?: boolean; // Whether to translate values
  /**
   * Value-to-title mapping
   */
  title_value_map?: Record<string, string>; // Value-to-title mapping
  /**
   * Metadata of the field's doctype
   */
  meta?: DocMeta; // Metadata of the field's doctype
  /**
   * The field's grid instance.
   * @example "Grid"
   */
  grid?: GridForm
  [key: string]: any; // Additional dynamic properties
}

type FieldsDict = Record<string, FieldDict>

/**
 * Represents a field in a Frappe Doctype.
 */
export interface DocField {
  // Basic Field Attributes
  /**
   * filters for this field.
   * It must be something like [[<doctype>, <field>, <condition>, <value>]]
   * [
   *  ["Item", "item_group", "=", "Products"], 
   *  ["Bank Account", "account_type", "=", "Bank"], 
   *  ["Bank Account", "group_or_ledger", "!=", "Group"]
   * ]
   * 
   */
  link_filters?: string;
  fieldname: string; // Internal name of the field
  label: string; // Label displayed for the field
  /**
   * The type of the field.
   * Possible values:
   * - "Data": A text field for short inputs.
   * - "Link": Links to another DocType.
   * - "Dynamic Link": A dynamic link field.
   * - "Check": A checkbox for boolean values.
   * - "Select": A dropdown with predefined options.
   * - "Table": Embeds a child table.
   * - "Attach": Allows file attachments.
   * - "Attach Image": Specifically for image attachments.
   * - "Text": A multiline text field.
   * - "Small Text": A single-line text field.
   * - "Text Editor": A rich-text editor.
   * - "Date": For selecting dates.
   * - "Datetime": For selecting both date and time.
   * - "Barcode": For barcode inputs.
   * - "Button": A clickable button for actions.
   * - "Code": A code editor for scripting inputs.
   * - "Color": A color picker.
   * - "Currency": For monetary values.
   * - "Float": For decimal numbers.
   * - "Int": For integer numbers.
   * - "Time": For selecting time.
   * - "Rating": For star-based ratings.
  */
  fieldtype: string// Type of the field (e.g., Data, Link, Select)

  // Metadata
  doctype?: string; // Always "DocField"
  dt?: string; // Parent Doctype this field belongs to
  creation?: string; // Timestamp of creation
  modified?: string; // Timestamp of last modification
  modified_by?: string; // User who last modified the field
  owner?: string; // User who created the field
  idx?: number; // Index of the field in the Doctype
  name?: string; // Unique name of the field in the DocField table

  // Permissions and Behavior
  allow_in_quick_entry?: boolean; // Whether the field is allowed in Quick Entry
  allow_on_submit?: boolean; // Whether the field is editable after submission
  ignore_user_permissions?: boolean; // Bypass user permissions
  permlevel?: number; // Permission level for the field
  read_only?: boolean; // Whether the field is read-only
  reqd?: boolean; // Whether the field is required
  unique?: boolean; // Whether the field value must be unique

  // Display and Layout
  bold?: boolean; // Whether the label is displayed in bold
  hidden?: boolean; // Whether the field is hidden
  collapsible?: boolean; // Whether the field is collapsible
  columns?: number; // Number of columns the field spans
  translatable?: boolean; // Whether the field is translatable
  in_list_view?: boolean; // Whether the field appears in the List View
  in_preview?: boolean; // Whether the field appears in Preview
  in_global_search?: boolean; // Whether the field is included in global search
  in_standard_filter?: boolean; // Whether the field is included in standard filters

  // Printing and Reporting
  print_hide?: boolean; // Whether the field is hidden in print view
  print_hide_if_no_value?: boolean; // Whether to hide the field if it has no value in print view
  report_hide?: boolean; // Whether the field is hidden in reports

  // Options and Customization
  options?: string | string[]; // Additional options specific to the field type (e.g., "Link" to a Doctype)
  fetch_if_empty?: boolean; // Whether to fetch the value if empty
  is_custom_field?: boolean; // Whether the field is a custom field
  is_virtual?: boolean; // Whether the field is virtual
  is_system_generated?: boolean; // Whether the field is system-generated
  length?: number; // Maximum length of the field value
  precision?: string | number; // Precision for numeric fields
  linked_document_type?: string; // Type of the linked document (for Link fields)

  // Parent and Links
  parent?: string; // Parent Doctype this field belongs to
  parentfield?: string; // Parent field
  parenttype?: string; // Parent type
  links?: any[]; // Links associated with the field

  // Validation and Constraints
  ignore_xss_filter?: boolean; // Whether to ignore XSS filter
  no_copy?: boolean; // Whether the field value is not copied when duplicating
  non_negative?: boolean; // Whether the value must be non-negative

  // States and Dashboards
  states?: any[]; // Workflow states
  show_dashboard?: boolean; // Whether the field appears in the dashboard

  // Advanced Behavior
  hide_border?: boolean; // Whether the field's border is hidden
  hide_days?: boolean; // Whether to hide day selection (for time/date fields)
  hide_seconds?: boolean; // Whether to hide seconds (for time fields)
  __default_value?: any; // Default value for the field (if applicable)

  // Search and Indexing
  search_fields?: string; // Fields used for searching
  search_index?: boolean; // Whether the field is indexed for search

  // Sorting
  sort_options?: number; // Sorting options for the field

  // Permissions
  permissions?: any[]; // Field-specific permissions

  // Custom Properties
  [key: string]: any; // Catch-all for additional custom properties
}

/**
 * Represents metadata for a Doctype.
 */
interface DocMeta {
  name: string; // Name of the Doctype
  module: string; // Module where the Doctype belongs
  fields: DocField[]; // Array of fields in the Doctype
  is_submittable: boolean; // Indicates if the Doctype is submittable
  issingle: boolean; // Indicates if the Doctype is a single document
  istable: boolean; // Indicates if the Doctype is a child table
  allow_import: boolean; // Indicates if data import is allowed
  allow_rename: boolean; // Indicates if renaming is allowed
  track_changes: boolean; // Indicates if changes are tracked
  quick_entry: boolean; // Indicates if quick entry is enabled
  hide_toolbar: boolean; // Indicates if the toolbar is hidden
  beta: boolean; // Indicates if the Doctype is in beta
  autoname: string; // Naming rule for the Doctype
  sort_field: string; // Default sort field
  sort_order: string; // Default sort order
  default_print_format: string; // Default print format
  fields_map?: Record<string, DocField>; // Map of fields for quick lookup
  [key: string]: any; // Catch-all for additional metadata properties
}


interface FrappeExtendedFunctions {
  /**
   * Ensures the existence of a nested namespace or object.
   * If the namespace doesn't exist, it initializes it as an empty object.
   * @param namespace - The dot-separated namespace string to provide.
   */
  provide(namespace: string): void;
  /**
    * Fetches a document from the local cache.
    *
    * @param doctype - The name of the DocType.
    * @param name - The unique identifier (name) of the document, or an object with filters to fetch a matching document.
    * @returns The document object if found, or `null` if not found.
    *
    * @example
    * // Fetch a specific document by name
    * const doc = frappe.get_doc("Item", "ITEM-0001");
    * console.log(doc?.item_name); // Access fields in the document
    *
    * // Fetch a document using filters
    * const doc = frappe.get_doc("Item", { item_group: "Products" });
    * console.log(doc?.item_name); // Access fields in the matching document
    *
    * @see {@link https://frappeframework.com/docs/user/en/api/database#frappe.db.get_doc}
    */
  get_doc: <T extends Record<string, any> = Record<string, any>>(
    doctype: string,
    name?: string | Record<string, any>
  ) => T | null;

  /**
  * Fetches the metadata of a specified Doctype.
  *
  * @param doctype - The name of the Doctype to fetch metadata for.
  * @returns The metadata object containing information about the Doctype.
  *
  * @example
  * const meta = frappe.model.get_meta("Warranty Claim - Inverters");
  * console.log(meta.fields); // Array of fields in the Doctype
  *
  * @see {@link https://frappeframework.com/docs/user/en/api/model#get_meta}
  */
  get_meta: (doctype: string) => DocMeta | undefined;
  /**
  * Displays a confirmation dialog with "Yes" and "No" buttons.
  *
  * @param message - The confirmation message to display.
  * @param yesAction - Callback executed when the user clicks "Yes".
  * @param noAction - Optional. Callback executed when the user clicks "No".
  *
  * @example
  * frappe.confirm("Are you sure?", () => {
  *   console.log("Confirmed!");
  * }, () => {
  *   console.log("Cancelled!");
  * });
  *
  * @see {@link https://frappeframework.com/docs/user/en/api/dialog#frappe-confirm}
  */
  confirm: (message: string, yesAction: () => void, noAction?: () => void) => DialogInstance;

  /**
   * Prompts the user with a dialog to enter one or more values.
   *
   * @param fields - A single field label, a field configuration, or an array of field configurations.
   * @param callback - A function executed with the entered values when the user submits the dialog.
   * @param options - Optional. Dialog options like title and button label.
   *
   * @example
   * // Single value prompt
   * frappe.prompt('First Name', ({ value }) => console.log(value));
   *
   * @example
   * // Multiple fields
   * frappe.prompt([
   *   { label: 'First Name', fieldname: 'first_name', fieldtype: 'Data' },
   *   { label: 'Last Name', fieldname: 'last_name', fieldtype: 'Data' }
   * ], (values) => console.log(values));
   *
   * @see {@link https://frappeframework.com/docs/user/en/api/form#frappe-prompt}
   */
  prompt: (
    fields: string | DialogField[],
    callback: (values: Record<string, any>) => void,
    options?: { title?: string; primary_action_label?: string }
  ) => void;


  /**
   * Displays a message in an alert dialog.
   *
   * @param message - The message to display.
   * @param callback - Optional. Callback executed when the dialog is closed.
   *
   * @example
   * frappe.msgprint("This is an alert!", () => {
   *   console.log("Alert dismissed");
   * });
   *
   * @example
   * frappe.msgprint({
   *   title: "⚠️ Campos obrigatórios ausentes",
   *   indicator: "red",
   *   message: `
   *     <p>Os seguintes campos são obrigatórios para continuar:</p>
   *     <ul>${missing_fields.map((label) => `<li>${label}</li>`).join("")}</ul>
   *   `,
   * });
   *
   * @see {@link https://frappeframework.com/docs/user/en/api/dialog#frappe-msgprint}
   */
  msgprint: {
    (message: string, title?: string, is_minimizable?: boolean): void;
    (options: {
      title?: string;
      indicator?: string;
      message: string;
    }): void;
  };

  /**
   * 
   */
  validated: boolean;


  /**
   * Displays a floating alert message on the screen.
   *
   * The `show_alert` method can display a message with optional indicators, subtitles, and actions.
   * It can also auto-dismiss after a specified number of seconds.
   *
   * @param message - The message to display. It can be a string or an object containing additional options.
   * @param seconds - Optional. Duration in seconds before the alert disappears (default: 7).
   * @param actions - Optional. Actions to associate with the alert, where keys are action names, and values are callback functions.
   *
   * @returns The alert element as a jQuery object.
   *
   * @example
   * // Simple message
   * frappe.show_alert("Operation successful!");
   *
   * @example
   * // Custom options
   * frappe.show_alert({
   *   message: "File uploaded successfully",
   *   indicator: "green",
   *   subtitle: "Your file is now available.",
   *   body: "<a href='/files/sample.pdf'>Download here</a>"
   * }, 5);
   *
   * @example
   * // Alert with actions
   * frappe.show_alert({
   *   message: "You have unsaved changes",
   *   indicator: "orange",
   *   actions: {
   *     save: () => console.log("Save action clicked"),
   *     discard: () => console.log("Discard action clicked"),
   *   }
   * });
  */
  show_alert: (
    message: string | {
      message: string;
      subtitle?: string;
      body?: string;
      indicator?: "orange" | "yellow" | "blue" | "green" | "red" | string; // Add string for custom indicators
    },
    seconds?: number,
    actions?: Record<string, () => void>
  ) => JQuery<HTMLElement>;


  /**
   * Creates a new document and navigates to its form view.
   * @template T - The type of the document being created.
   * @param doctype - The DocType of the document to create.
   * @param options - Key-value pairs to pre-fill fields.
   * @param init_callback - A callback executed after initialization.
   */
  new_doc<T = any>(
    doctype: string,
    options?: Partial<T>,
    init_callback?: (doc: T) => void
  ): void;


  /**
   * Navigates to a specific route in the application.
   * @param route - The route to navigate to.
   */
  set_route(route: string | string[]): void;

  /**
   * Calls a server-side function via RPC.
   * @param options - RPC call options.
   * @param freeze - Whether to freeze the UI during the call.
   * @param quiet - Whether to suppress error messages.
   * @param callback - A callback executed
   * @param args - Arguments to pass to the server function.
   * @returns A promise resolving with the server response.
   */
  call<T = any>(options: {
    method: string;
    args?: Record<string, any>;
    freeze?: boolean;
    quiet?: boolean;
    callback?: (response: { message: T }) => void;
  }): Promise<T>;

  /**
   * Throws an error with a custom message.
   * @param message - The error message.
   */
  throw: {
    (message: string, title?: string, is_minimizable?: boolean): void;
    (options: {
      title?: string;
      indicator?: string;
      message: string;
    }): void;
  };

  /**
   * Returns the current route.
   */
  get_route(): string[];

  /**
   * Returns the stringified current route.
   */
  get_route_str(): string;

  /**
   * Returns the current session information.
   */
  session: {
    logged_in_user: string; // The current logged-in user.
    user: string; // The current user.
    user_email: string; // The email of the current user.
    user_fullname: string; // The full name of the current user.
  }

  /**
   * Whether to open links in a new tab.
   * It is default false.
   * Works together with set_route function.
   */
  open_in_new_tab: boolean; // Whether to open links in a new tab.

  /**
   *
   * Set the route (push state) with given arguments.
   * example 1: frappe.set_route('a', 'b', 'c');
   * example 2: frappe.set_route(['a', 'b', 'c']);
   * frappe.set_route('a/b/c');
   * ["List", "Sales Order"] => /sales-order
   * ["Form", "Sales Order", "SO-0001"] => /sales-order/SO-0001
   * ["Tree", "Account"] = /account/view/tree
   * In case you want to open in a new tab, set frappe.open_in_new_tab = true
   */
  set_route: (route: string | string[]) => void;

  /**
   * Wrapper for server calls in Frappe, returning a promise.
   * Simplifies interaction with server-side methods by avoiding callbacks.
   * 
   * Makes a server-side method call and returns a promise.
   * @param method - The fully qualified name of the server-side method (e.g., "app.module.method").
   * @param params - Parameters to pass to the method as key-value pairs.
   * @returns A promise resolving with the response from the server
   * @see {@link https://frappeframework.com/docs/user/en/api/server#xcall Frappe xcall Documentation}
  */
  xcall: (method: string, params?: Record<string, any>) => Promise<any>;


}

/**
 * Represents a grid row inside a Frappe child table.
 */
interface CurGrid {
  /** Column definitions for the grid row. */
  columns: Record<string, any>;

  /** List of columns in the grid. */
  columns_list: any[];

  /** The document data for this grid row. */
  doc: {
    docstatus: number; // 0 = Draft, 1 = Submitted, 2 = Canceled
    doctype: string; // The child table doctype name
    name: string; // Unique identifier of the row (e.g., "new-corrections-tracker-xyz")
    __islocal: number; // 1 if the row is newly added and not yet saved
    __unsaved: number; // 1 if the row has unsaved changes
  };

  /** List of fields defined for the grid row. */
  docfields: any[];

  /** Whether the grid row has focus. */
  focus_set: boolean;

  /** Reference to the parent form (main document). */
  frm: FrappeUIForm;

  /** Reference to the grid that contains this row. */
  grid: FrappeGrid;

  /** Reference to the form layout for the grid row when expanded. */
  grid_form: GridForm;

  /** List of fields that are displayed in the grid. */
  on_grid_fields: any[];

  /** Dictionary of fields displayed in the grid. */
  on_grid_fields_record: Record<string, any>;

  /** Button to open the full form of the child row. */
  open_form_button: JQuery<HTMLElement>;

  /** Parent HTML element of the row. */
  parent: JQuery<HTMLElement>;

  /** Metadata of the parent table field that contains this grid. */
  parent_df: {
    doctype: string;
    name: string;
    creation: string;
    modified: string;
    modified_by: string;
  };

  /** jQuery object representing the row element. */
  row: JQuery<HTMLElement>;

  /** Checkbox element for selecting the row. */
  row_check: JQuery<HTMLElement>;

  /** HTML string representing the row checkbox. */
  row_check_html: string;

  /** Row index element (displays row number). */
  row_index: JQuery<HTMLElement>;

  /** Search columns for filtering rows in the grid. */
  search_columns: Record<string, any>;

  /** The wrapper element for the grid row. */
  wrapper: JQuery<HTMLElement>;

  // ────────────────────────────────────────────────────────────────────────────────
  // METHODS
  // ────────────────────────────────────────────────────────────────────────────────

  /**
   * Activates the grid row for editing.
   */
  activate(): void;

  /**
   * Adds a button to open the full form for this row.
   */
  add_open_form_button(): void;

  /**
   * Handles pagination when navigating through rows.
   * @param e - The event triggering the page change.
   */
  change_page_if_reqd(e: any): void;

  /**
   * Retrieves a specific field within the row.
   * @param fieldname - The name of the field to retrieve.
   * @returns The field object.
   */
  get_field(fieldname: string): any;

  /**
   * Gets the expanded form view of the current grid row, if open.
   * @returns The form object if open, otherwise `null`.
   */
  get_open_form(): any;

  /**
   * Returns the list of visible columns in the grid.
   * @param extraColumns - Additional columns to include.
   * @returns An array of visible column definitions.
   */
  get_visible_columns(extraColumns?: any[]): any[];

  /**
   * Hides the grid row form if it is currently open.
   */
  hide_form(): void;

  /**
   * Inserts a new row into the grid.
   * @param e - Event object.
   * @param t - Unused parameter.
   * @param n - Unused parameter.
   */
  insert(e: any, t: any, n: any): void;

  /**
   * Initializes the grid row layout.
   */
  make(): void;

  /**
   * Creates a new column in the grid.
   * @param e - Field definition.
   * @param t - Column index.
   * @param n - Unused parameter.
   * @param r - Unused parameter.
   */
  make_column(e: any, t: any, n: any, r: any): void;

  /**
   * Creates an editable input field for a given column.
   * @param e - Object containing field and field area.
   */
  make_control(e: { field_area: JQuery<HTMLElement>; df: any }): void;

  /**
   * Enables editing mode for the row.
   */
  make_editable(): void;

  /**
   * Moves the focus within the grid.
   */
  move(): void;

  /**
   * Opens the next row in the grid.
   */
  open_next(): void;

  /**
   * Opens the previous row in the grid.
   */
  open_prev(): void;

  /**
   * Opens a specific row in the grid by its index.
   * @param index - The index of the row to open.
   */
  open_row_at_index(index: number): void;

  /**
   * Refreshes the grid row UI.
   */
  refresh(): void;

  /**
   * Refreshes the checkbox state of the row.
   */
  refresh_check(): void;

  /**
   * Refreshes a specific field in the row.
   * @param fieldname - The field to refresh.
   * @param docname - Optional: The name of the document to refresh.
   */
  refresh_field(fieldname: string, docname?: string): void;

  /**
   * Removes the row from the grid.
   */
  remove(): void;

  /**
   * Renders the row's UI.
   * @param e - Unused parameter.
   */
  render_row(e: any): void;

  /**
   * Resets the user settings for the grid.
   */
  reset_user_settings_for_grid(): void;

  /**
   * Sets the keyboard navigation for the grid.
   * @param e - The event object.
   */
  set_arrow_keys(e: any): void;

  /**
   * Updates the grid data.
   */
  set_data(): void;

  /**
   * Updates a specific property of a field.
   * @param fieldname - The field to update.
   * @param property - The property to modify.
   * @param value - The new value.
   */
  set_field_property(fieldname: string, property: string, value: any): void;

  /**
   * Updates the row index values.
   */
  set_row_index(): void;

  /**
   * Configures the grid columns.
   */
  setup_columns(): void;

  /**
   * Opens the detailed form view for the grid row.
   */
  show_form(): void;

  /**
   * Toggles the display of a field in the row.
   * @param fieldname - The field to toggle.
   * @param show - `true` to show, `false` to hide.
   */
  toggle_display(fieldname: string, show: boolean): void;

  /**
   * Toggles whether the row is editable.
   * @param e - The event object.
   * @param t - Unused parameter.
   */
  toggle_editable(e: any, t: any): void;

  /**
   * Toggles whether a field is required.
   * @param e - The fieldname.
   * @param t - `true` to make it required, `false` to remove the requirement.
   */
  toggle_reqd(e: any, t: any): void;

  /**
   * Toggles the view mode of the row.
   * @param e - The event object.
   * @param t - Unused parameter.
   */
  toggle_view(e: any, t: any): void;
}

interface FrappeUIForm {
  docname: string;
  doctype: string;
  in_form: boolean;
  hidden: boolean;
  fields_record: Record<string, any>;
  refresh_field(fieldname: string): void;
  set_df_property(fieldname: string, property: string, value: any): void;
}

interface FrappeGrid {
  frm: FrappeUIForm;
  df: any;
  parent: JQuery<HTMLElement>;
  control: any;
  fieldinfo: Record<string, any>;
  user_defined_columns?: any[];

  update_docfield_property(fieldname: string, property: string, value: any): void;
  refresh(): void;
  refresh_row(docname: string): void;
}

interface FrappeGrid {
  frm: FrappeUIForm;
  df: any;
  parent: JQuery<HTMLElement>;
  control: any;
  fieldinfo: Record<string, any>;
  user_defined_columns?: any[];

  update_docfield_property(fieldname: string, property: string, value: any): void;
  refresh(): void;
  refresh_row(docname: string): void;
}

interface GridForm {
  row: CurGrid;
  wrapper: JQuery<HTMLElement>;
  form_area: JQuery<HTMLElement>;
  layout: any;
  fields: any[];
  set_value(fieldname: string, value: any, doc: FrappeDoc): void;
}


interface TabVersion {
  ref_doctype: string;
  ref_docname: string;
  data: string;
  owner: string;
  creation: string;
}

interface VersionData {
  changed: [string, string | number | null, string | number | null][];
}


/**
 * Core types namespace, bundling together related structures.
 */
export type core = {
  FrappeDoc: FrappeDoc;
  FrappeForm: FrappeForm;
};