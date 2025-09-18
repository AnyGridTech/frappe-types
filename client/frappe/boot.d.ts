// frappe/boot.d.ts

/**
 * Represents the `frappe.boot` object, which provides context for the current user and environment.
 * 
 * @see {@link https://frappeframework.com/docs/user/en/api/boot Boot API Documentation}
 */
export interface boot {
  /**
   * Active domains configured in the current site.
   * 
   * @example ['Manufacturing', 'Retail']
   * @see {@link https://frappeframework.com/docs/user/en/domains}
   */
  active_domains: string[];

  /**
   * Additional filters configuration for reports or forms.
   * 
   * @example { 'Fiscal Year': { options: ['2024', '2023'] } }
   */
  additional_filters_config: Record<string, any>;

  /**
   * A list of all accounts configured in the system.
   */
  all_accounts: string;

  /**
   * All domains available in the current site configuration.
   * 
   * @example ['Manufacturing', 'Retail']
   */
  all_domains: string[];

  /**
   * List of page routes the current user is allowed to access.
   * 
   * @example ['permission-manager', 'workflow-builder', 'print']
   * @see {@link https://frappeframework.com/docs/user/en/permissions Permissions Documentation}
   */
  allowed_pages: string[];

  /**
   * List of workspaces the current user is allowed to access.
   * 
   * @example [{ name: 'Home', label: 'Home' }, { name: 'Accounting', label: 'Accounting' }]
   */
  allowed_workspaces: Array<{ name: string; label: string }>;

  /**
   * URL for the logo of the currently active app.
   * 
   * @example '/assets/erpnext/images/erpnext-logo.svg'
   */
  app_logo_url: string;

  /**
   * Data about installed apps, including their default paths and whether they are desk apps.
   */
  apps_data: {
    apps: string[];
    default_path: string;
    is_desk_apps: number;
  };

  /**
   * JSON object containing references to various static assets used by the system.
   */
  assets_json: Record<string, string>;

  /**
   * List of calendar DocTypes available in the system.
   * 
   * @example ['Event', 'Task', 'Work Order']
   */
  calendars: string[];

  /**
   * Custom CSS provided for the site.
   * 
   * @example 'body { background-color: #f0f0f0; }'
   */
  custom_css: string;

  /**
   * Current language of the system.
   * 
   * @example 'en'
   */
  lang: string;

  /**
   * Dictionary mapping language names to their codes.
   * 
   * @example { English: 'en', Français: 'fr' }
   */
  lang_dict: Record<string, string>;

  /**
   * Metadata version for cache-busting purposes.
   * 
   * @example '1ca1a2249b9b31e754a8329c9e5dadb1ffbd1e23f8f505df255f4031'
   */
  metadata_version: string;

  /**
   * Nested set DocTypes configured in the system.
   * 
   * @example ['Item Group', 'Customer Group', 'Territory']
   */
  nested_set_doctypes: string[];

  /**
   * Whether the user has completed the setup wizard.
   * 
   * @example 1
   */
  setup_complete: number;

  /**
   * Current system timezone.
   * 
   * @example { system: 'America/Sao_Paulo', user: 'America/Sao_Paulo' }
   */
  time_zone: {
    system: string;
    user: string;
  };

  /**
   * Represents the current user's information and permissions within the `frappe.boot` object.
   */
  user: {
    /**
     * List of all DocTypes the user has read permissions for.
     * 
     * @example ['Task', 'Item', 'Project']
     */
    all_read: string[];

    /**
     * Dictionary of all reports the user can access, grouped by report type.
     * 
     * @example { "Accounts Receivable": ["read", "export"], "Sales Summary": ["read"] }
     */
    all_reports: Record<string, string[]>;

    /**
     * List of modules the user is allowed to access.
     * 
     * @example ['Accounts', 'CRM', 'Stock']
     */
    allow_modules: string[];

    /**
     * List of DocTypes the user has permission to cancel.
     * 
     * @example ['Sales Order', 'Purchase Invoice']
     */
    can_cancel: string[];

    /**
     * List of DocTypes the user has permission to create.
     * 
     * @example ['Task', 'Event', 'Customer']
     */
    can_create: string[];

    /**
     * List of DocTypes the user has permission to delete.
     * 
     * @example ['Task', 'Event']
     */
    can_delete: string[];

    /**
     * List of DocTypes the user has permission to email.
     * 
     * @example ['Invoice', 'Quotation']
     */
    can_email: string[];

    /**
     * List of DocTypes the user has permission to export.
     * 
     * @example ['Customer', 'Supplier']
     */
    can_export: string[];

    /**
     * List of DocTypes the user has permission to run reports on.
     * 
     * @example ['Stock Balance', 'Sales Analytics']
     */
    can_get_report: string[];

    /**
     * List of DocTypes the user has permission to import data into.
     * 
     * @example ['Customer', 'Item']
     */
    can_import: string[];

    /**
     * List of DocTypes the user has permission to print.
     * 
     * @example ['Sales Order', 'Purchase Order']
     */
    can_print: string[];

    /**
     * List of DocTypes the user has permission to read.
     * 
     * @example ['Sales Invoice', 'Delivery Note']
     */
    can_read: string[];

    /**
     * List of DocTypes the user has permission to search.
     * 
     * @example ['Project', 'Customer']
     */
    can_search: string[];

    /**
     * List of DocTypes the user can select in dropdowns.
     * 
     * @example ['Customer', 'Item Group']
     */
    can_select: string[];

    /**
     * List of DocTypes the user has permission to submit.
     * 
     * @example ['Purchase Invoice', 'Sales Invoice']
     */
    can_submit: string[];

    /**
     * List of DocTypes the user has write permissions for.
     * 
     * @example ['Task', 'Project']
     */
    can_write: string[];

    /**
     * The user’s email address.
     * 
     * @example 'user@example.com'
     */
    email: string;

    /**
     * The user's first name.
     * 
     * @example 'John'
     */
    first_name: string;

    /**
     * The user's last name.
     * 
     * @example 'Doe'
     */
    last_name: string;

    /**
     * List of roles assigned to the user.
     * 
     * @example ['System Manager', 'Stock User']
     */
    roles: string[];

    /**
     * The user's language preference.
     * 
     * @example 'en'
     */
    language: string;

    /**
     * The user's desk theme preference.
     * 
     * @example 'Dark'
     */
    desk_theme: string;

    /**
     * Whether the user prefers to mute system sounds.
     * 
     * @example 1
     */
    mute_sounds: number;

    /**
     * Additional user-specific permissions.
     */
    user_permissions: Record<string, any>;

    /**
     * The user's type, e.g., 'System User' or 'Website User'.
     * 
     * @example 'System User'
     */
    user_type: string;

    /**
     * Timestamp of the user's creation.
     * 
     * @example '2024-09-12 13:49:48.970406'
     */
    creation: string;

    /**
     * Additional defaults set for the user.
     */
    defaults: Record<string, any>;

    /**
     * Whether to send a copy of emails to the user.
     * 
     * @example 0
     */
    send_me_a_copy: number;

    /**
     * Onboarding status for the user.
     */
    onboarding_status: Record<string, any>;

    /**
     * Any impersonation information if the user is being impersonated.
     * 
     * @example null
     */
    impersonated_by: string | null;

    /**
     * List of DocTypes the user is currently creating.
     * 
     * @example ['Sales Invoice', 'Purchase Order']
     */
    in_create: string[];

    /**
     * Recently accessed items or settings.
     * 
     * @example 'null'
     */
    recent: string;

    /**
     * The user's email signature.
     * 
     * @example 'Best regards, John Doe'
     */
    email_signature: string | null;

    /**
     * The user’s employee record, if applicable.
     * 
     * @example ''
     */
    employee: string;

    /**
     * Whether the user has document follow notifications enabled.
     * 
     * @example 0
     */
    document_follow_notify: number;
  }

  /**
   * Map of available modules and their associated apps.
   * 
   * @example { accounts: 'erpnext', assets: 'erpnext' }
   */
  module_app: Record<string, string>;

  /**
   * Current system defaults for the user.
   */
  sysdefaults: Record<string, any>;

  /**
   * The maximum allowed file size for uploads (in bytes).
   * 
   * @example 10485760
   */
  max_file_size: number;

  /**
   * Current subscription configuration for the site.
   */
  subscription_conf: Record<string, any> | null;

  /**
   * Information about installed versions of apps.
   * 
   * @example { erpnext: '15.35.0', frappe: '15.40.4' }
   */
  versions: Record<string, string>;
}