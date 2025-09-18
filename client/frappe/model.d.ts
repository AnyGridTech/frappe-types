// frappe/model.d.ts
import { FrappeDoc } from "./core";

/**
 * Represents the Frappe model module, which provides utilities for managing and manipulating documents and their fields.
 * 
 * @see {@link https://frappeframework.com/docs/user/en/api/model}
 */
export interface model {

  /**
   * A list of field types that do not have values (e.g., layout fields).
   */
  no_value_type: string[];

  /**
   * A list of layout fields (e.g., "Section Break", "Column Break").
   */
  layout_fields: string[];

  /**
   * A list of standard fields included in all documents.
   */
  std_fields_list: string[];

  /**
   * A list of fields that define child table relationships.
   */
  child_table_field_list: string[];

  /**
   * A list of core DocTypes essential to the system.
   */
  core_doctypes_list: string[];

  /**
   * A list of restricted fields that cannot be modified directly.
   */
  restricted_fields: string[];

  /**
   * A list of field types that render as HTML.
   */
  html_fieldtypes: string[];

  /**
   * A list of numeric field types (e.g., "Int", "Float").
   */
  numeric_fieldtypes: string[];

  /**
   * A mapping of event handlers for DocTypes and fields.
   */
  events: Record<string, any>;

  /**
   * Stores metadata for documents managed by the system.
   */
  user_settings: Record<string, any>;

  /**
   * Determines if a field type has a value.
   *
   * @param fieldtype - The field type to check.
   * @returns True if the field type has a value, otherwise false.
   */
  is_value_type(fieldtype: string | { fieldtype: string }): boolean;

  /* help: Attach a trigger on change of a particular field.
		To trigger on any change in a particular doctype, use fieldname as "*"
		*/
		/* example: frappe.model.on("Customer", "age", function(fieldname, value, doc) {
		  if(doc.age < 16) {
		   	frappe.msgprint("Warning, Customer must atleast be 16 years old.");
		    raise "CustomerAgeError";
		  }
		}) 
  */
  on(doctype: string, fieldname: string, fn: (params: any) => void): void;

  /**
   * Checks if a field is non-standard.
   *
   * @param fieldname - The field name to check.
   * @returns True if the field is non-standard, otherwise false.
   */
  is_non_std_field(fieldname: string): boolean;

  /**
   * Retrieves a standard field definition by its name.
   *
   * @param fieldname - The name of the field to retrieve.
   * @param ignore - If true, missing fields are ignored, and a default object is returned.
   * @returns The field definition object.
   */
  get_std_field(fieldname: string, ignore?: boolean): any;

  /**
   * Retrieves data from local storage for a specific DocType.
   *
   * @param doctype - The name of the DocType.
   * @returns The stored data, or undefined if not found.
   */
  get_from_localstorage(doctype: string): any;

  /**
   * Stores data in local storage for a specific DocType.
   *
   * @param doctype - The name of the DocType.
   * @param docs - The data to store.
   */
  set_in_localstorage(doctype: string, docs: any[]): void;

  /**
   * Clears all local storage data related to documents.
   */
  clear_local_storage(): void;

  /**
   * Removes a document from local storage and clears associated data.
   *
   * @param doctype - The DocType of the document.
   * @param name - The name of the document.
   */
  remove_from_locals(doctype: string, name: string): void;

  /**
   * Checks if a DocType is a tree structure.
   *
   * @param doctype - The name of the DocType.
   * @returns True if the DocType is a tree, otherwise false.
   */
  is_tree(doctype: string): boolean;

  /**
   * Checks if a document has been recently loaded.
   *
   * @param doc - The document to check.
   * @returns True if the document is fresh, otherwise false.
   */
  is_fresh(doc: Record<string, any>): boolean;

  /**
   * Validates that a field in a document is not missing.
   *
   * @param doc - The document to validate.
   * @param fieldname - The name of the field to check.
   */
  validate_missing(doc: Record<string, any>, fieldname: string): void;

  /**
   * Retrieves the full SQL column name for a field.
   *
   * @param fieldname - The field name.
   * @param doctype - The DocType of the field.
   * @returns The full column name in SQL.
   */
  get_full_column_name(fieldname: string, doctype: string): string;

  /**
   * Checks if a field type is numeric.
   *
   * @param fieldtype - The field type to check.
   * @returns True if the field type is numeric, otherwise false.
   */
  is_numeric_field(fieldtype: string | { fieldtype: string }): boolean;

  /**
   * Triggers an event for a document field.
   *
   * @param fieldname - The name of the field to trigger.
   * @param value - The value to pass to the event.
   * @param doc - The document object.
   * @param skip_dirty_trigger - Optional. If true, skips the dirty trigger.
   */
  trigger(
    fieldname: string,
    value: any,
    doc: Record<string, any>,
    skip_dirty_trigger?: boolean
  ): void;

  /**
   * Retrieves the list of no-copy fields for a specific DocType.
   *
   * @param doctype - The name of the DocType.
   * @returns An array of no-copy field names.
   */
  get_no_copy_list(doctype: string): string[];

  /**
   * Renames a document with a new name.
   *
   * @param doctype - The DocType of the document.
   * @param docname - The current name of the document.
   * @param callback - A callback function to execute after renaming.
   */
  rename_doc(
    doctype: string,
    docname: string,
    callback?: (newName: string) => void
  ): void;
  /**
   * Ensures that a Doctype is loaded into the client-side model.
   *
   * @param doctype - The name of the Doctype to load.
   * @param callback - A function to execute after the Doctype is loaded.
   *                   Receives the server response as an argument.
   * @param async - Optional. Whether the call should be asynchronous. Defaults to true.
   * @returns A Promise that resolves once the Doctype is loaded.
   *
   * @example
   * frappe.model.with_doctype("Warranty Claim - Inverters", (response) => {
   *     console.log("Doctype loaded:", response?.docs);
   * }).then(() => {
   *     console.log("Doctype metadata available.");
   * }).catch(err => {
   *     console.error("Error loading Doctype:", err);
   * });
   */
  with_doctype: (
    doctype: string,
    callback?: (response?: {
      message?: "use_cache" | any;
      exc?: string;
      docs?: any[];
      user_settings?: Record<string, any>;
    }) => void,
    async?: boolean
  ) => Promise<any>;

  /**
   * Fetches a document from the server and caches it locally.
   *
   * @param doctype - The name of the Doctype to fetch.
   * @param name - The name of the document to retrieve.
   * @param callback - Optional. A function to execute after the document is fetched.
   *                   Receives the document as an argument.
   *
   * @example
   * frappe.model.with_doc("Task", "TASK0001", (name, doc) => {
   *     console.log("Task fetched:", doc);
   * });
   * 
  */
  with_doc: <T = { name: string, idx: number, docstatus: number, [key: string]: any }>(
    doctype: string,
    name: string,
    callback?: (name: string, response: { docs: T[] }) => void
  ) => Promise<void>

  /**
   * Creates a new child table row and appends it to the specified child table field.
   * 
   * @param parentDoc - The parent document object to which the child table belongs.
   * @param childTableField - The name of the child table field (e.g., "items").
   * @param values - Optional. Initial values to set for the child row.
   * @returns The created child table row object.
   * 
   * @example
   * const child = frappe.model.add_child(doc, "items", { item_code: "ITEM001" });
   * console.log(child.item_code); // "ITEM001"
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/model#add_child}
   */
  add_child: <T = any>(
    parentDoc: Record<string, any>,
    childTableField: string,
    values?: Partial<T>
  ) => T;

  /**
   * Removes a child table row from the specified child table field.
   * 
   * @param parentDoc - The parent document object to which the child table belongs.
   * @param childDoc - The child table row object to remove.
   * 
   * @example
   * const child = doc.items[0];
   * frappe.model.delete_child(doc, child);
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/model#delete_child}
   */
  delete_child: (
    parentDoc: Record<string, any>,
    childDoc: Record<string, any>
  ) => void;

  /**
   * Sets the value of a field in a document or updates multiple fields in bulk.
   * 
   * @param doctypeOrDoc - The document object or the doctype name.
   * @param docnameOrFieldname - The document name or the fieldname (if `doctypeOrDoc` is a string).
   * @param fieldnameOrValue - The fieldname or the value (if `doctypeOrDoc` is a string).
   * @param value - The value to assign to the field (if `doctypeOrDoc` is a string).
   * @param fieldtype - The type of the field being updated (e.g., "Link", "Dynamic Link").
   * @param skip_dirty_trigger - If true, skips triggering the "dirty" state for the document.
   * 
   * @returns A Promise that resolves when all triggers have been executed.
   * 
   * @example
   * // Update a single field
   * frappe.model.set_value("Sales Invoice", "SINV-0001", "status", "Completed");
   * 
   * @example
   * // Update multiple fields
   * frappe.model.set_value("Sales Invoice", "SINV-0001", { status: "Completed", remarks: "Checked" });
   * 
   * @example
   * // Update a document directly
   * frappe.model.set_value(doc, "status", "Completed");
   */
  set_value: (
    doctypeOrDoc: string | Record<string, any>, // Can be either a string (doctype) or an object (doc)
    docnameOrFieldname: string | Record<string, any>, // Can be docname (if doctype is string) or fieldname (if doc is passed)
    fieldnameOrValue?: string | any, // Fieldname (if doctype is string) or value (if doc is passed)
    value?: any, // Value to assign (only if doctype is string and fieldname is provided)
    fieldtype?: string, // Optional field type ("Link", "Dynamic Link", etc.)
    skip_dirty_trigger?: boolean // Optional flag to skip dirty triggers
  ) => void;


  /**
   * Copies the values of all fields from one document to another.
   * 
   * @param sourceDoc - The source document from which to copy values.
   * @param targetDoc - The target document to which values will be copied.
   * 
   * @example
   * frappe.model.copy_values(sourceDoc, targetDoc);
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/model#copy_values}
   */
  copy_values: (
    sourceDoc: Record<string, any>,
    targetDoc: Record<string, any>
  ) => void;

  /**
   * Clears the values of all fields in a document, effectively resetting it.
   * 
   * @param doc - The document object to clear.
   * 
   * @example
   * frappe.model.clear_table(doc.items);
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/model#clear_table}
   */
  clear_table: (doc: Record<string, any>) => void;

  /**
   * Populates the `__islocal` property for a newly created document.
   * 
   * @param doc - The document object to mark as local.
   * 
   * @example
   * frappe.model.set_new(doc);
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/model#set_new}
   */
  set_new: (doc: Record<string, any>) => void;

  /**
   * Deletes a specified document object from the local model cache.
   * 
   * @param doc - The document object to delete.
   * 
   * @example
   * frappe.model.delete_doc(doc);
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/model#delete_doc}
   */
  delete_doc: (doc: Record<string, any>) => void;

  /**
   * Retrieves a document object from the local cache or initializes it if not already present.
   * 
   * @param doctype - The DocType of the document.
   * @param name - The name of the document.
   * @returns The document object.
   * 
   * @example
   * const doc = frappe.model.get_doc("Task", "TASK0001");
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/model#get_doc}
   */
  get_doc: <T = any>(doctype: string, name: string) => T;

  /**
   * Initializes a new document with the specified DocType and default values.
   * 
   * @param doctype - The DocType of the new document.
   * @param values - Optional. Initial values to set for the document.
   * @returns The newly created document object.
   * 
   * @example
   * const doc = frappe.model.create_new("Task", { subject: "New Task" });
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/model#create_new}
   */
  create_new: <T = any>(
    doctype: string,
    values?: Partial<T>
  ) => T;

  /**
   * Refreshes a field in a document to ensure its value is up-to-date.
   * 
   * @param doc - The document object containing the field.
   * @param fieldname - The name of the field to refresh.
   * 
   * @example
   * frappe.model.refresh_field(doc, "items");
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/model#refresh_field}
   */
  refresh_field: (doc: Record<string, any>, fieldname: string) => void;

  /**
 * Adds a document to the local cache.
 *
 * @param doc - The document to add.
 * 
 * @see {@link https://frappeframework.com/docs/user/en/api/model#add_to_locals}
 */
  add_to_locals: (doc: Record<string, any>) => void;

  /**
   * A list of all available field types in the system.
   * 
   * @example
   * console.log(frappe.model.all_fieldtypes);
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/model#all_fieldtypes}
   */
  all_fieldtypes: string[];

  /**
   * Checks if a document of the given DocType can be canceled.
   *
   * @param doctype - The DocType to check.
   * @returns True if the document can be canceled, otherwise false.
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/model#can_cancel}
   */
  can_cancel: (doctype: string) => boolean;

  /**
   * Checks if the current user can create a document of the given DocType.
   *
   * @param doctype - The DocType to check.
   * @returns True if the document can be created, otherwise false.
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/model#can_create}
   */
  can_create: (doctype: string) => boolean;

  /**
   * Checks if the current user can delete a document of the given DocType.
   *
   * @param doctype - The DocType to check.
   * @returns True if the document can be deleted, otherwise false.
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/model#can_delete}
   */
  can_delete: (doctype: string) => boolean;

  /**
   * Clears the local cache of documents for the given DocType and name.
   *
   * @param doctype - The DocType to clear.
   * @param name - The name of the document to clear.
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/model#clear_doc}
   */
  clear_doc: (doctype: string, name: string) => void;

  /**
   * Clears all local storage data related to documents and metadata.
   *
   * @example
   * frappe.model.clear_local_storage();
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/model#clear_local_storage}
   */
  clear_local_storage: () => void;

  /**
   * Creates mandatory child documents for a parent document.
   *
   * @param doc - The parent document object.
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/model#create_mandatory_children}
   */
  create_mandatory_children: (doc: Record<string, any>) => void;

  /**
   * Fetches all documents of the specified DocType from the local cache.
   *
   * @param doctype - The DocType to fetch documents for.
   * @returns An array of documents of the specified DocType.
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/model#get_all_docs}
   */
  get_all_docs: (doctype: string) => Record<string, any>[];

  /**
 * Retrieves child table rows from the parent document.
 *
 * @param doctype - The parent document's DocType, or the parent document itself as an object.
 * @param parent - The name of the parent document (if `doctype` is a string).
 * @param parentfield - The name of the child table field in the parent document.
 * @param filters - Optional. Filters to apply to the child table rows.
 * @returns An array of child table rows matching the criteria.
 *
 * @example
 * const children = frappe.model.get_children("Sales Order", "SO-0001", "items", { item_code: "ITEM001" });
 * console.log(children);
 */
  get_children: <T = Record<string, any>>(
    doctype: string | Record<string, any>,
    parent: string,
    parentfield: string,
    filters?: Record<string, any>
  ) => T[];


  /**
   * Fetches a new document for the specified DocType and sets default values.
   *
   * @param doctype - The DocType of the document.
   * @param parent - Optional. Parent document name for hierarchical Doctypes.
   * @param parentField - Optional. Field in the parent to link the new document.
   * @param parentType - Optional. The parent DocType.
   * @returns The newly created document object.
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/model#get_new_doc}
   */
  get_new_doc: (
    doctype: string,
    parent?: string,
    parentField?: string,
    parentType?: string
  ) => FrappeDoc;

  /**
   * Creates and returns a new unique name for a document.
   *
   * @param doctype - The DocType for which to generate a new name.
   * @returns A unique string name for the document.
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/model#get_new_name}
   */
  get_new_name: (doctype: string) => string;

  /**
   * Fetches document metadata from the local cache or the server.
   *
   * @param doctype - The DocType of the document.
   * @returns Metadata for the specified DocType.
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/model#get_std_field}
   */
  get_std_field: (doctype: string, fetchFromServer?: boolean) => any;

  /**
   * Checks if a document has a specific field value.
   *
   * @param doc - The document object.
   * @param fieldname - The field name to check.
   * @param value - The value to verify.
   * @returns True if the value exists, otherwise false.
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/model#has_value}
   */
  has_value: (
    doc: Record<string, any>,
    fieldname: string,
    value: any
  ) => boolean;

  /**
   * Determines if a given DocType has a workflow defined.
   *
   * @param doctype - The DocType to check.
   * @returns True if a workflow exists, otherwise false.
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/model#has_workflow}
   */
  has_workflow: (doctype: string) => boolean;

  /**
   * Validates if a required value is missing for the specified document field.
   *
   * @param doc - The document to validate.
   * @param fieldname - The field name to check.
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/model#validate_missing}
   */
  validate_missing: (doc: Record<string, any>, fieldname: string) => void;

  /**
 * Creates a copy of the given document.
 *
 * @param doc - The document to copy.
 * @param options - Optional settings for copying, including fields to exclude or whether to include child documents.
 * @returns A new document object that is a copy of the original.
 * 
 * @example
 * const copiedDoc = frappe.model.copy_doc(doc, { exclude: ["creation"], includeChildren: true });
 * console.log(copiedDoc);
 */
  copy_doc: (
    doc: Record<string, any>,
    options?: { exclude?: string[]; includeChildren?: boolean }
  ) => Record<string, any>;

  /**
 * Retrieves additional metadata (docinfo) for the specified document.
 *
 * @param doctype - The DocType of the document.
 * @param name - The name of the document.
 * @returns Metadata information for the document, including permissions and comments.
 * 
 * @example
 * const docinfo = frappe.model.get_docinfo("Sales Order", "SO-0001");
 * console.log(docinfo.shared, docinfo.comments);
 */
  get_docinfo: (doctype: string, name: string) => Record<string, any>;

  /**
 * Retrieves information about users who have shared access to the specified document.
 *
 * @param doctype - The DocType of the document.
 * @param name - The name of the document.
 * @returns An object containing details of shared access.
 * 
 * @example
 * const shared = frappe.model.get_shared("Sales Order", "SO-0001");
 * console.log(shared);
 */
  get_shared: (doctype: string, name: string) => UserShared[];


  /**
 * Retrieves the server-side module path for the specified DocType.
 *
 * @param doctype - The name of the DocType.
 * @returns A string representing the server module path for the DocType.
 * 
 * @example
 * const moduleName = frappe.model.get_server_module_name("Sales Order");
 * console.log(moduleName); // "erpnext.selling.doctype.sales_order.sales_order"
 */
  get_server_module_name: (doctype: string) => string;

  /**
 * Renames a document after it has been saved.
 *
 * @param doctype - The DocType of the document.
 * @param name - The current name of the document.
 * 
 * @example
 * frappe.model.rename_after_save("Sales Order", "SO-0001");
 */
  rename_after_save: (doctype: string, name: string) => void;

  /**
 * Synchronizes document data into the local cache.
 *
 * @param docs - An array of documents to sync.
 * 
 * @example
 * frappe.model.sync([{ doctype: "Sales Order", name: "SO-0001" }]);
 */
  sync: (docs: Record<string, any>[]) => void;

  /**
 * Synchronizes additional metadata (`docinfo`) for the specified document.
 *
 * @param doctype - The DocType of the document.
 * @param docname - The name of the document.
 * @param docinfo - The `docinfo` object to sync.
 * 
 * @example
 * frappe.model.sync_docinfo("Sales Order", "SO-0001", { permissions: {}, comments: [] });
 */
  sync_docinfo: (
    doctype: string,
    docname: string,
    docinfo: Record<string, any>
  ) => void;

  /**
 * Updates a document in the local cache.
 *
 * @param doc - The document object with updated values.
 * 
 * @example
 * frappe.model.update_in_locals({ doctype: "Sales Order", name: "SO-0001", status: "Closed" });
 */
  update_in_locals: (doc: Record<string, any>) => void;

  /**
 * Sets default values for a document's fields based on the DocType metadata.
 *
 * @param doc - The document object.
 * @param doctype - The name of the DocType.
 * 
 * @example
 * frappe.model.set_default_values(doc, "Sales Order");
 */
  set_default_values: (doc: Record<string, any>, doctype: string) => void;

  /**
 * Retrieves the default value for a specific field in a DocType.
 *
 * @param doctype - The name of the DocType.
 * @param fieldname - The name of the field.
 * @param doc - Optional. The document object to evaluate context-specific defaults.
 * @returns The default value for the field.
 * 
 * @example
 * const defaultValue = frappe.model.get_default_value("Sales Order", "delivery_date");
 * console.log(defaultValue);
 */
  get_default_value: (
    doctype: string,
    fieldname: string,
    doc?: Record<string, any>
  ) => any;

  /**
 * Retrieves default values for a field from the bootstrapped documents in `frappe.boot`.
 *
 * @param doctype - The name of the DocType.
 * @param fieldname - The name of the field.
 * @param parent_doc - Optional. The parent document object.
 * @returns The default value from bootstrapped documents.
 * 
 * @example
 * const defaultValue = frappe.model.get_default_from_boot_docs("Sales Order", "status");
 * console.log(defaultValue);
 */
  get_default_from_boot_docs: (
    doctype: string,
    fieldname: string,
    parent_doc?: Record<string, any>
  ) => any;

  /**
 * Creates a new document, assigns it a name, and returns the name.
 *
 * @param doctype - The name of the DocType for the new document.
 * @param values - Optional. Initial values to set for the document.
 * @returns The name of the newly created document.
 * 
 * @example
 * const newName = frappe.model.make_new_doc_and_get_name("Sales Order", { customer: "Customer A" });
 * console.log(newName); // e.g., "SO-0001"
 */
  make_new_doc_and_get_name: (
    doctype: string,
    values?: Record<string, any>
  ) => string;

  /**
 * Opens a mapped document based on predefined mapping rules.
 *
 * @param options - Options defining the mapping rules, including source and target DocTypes.
 * 
 * @example
 * frappe.model.open_mapped_doc({ method: "app.module.map_sales_order", source_name: "SO-0001" });
 */
  open_mapped_doc: (options: Record<string, any>) => void;

  /**
 * Rounds numeric fields in a document to the specified precision.
 *
 * @param doc - The document object to round.
 * @param fieldnames - Optional. A list of field names to round.
 * 
 * @example
 * frappe.model.round_floats_in(doc, ["total", "tax"]);
 */
  round_floats_in: (doc: Record<string, any>, fieldnames?: string[]) => void;

  /**
 * Converts a string to a slug-like format (e.g., replacing spaces with underscores).
 *
 * @param text - The input string to scrub.
 * @returns The scrubbed string.
 * 
 * @example
 * const scrubbed = frappe.model.scrub("Sales Order");
 * console.log(scrubbed); // "sales_order"
 */
  scrub: (text: string) => string;

  /**
   * Converts a slug-like string back to a readable format (e.g., replacing underscores with spaces).
   *
   * @param text - The input slug-like string.
   * @returns The unscrubbed, human-readable string.
   * 
   * @example
   * const readable = frappe.model.unscrub("sales_order");
   * console.log(readable); // "Sales Order"
   */
  unscrub: (text: string) => string;
}

export type UserShared = {
  creation: string;
  everyone: number;
  name: string;
  owner: string;
  read: number;
  share: number;
  submit: number;
  user: string;
  write: number;
}