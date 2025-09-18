// frappe/datetime.d.ts

/**
 * Represents date and time manipulation utilities provided by Frappe.
 */
export interface datetime {
  /**
   * Adds a specified number of days to a given date.
   * @param date The date to modify (string or Date).
   * @param days The number of days to add.
   * @returns The new date as a string.
   */
  add_days: (date: string | Date, days: number) => string;

  /**
   * Adds a specified number of months to a given date.
   * @param date The date to modify (string or Date).
   * @param months The number of months to add.
   * @returns The new date as a string.
   */
  add_months: (date: string | Date, months: number) => string;

  /**
   * Returns a human-readable relative time string for a given timestamp.
   * @param timestamp The timestamp to format.
   * @returns A formatted string such as "5 minutes ago".
   */
  comment_when: (timestamp: string | Date) => string;

  /**
   * Converts a date/time to the system timezone.
   * @param datetime The date/time to convert.
   * @returns The date/time as a string in system timezone.
   */
  convert_to_system_tz: (datetime: string | Date) => string;

  /**
   * Converts a date/time to the user’s timezone.
   * @param datetime The date/time to convert.
   * @returns The date/time as a string in the user’s timezone.
   */
  convert_to_user_tz: (datetime: string | Date) => string;

  /**
   * Converts a date to a formatted string representation.
   * @param date The date to format.
   * @returns The formatted date as a string.
   */
  get_datetime_as_string: (date: string | Date) => string;

  /**
   * Calculates the number of days between two dates.
   * @param startDate The start date.
   * @param endDate The end date.
   * @returns The difference in days.
   */
  get_day_diff: (startDate: string | Date, endDate: string | Date) => number;

  /**
   * Calculates the number of seconds between two timestamps.
   * @param start The start timestamp.
   * @param end The end timestamp.
   * @returns The difference in seconds.
   */
  get_diff: (start: string | Date, end: string | Date) => number;

  /**
   * Gets the index of the first day of the week (e.g., Sunday = 0, Monday = 1).
   * @returns The first day of the week index.
   */
  get_first_day_of_the_week_index: () => number;

  /**
   * Calculates the number of hours between two timestamps.
   * @param start The start timestamp.
   * @param end The end timestamp.
   * @returns The difference in hours.
   */
  get_hour_diff: (start: string | Date, end: string | Date) => number;

  /**
   * Calculates the number of minutes between two timestamps.
   * @param start The start timestamp.
   * @param end The end timestamp.
   * @returns The difference in minutes.
   */
  get_minute_diff: (start: string | Date, end: string | Date) => number;

  /**
   * Converts a timestamp to a 12-hour format time string.
   * @param timestamp The timestamp to format.
   * @returns The formatted time string (e.g., "03:45 PM").
   */
  get_time: (timestamp: string | Date) => string;

  /**
   * Returns today's date as a string in system format.
   * @returns Today's date string.
   */
  get_today: () => string;

  /**
   * Gets the user’s date format (e.g., "YYYY-MM-DD" or "DD/MM/YYYY").
   * @returns The date format string.
   */
  get_user_date_fmt: () => string;

  /**
   * Gets the user's preferred date format.
   * @returns The date format string.
   */
  get_user_fmt: () => string;

  /**
   * Gets the user’s time format (e.g., "HH:mm:ss" or "hh:mm A").
   * @returns The time format string.
   */
  get_user_time_fmt: () => string;

  /**
   * Converts a date to a globally formatted date string.
   * @param date The date to format.
   * @returns The formatted global date string.
   */
  global_date_format: (date: string | Date) => string;

  /**
   * Checks if the system timezone is being used.
   * @returns A boolean indicating if the system timezone is used.
   */
  is_system_time_zone: () => boolean;

  /**
   * Checks if two timezones are the same.
   * @returns A boolean indicating if timezones are the same.
   */
  is_timezone_same: () => boolean;

  /**
   * Converts a moment.js object to a JavaScript Date object.
   * @param momentObj The moment.js object.
   * @returns A JavaScript Date object.
   */
  moment_to_date_obj: (momentObj: any) => Date;

  /**
   * Gets the start of the current month as a string.
   * @returns The month start date as a string.
   */
  month_start: () => string;

  /**
   * Gets the end of the current month as a string.
   * @returns The month end date as a string.
   */
  month_end: () => string;

  /**
   * Gets the current date in system format.
   * @param utc If true, returns in UTC format.
   * @returns The current date as a string.
   */
  now_date: (utc?: boolean) => string;

  /**
   * Gets the current date and time in system format.
   * @param utc If true, returns in UTC format.
   * @returns The current datetime as a string.
   */
  now_datetime: (utc?: boolean) => string;

  /**
   * Gets the current time in system format.
   * @param utc If true, returns in UTC format.
   * @returns The current time as a string.
   */
  now_time: (utc?: boolean) => string;

  /**
   * Converts a date object to a formatted string.
   * @param date The date object.
   * @returns The formatted date string.
   */
  obj_to_str: (date: Date) => string;

  /**
   * Converts an object date format to a user-friendly format.
   * @param date The date object.
   * @returns The formatted user date string.
   */
  obj_to_user: (date: Date) => string;

  /**
   * Formats a date into a readable "time ago" format (e.g., "5 minutes ago").
   * @param timestamp The timestamp to format.
   * @param shortFormat Whether to use short format.
   * @returns The formatted date string.
   */
  prettyDate: (timestamp: string | Date, shortFormat?: boolean) => string;

  /**
   * Gets the start of the current quarter as a string.
   * @returns The quarter start date as a string.
   */
  quarter_start: () => string;

  /**
   * Gets the end of the current quarter as a string.
   * @returns The quarter end date as a string.
   */
  quarter_end: () => string;

  /**
   * Converts a string date into an object.
   * @param dateStr The string date.
   * @returns The date object.
   */
  str_to_obj: (dateStr: string) => Date;

  /**
   * Converts a string date into a user-readable format.
   * @param dateStr The string date.
   * @param includeTime Whether to include time in the conversion.
   * @param utc If true, converts in UTC format.
   * @returns The formatted user date string.
   */
  str_to_user: (dateStr: string, includeTime?: boolean, utc?: boolean) => string;

  /**
   * Gets the current system date and time.
   * @param utc If true, returns in UTC format.
   * @returns The current system datetime as a string.
   */
  system_datetime: (utc?: boolean) => string;

  /**
   * Converts a user-formatted date string into an object.
   * @param dateStr The user-formatted date string.
   * @returns The converted date object.
   */
  user_to_obj: (dateStr: string) => Date;

  /**
   * Converts a user-formatted date string into a standard date string.
   * @param dateStr The user-formatted date string.
   * @param includeTime Whether to include time in the conversion.
   * @returns The formatted standard date string.
   */
  user_to_str: (dateStr: string, includeTime?: boolean) => string;

  /**
   * Validates a date string.
   * @param dateStr The date string to validate.
   * @returns A boolean indicating whether the date is valid.
   */
  validate: (dateStr: string) => boolean;
}
