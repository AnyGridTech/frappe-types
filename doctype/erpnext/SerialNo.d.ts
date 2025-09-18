import { FrappeDoc } from "../../client/frappe/core";

interface SerialNo extends FrappeDoc {
  item_code: string;
  serial_no: string;
  company: string;
  item_group?: string;
  status: "Active" | "Inactive" | "Delivered" | "Expired";
  warehouse: string | null;
  batch_no: string | null;
  item_name: string | undefined;
  description: string | undefined;
  workflow_history_html?: string;
}