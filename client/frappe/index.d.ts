// frappe/index.d.ts
import { db } from "./db";
import { ui } from "./ui";
import { utils } from "./utils";
import { model } from "./model";
import { boot } from "./boot";
import { datetime } from "./datetime";
import { FrappeExtendedFunctions, FrappeForm } from "./core";
import { dom } from "./dom";
/**
 * The global `frappe` namespace, bundling all related modules.
 */
export interface Frappe extends FrappeExtendedFunctions {
  user: any; // TODO: Define a proper interface for user
  defaults: any; // TODO: Define a proper interface for defaults
  ui: ui; // UI-related methods and components.
  db: db; // Database-related methods.
  utils: utils; // Utility functions.
  model: model; // Model-related methods.
  boot: boot; // Boot-related methods.
  dom: dom; // DOM-related methods.
  datetime: datetime; // Date and time-related methods.
}





export { }; // Ensure this file is treated as a module.
