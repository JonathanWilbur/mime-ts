/**
 * Q-Decode data, per RFC 2047, Section 4.2, which, in turn, references
 * the Quoted-Printable encoding defined in RFC 2045, Section 6.7.
 * @param string The Q-encoded string to be decoded.
 *
 * Note that this function is specific to the header tokens described in
 * IETF RFC 2047. It MUST NOT be used for Quoted-Printable decoding, which
 * is described in IETF RFC 2045.
 */
export default
function qDecode (data: string): Uint8Array {
    const ret: number[] = [];
    for (let i: number = 0; i < data.length; i++) {
        if (data[i] === "=" && data.length > (i + 2)) {
            const hexByte: string = `${data[i + 1]}${data[i + 2]}`;
            const byte: number = parseInt(hexByte, 16);
            if (Number.isNaN(byte)) {
                throw new Error(`Invalid hex byte: ${hexByte}`);
            }
            ret.push(byte);
            i += 2;
        } else if (data[i] === "_") {
            /**
             * From IETF RFC 2047, Section 4.2:
             * "Note that the "_" always represents hexadecimal 20, even if the
             * SPACE character occupies a different code position in the
             * character set in use."
             */
            ret.push(20);
        } else {
            ret.push(data[i].charCodeAt(0));
        }
    }
    return Uint8Array.from(ret);
}
