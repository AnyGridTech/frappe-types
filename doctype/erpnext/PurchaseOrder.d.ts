import { FrappeDoc } from "../../client/frappe/core";

export interface PurchaseOrder extends FrappeDoc {
  supplier: string;
  transaction_date: string;
  items: PurchaseOrderItem[];
  status: string;
  company: string;
}

export interface PurchaseOrderItem extends FrappeDoc {
  item_code: string;
  qty: number;
  rate: number;
  amount: number;
  uom: string;
  warehouse: string;
}