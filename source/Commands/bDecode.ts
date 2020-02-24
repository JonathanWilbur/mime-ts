import * as b64 from "base64-js";

/**
 * B-Decode data, per RFC 2047, Section 4.1, which, in turn, references
 * the Base-64 encoding defined in RFC 2045, Section 6.8.
 * @param string The B-encoded string to be decoded.
 */
export default
function bDecode (data: string): Uint8Array {
    return b64.toByteArray(data);
}
