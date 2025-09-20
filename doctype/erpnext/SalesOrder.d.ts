import { FrappeDoc } from "../../client/frappe/core";

export interface SalesOrder extends FrappeDoc {
  customer: string;
  transaction_date: string;
  delivery_date: string;
  items: SalesOrderItem[];
  status: string;
  company: string;
}

export interface SalesOrderItem extends FrappeDoc {
  item_code: string;
  qty: number;
  rate: number;
  amount: number;
  uom: string;
  warehouse: string;
}