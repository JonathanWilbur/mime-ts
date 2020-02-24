/**
 * Convert a JavaScript `Date` object to a string having the format specified
 * in RFC 5322, Section 3.3. Always returns with a UTC time zone.
 *
 * @param d The unserialized `Date` object.
 * @returns A `string`-serialized date-time in the UTC time-zone.
 */
export default
function serializeInternetMessageDate (d: Date): string {
    const dayOfWeek: string[] = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
    ];

    return (
        dayOfWeek[d.getUTCDay()]
        + ", "
        + d.getUTCDate().toString().padStart(2, "0")
        + " "
        + d.getUTCMonth().toString().padStart(2, "0")
        + " "
        + d.getUTCFullYear().toString().padStart(4, "0")
        + " "
        + d.getUTCHours().toString().padStart(2, "0")
        + ":"
        + d.getUTCMinutes().toString().padStart(2, "0")
        + ":"
        + d.getUTCSeconds().toString().padStart(2, "0")
        + " +0000"
    );
}
