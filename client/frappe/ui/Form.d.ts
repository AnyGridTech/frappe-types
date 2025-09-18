// frappe/ui/Form.d.ts

import { FrappeForm } from "../core";
import { ControlData } from "./ControlData";
  /**
   * Manages client-side form events.
   */
export interface Form {

  /**
 * Registers event handlers for a specific DocType.
 * @param doctype - The type of document (e.g., "Stock Entry").
 * @param handlers - Event handlers for the form lifecycle.
 * @see {@link https://frappeframework.com/docs/user/en/api/form#form-events}
 */
  on<T = any>(doctype: string, handlers: Partial<FrappeFormHandlers<T>>): void;

  /**
   * Registers event handlers for a specific DocType.
   * @param doctype - The type of document (e.g., "Stock Entry").
   * @param event_name - The event name to attach the function handler.
   * @param handler - Function to be executed.
   * 
   * @see {@link https://frappeframework.com/docs/user/en/api/form#form-events}
   */
  on<T = any>(doctype: string, event_name: string, handler: (form: FrappeForm<T>) => Promise<any>): void;

  ControlData: ControlData;
  ControlReadOnly: ControlData;
}


/**
 * Event handlers for Frappe forms.
 * @see {@link https://frappeframework.com/docs/user/en/api/form#form-events}
 */
export interface FrappeFormHandlers<T> {

  /**
   * Triggered after the workflow transition action.
   * @param form - The current form instance.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#after_workflow_action}
   */
  after_workflow_action?: (form: FrappeForm<T>) => void;

  /**
   * Triggered before the workflow transition action.
   * @param form - The current form instance.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#before_workflow_action}
   */
  before_workflow_action?: (form: FrappeForm<T>) => void;

  /**
   * Triggered once when the form is created for the first time.
   * @param form - The current form instance.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#setup}
   */
  setup?: (form: FrappeForm<T>) => void;

  /**
   * Triggered before the form is about to load.
   * @param form - The current form instance.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#before_load}
   */
  before_load?: (form: FrappeForm<T>) => void;

  /**
   * Triggered when the form is loaded and is about to render.
   * @param form - The current form instance.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#onload}
   */
  onload?: (form: FrappeForm<T>) => void;

  /**
   * Triggered after the form is loaded.
   * @param form - The current form instance.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#after_load}
   */
  after_load?: (form: FrappeForm<T>) => void;

  /**
   * Triggered when the form is loaded and rendered.
   * @param form - The current form instance.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#refresh}
   */
  refresh?: (form: FrappeForm<T>) => void;

  /**
   * Triggered after the form is loaded and rendered.
   * @param form - The current form instance.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#onload_post_render}
   */
  onload_post_render?: (form: FrappeForm<T>) => void;

  /**
   * Triggered before `before_save`.
   * @param form - The current form instance.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#validate}
   */
  validate?: (form: FrappeForm<T>) => void;

  /**
   * Triggered before save is called.
   * @param form - The current form instance.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#before_save}
   */
  before_save?: (form: FrappeForm<T>) => void;

  /**
   * Triggered after the form is saved.
   * @param form - The current form instance.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#after_save}
   */
  after_save?: (form: FrappeForm<T>) => void;

  /**
   * Triggered before submit is called.
   * @param form - The current form instance.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#before_submit}
   */
  before_submit?: (form: FrappeForm<T>) => void;

  /**
   * Triggered after the form is submitted.
   * @param form - The current form instance.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#on_submit}
   */
  on_submit?: (form: FrappeForm<T>) => void;

  /**
   * Triggered before cancel is called.
   * @param form - The current form instance.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#before_cancel}
   */
  before_cancel?: (form: FrappeForm<T>) => void;

  /**
   * Triggered after the form is canceled.
   * @param form - The current form instance.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#after_cancel}
   */
  after_cancel?: (form: FrappeForm<T>) => void;

  /**
   * Triggered before discard is called.
   * @param form - The current form instance.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#before_discard}
   */
  before_discard?: (form: FrappeForm<T>) => void;
  /**
   * Triggered after the form is discarded.
   * @param form - The current form instance.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#after_discard}
   */
  after_discard?: (form: FrappeForm<T>) => void;
  /**
   * Triggered after the timeline is refreshed.
   * This is useful for updating or injecting custom data into the timeline after it has loaded.
   * @param form - The current form instance.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#timeline-refresh}
   */
  timeline_refresh?: (form: FrappeForm<T>) => void;

  /**
   * Triggered before the document is renamed.
   * @param form - The current form instance.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#before_rename}
   */
  before_rename?: (form: FrappeForm<T>) => void;

  /**
   * Triggered after the document is renamed.
   * @param form - The current form instance.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#after_rename}
   */
  after_rename?: (form: FrappeForm<T>) => void;

  /**
   * Triggered when a document is shared with another user.
   * Can be used to execute custom actions when sharing is initiated.
   * @param form - The current form instance.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#on_share}
   */
  on_share?: (form: FrappeForm<T>) => void;

  /**
   * Triggered when a document's permission is changed.
   * Can be used to track or log changes to permissions.
   * @param form - The current form instance.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#on_permission_change}
   */
  on_permission_change?: (form: FrappeForm<T>) => void;

  /**
   * Triggered when the document is linked to another document.
   * Can be used to handle side effects of linking.
   * @param form - The current form instance.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#on_link}
   */
  on_link?: (form: FrappeForm<T>) => void;

  /**
   * Triggered after the document is exported.
   * Useful for tracking or logging exports.
   * @param form - The current form instance.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#after_export}
   */
  after_export?: (form: FrappeForm<T>) => void;

  /**
   * Triggered before the document is imported.
   * Allows validation or custom logic before import.
   * @param form - The current form instance.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#before_import}
   */
  before_import?: (form: FrappeForm<T>) => void;

  /**
   * Triggered after the document is imported.
   * Useful for performing post-import actions.
   * @param form - The current form instance.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#after_import}
   */
  after_import?: (form: FrappeForm<T>) => void;

  /**
   * Triggered before bulk actions are applied to documents.
   * Can be used to validate or modify bulk actions.
   * @param form - The current form instance.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#before_bulk_action}
   */
  before_bulk_action?: (form: FrappeForm<T>) => void;

  /**
   * Triggered after bulk actions are applied to documents.
   * Useful for cleanup or logging bulk actions.
   * @param form - The current form instance.
   * @see {@link https://frappeframework.com/docs/user/en/api/form#after_bulk_action}
   */
  after_bulk_action?: (form: FrappeForm<T>) => void;

  /**
   * Allows attaching custom events to fields. Event handlers for specific fields
   * can be defined using the fieldname as the key. These events will trigger
   * when the corresponding field is interacted with.
   * @param form - The current form instance.
   * @example
   * {
   *   "fieldname": (form) => { console.log("Field changed:", form.doc.fieldname); }
   * }
   */
  [fieldname: string]: ((form: FrappeForm<T>, cdt?: string, cdn?: string) => void) | undefined;
}