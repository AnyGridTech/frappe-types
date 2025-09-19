import { FrappeDoc } from "../../client/frappe/core";

export interface Company extends FrappeDoc {
  name: string;
  company_name: string;
  abbr: string;
  default_currency: string;
  country: string;
  tax_id: string;
  is_group: boolean;
  custom_inscricao_estadual: string | undefined;
  website: string | undefined;
  phone: string | undefined;
  email: string | undefined;
}