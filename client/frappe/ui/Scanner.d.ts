// frappe/ui/Scanner.d.ts

/**
 * Scanner utility for barcode and QR code scanning.
 */
export interface Scanner {
  /**
   * Creates a new Scanner instance.
   * @param options - Configuration options for the scanner.
   * @see {@link https://frappeframework.com/docs/user/en/api/scanner}
   */
  new(options: ScannerOptions): ScannerInstance;
}

/**
 * Represents the Scanner instance.
 */
export interface ScannerInstance {
  /**
   * Starts the scanner.
   */
  start(): void;

  /**
   * Stops the scanner.
   */
  stop(): void;

  /**
   * Closes the scanner dialog.
   */
  close(): void;

  /**
   * Flag indicating whether the scanner is active.
   */
  is_active: boolean;
}

/**
 * Represents the data returned from the scanner.
 */
export interface ScannerData {
  /**
   * Result of the scan operation.
   */
  result: {
    /**
     * Text representation of the scanned data.
     */
    text: string;

    /**
     * Additional metadata, if any.
     */
    [key: string]: any;
  };

  /**
   * Indicates whether the scan was successful.
   */
  success?: boolean;
}

/**
 * Configuration options for initializing a Scanner.
 */
interface ScannerOptions {
  /**
   * Whether to show a dialog with the scanner.
   */
  dialog?: boolean;

  /**
   * Allow scanning multiple items in one session.
   */
  multiple?: boolean;

  /**
   * Callback function when a scan is completed.
   * @param data - The scanned data result.
   */
  on_scan: (data: ScannerData) => void;

  /**
   * Title for the scanner dialog.
   */
  title?: string;

  /**
   * Whether to allow manual entry as a fallback.
   */
  manual_entry?: boolean;
}