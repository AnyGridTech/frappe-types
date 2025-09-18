import { FrappeDoc } from "../../client/frappe/core";

interface Item extends FrappeDoc {
  item_code: string;
  item_name: string;
  item_group: string;
  description?: string;
  stock_uom: string;
  is_stock_item: boolean;
  is_purchase_item: boolean;
  is_sales_item: boolean;
  valuation_rate?: number;
  default_warehouse?: string;
  custom_equipament_type?: string;
}



