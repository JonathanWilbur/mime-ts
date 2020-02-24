/**
 * Q-Encode data, per RFC 2047, Section 4.2, which, in turn, references
 * the Quoted-Printable encoding defined in RFC 2045, Section 6.7.
 * @param data The raw bytes of data to be encoded.
 * @param encodeAll Whether to encode all octets, or just the ones not in `US-ASCII [33-60, 62-126]`.
 */
export default
function qEncode (data: Uint8Array, encodeAll: boolean = false): string {
    if (encodeAll) {
        return (data as unknown as number[]).map(
            (byte: number): string => `=${byte.toString(16).padStart(2, "0")}`
        ).join("");
    } else {
        return (data as unknown as number[]).map(
            (byte: number): string => {
                if (
                    (byte >= 33 && byte <= 60)
                    || (byte >= 62 && byte <= 126)
                ) {
                    return String.fromCharCode(byte);
                } else {
                    return `=${byte.toString(16).padStart(2, "0")}`;
                }
            }
        ).join("");
    }
}
