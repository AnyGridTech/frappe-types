// frappe/ui.d.ts
import { Dialog } from './ui/Dialog';
import { Form } from './ui/Form';
import { Scanner, ScannerData, ScannerOptions } from './ui/Scanner';
import { ScriptManager } from './ui/ScriptManager';

/**
 * Represents the UI module in Frappe, primarily used for forms and dialogs.
 * @see {@link https://frappeframework.com/docs/user/en/api/form}
 */
export interface ui {

  form: Form;

  Dialog: Dialog

  Scanner: Scanner;

  ScriptManager: ScriptManager;
}

