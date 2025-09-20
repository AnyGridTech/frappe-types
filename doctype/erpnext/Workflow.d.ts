import { FrappeDoc } from "../../client/frappe/core";

interface Workflow extends FrappeDoc {
  next_step: string
  creation: string;
  docstatus: number;
  doctype: string;
  document_type: string;
  idx: number;
  is_active: number;
  modified: string;
  modified_by: string;
  name: string;
  override_status: number;
  owner: string;
  send_email_alert: number;
  states: WorkflowState[];
  transitions: WorkflowTransition[];
  workflow_data: string;
  workflow_name: string;
  workflow_state_field: string;
}

interface WorkflowState extends FrappeDoc {
  name: string;
  owner: string;
  creation: string;
  doc_status: string;
  docstatus: number;
  doctype: string;
  idx: number;
  is_optional_state: number;
  modified: string;
  modified_by: string;
  parent: string;
  parentfield: string;
  parenttype: string;
  state: string;
  allow_edit?: string;
  avoid_status_override?: number;
  workflow_builder_id?: string;
}

interface WorkflowTransition extends FrappeDoc {
  name: string;
  owner: string;
  creation: string;
  docstatus: number;
  doctype: string;
  idx: number;
  modified: string;
  modified_by: string;
  parent: string;
  parentfield: string;
  parenttype: string;
  state: string;
  next_state: string;
  action: string;
  allow_self_approval: number;
  allowed: string;
}