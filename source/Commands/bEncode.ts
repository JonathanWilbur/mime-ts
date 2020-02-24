import * as b64 from "base64-js";

/**
 * B-Encode data, per RFC 2047, Section 4.1, which, in turn, references
 * the Base-64 encoding defined in RFC 2045, Section 6.8.
 * @param data The raw bytes of data to be encoded.
 */
export default
function bEncode (data: Uint8Array): string {
    return b64.fromByteArray(data);
}
