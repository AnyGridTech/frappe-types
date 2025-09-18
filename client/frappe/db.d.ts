// frappe/db.d.ts
import { FrappeForm } from "./core";

/**
 * Represents the database module in Frappe, providing methods for CRUD operations and queries.
 *
 * @see {@link https://frappeframework.com/docs/user/en/api/database}
 */
export interface db {
  update(arg0: string, arg1: { name: any; workflow_state: any; }): unknown;
  /**
   * Inserts a new document into the database.
   *
   * @param doc - The document to insert. Must include the `doctype` and other necessary fields.
   * @returns A promise that resolves to the inserted document.
   *
   * @see {@link https://frappeframework.com/docs/user/en/api/database#frappe.db.insert}
   */
  insert: <T = any>(doc: { doctype: string } & Record<string, any>) => Promise<FrappeForm<T>["doc"]>;

  /**
   * Retrieves a list of records from a specified DocType.
   *
   * @param doctype - The name of the DocType (e.g., "Task").
   * @param options - Options for filtering, fetching, and sorting records.
   * @returns A promise resolving to an array of records matching the criteria.
   *
   * @see {@link https://frappeframework.com/docs/user/en/api/database#frappe.db.get_list}
   */
  get_list: <T = any>(doctype: string, options?: GetListOptions) => Promise<T[]>;

  /**
   * Retrieves a field value or a list of values for a document.
   *
   * @param doctype - The name of the DocType (e.g., "Task").
   * @param nameOrFilters - The document name or filters to match.
   *   - Can be a string representing the document name (e.g., `"TASK00002"`).
   *   - Can also be an object with filters (e.g., `{ status: "Open" }`).
   * @param fieldname - The field or fields to fetch.
   *   - Can be a single field name as a string (e.g., `"subject"`).
   *   - Can also be an array of field names (e.g., `["subject", "description"]`).
   * @param as_dict - Optional. Whether to return the result as a dictionary (default: `false`).
   *   - If `true`, returns an object with field names as keys and their values as properties.
   *   - If `false` or omitted, returns the field value(s) directly.
   * @returns A promise resolving to:
   *   - A single value if `fieldname` is a string.
   *   - An array of values if `fieldname` is an array.
   *   - An object if `as_dict` is set to `true`.
   *
   * @example
   * // Single field value
   * const subject = await frappe.db.get_value("Task", "TASK00002", "subject");
   *
   * @example
   * // Multiple field values
   * const [subject, description] = await frappe.db.get_value(
   *   "Task",
   *   "TASK00002",
   *   ["subject", "description"]
   * );
   *
   * @example
   * // Result as a dictionary
   * const taskDict = await frappe.db.get_value(
   *   "Task",
   *   "TASK00002",
   *   ["subject", "description"],
   *   true
   * );
   * console.log(taskDict.subject, taskDict.description);
   *
   * @example
   * // Using filters
   * const [subject, description] = await frappe.db.get_value(
   *   "Task",
   *   { status: "Open" },
   *   ["subject", "description"]
   * );
   *
   * @see {@link https://frappeframework.com/docs/user/en/api/database#frappe.db.get_value}
   */
  get_value: <T = any>(
    doctype: string,
    nameOrFilters: string | Record<string, any>,
    fieldname?: string | string[],
    callback?: (value: T) => void,
    parent_doc?: string
  ) => Promise<{ message: T }>;

  /**
   * Fetches a single value from a Single DocType.
   *
   * @param doctype - The name of the Single DocType (e.g., "System Settings").
   * @param fieldname - The field to fetch.
   * @returns A promise resolving to the field value.
   *
   * @see {@link https://frappeframework.com/docs/user/en/api/database#frappe.db.get_single_value}
   */
  get_single_value: <T = any>(doctype: string, fieldname: string) => Promise<T>;

  /**
   * Sets a field's value in the database.
   *
   * @param doctype - The name of the DocType (e.g., "Task").
   * @param docname - The name of the document to update.
   * @param fieldname - The field to update.
   * @param value - The value to set.
   * @param callback - A callback function that receives the updated value.
   * @returns A promise resolving when the value is updated.
   *
   * @see {@link https://frappeframework.com/docs/user/en/api/database#frappe.db.set_value}
   */
  set_value: <T>(
    doctype: string,
    docname: string,
    fieldname: string,
    value: T,
    callback: (result: T) => void
  ) => Promise<void>;

  /**
   * Checks if a document exists in the database.
   *
   * @param doctype - The name of the DocType (e.g., "User").
   * @param nameOrFilters - The document name or filters to match.
   * @returns A promise resolving to true if the document exists, false otherwise.
   *
   * @see {@link https://frappeframework.com/docs/user/en/api/database#frappe.db.exists}
   */
  exists: (doctype: string, nameOrFilters: string | Record<string, any>) => Promise<boolean>;

  /**
   * Counts the number of records for a given DocType and filters.
   *
   * @param doctype - The name of the DocType (e.g., "Task").
   * @param filters - Conditions to filter records (e.g., { status: "Open" }).
   * @returns A promise resolving to the count of records.
   *
   * @see {@link https://frappeframework.com/docs/user/en/api/database#frappe.db.count}
   */
  count: (doctype: string, filters?: Record<string, any>) => Promise<number>;

  /**
   * Deletes a document from the database.
   *
   * @param doctype - The name of the DocType (e.g., "Error Log").
   * @param name - The name of the document to delete.
   * @returns A promise resolving when the document is deleted.
   *
   * @see {@link https://frappeframework.com/docs/user/en/api/database#frappe.db.delete_doc}
   */
  delete_doc: (doctype: string, name: string) => Promise<void>;

  /**
   * Retrieves the options for a Link field.
   *
   * @param doctype - The name of the DocType the Link field belongs to.
   * @param txt - Text to filter the options by.
   * @param filters - Additional filters for the query.
   * @returns A promise resolving to the available options.
   *
   * @see {@link https://frappeframework.com/docs/user/en/api/database#frappe.db.get_link_options}
   */
  get_link_options: (doctype: string, txt?: string, filters?: Record<string, any>) => Promise<string[]>;

  /**
   * Fetches a document by name.
   *
   * @param doctype - The name of the DocType.
   * @param name - The name of the document.
   * @param fields - The fields to fetch.
   * @returns A promise resolving to the document.
   *
   * @see {@link https://frappeframework.com/docs/user/en/api/database#frappe.db.get_doc}
   */
  get_doc: <T>(doctype: string, name: string, filters?: Record<string, any>) => Promise<FrappeForm<T>["doc"]>;
}

/**
 * Supported operators for filters in Frappe queries.
 *
 * @see {@link https://frappeframework.com/docs/user/en/api/database#frappe.db.get_list}
 */
type Operator =
  | '='
  | '!='
  | '>'
  | '<'
  | '>='
  | '<='
  | 'in'
  | 'not in'
  | 'like'
  | 'not like'
  | 'is'
  | 'is not'
  | 'descendants of'
  | 'descendants of (inclusive)';

/**
 * Represents a filter condition for Frappe database queries.
 *
 * @see {@link https://frappeframework.com/docs/user/en/api/database#frappe.db.get_list}
 */
type FilterCondition = {
  [fieldname: string]:
    | string // Field equals the value
    | [Operator, any]; // Operator-based condition
};

/**
 * Represents complex filter conditions using logical groupings.
 *
 * @see {@link https://frappeframework.com/docs/user/en/api/database#frappe.db.get_list}
 */
type ComplexFilter = Array<FilterCondition>;

/**
 * Options for fetching records using `frappe.db.get_list`.
 *
 * @see {@link https://frappeframework.com/docs/user/en/api/database#frappe.db.get_list}
 */
interface GetListOptions {
  filters?: { [key: string]: any }; // Filters for the query
  fields?: string[]; // Fields to fetch
  limit?: number; // Maximum number of records to fetch
  pluck?: string; // Specific field to return as a flat array
  order_by?: string; // Sort order for the results
}
