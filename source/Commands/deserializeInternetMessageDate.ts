
export default
function deserializeInternetMessageDate (d: string): Date {
    const ret: Date = new Date();
    const matcher: RegExp = new RegExp(
        "^\\s*(?:(?<dayOfWeek>(Sun|Mon|Tue|Wed|Thu|Fri|Sat),))?\\s+"
        + "(?<day>[0123][0-9])\\s+"
        + "(?<month>[01][0-9])\\s+"
        + "(?<year>\\d{4})\\s+"
        + "(?<hour>[012][0-9]):(?<minute>[0-5][0-9]):(?<second>[0-5][0-9])\\s+"
        + "(?<offset>("
            + "(?:(\\+|-)\\d{4})" // +#### Offset.
            + "|[A-IK-Za-ik-z]" // A-Z Military Time zones, which excludes J for some reason.
            + "|(UT|GMT|EST|EDT|CST|CDT|MST|MDT|PST|PDT)"
        + "))\\s*$",
        "u"
    );
    const match: RegExpExecArray | null = matcher.exec(d);
    if (!match || !(match.groups)) {
        throw new Error("Invalid Internet Message Date.");
    }
    // TODO: Validate Day?
    const day: number = parseInt(match.groups.day, 10);
    const month: number = parseInt(match.groups.month, 10);
    const year: number = parseInt(match.groups.year, 10);
    const hour: number = parseInt(match.groups.hour, 10);
    const minute: number = parseInt(match.groups.minute, 10);
    const second: number = parseInt(match.groups.second, 10);

    ret.setUTCFullYear(year);
    ret.setUTCMonth(month);
    ret.setUTCDate(day);
    ret.setUTCHours(hour);
    ret.setUTCMinutes(minute);
    ret.setUTCSeconds(second);
    return ret;
}
